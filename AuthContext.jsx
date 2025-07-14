import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, googleProvider, database } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para registrar usuário com email e senha
  async function signup(email, password, userData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Salvar dados do usuário no Realtime Database
    await set(ref(database, 'users/' + user.uid), {
      email: user.email,
      name: userData.name,
      city: userData.city,
      phone: userData.phone,
      address: userData.address,
      createdAt: new Date().toISOString()
    });
    
    return userCredential;
  }

  // Função para fazer login com email e senha
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Função para fazer login com Google
  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Verificar se o usuário já existe no banco de dados
    const userRef = ref(database, 'users/' + user.uid);
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      // Se não existe, criar registro básico
      await set(userRef, {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString()
      });
    }
    
    return result;
  }

  // Função para fazer logout
  function logout() {
    return signOut(auth);
  }

  // Função para atualizar dados do usuário
  async function updateUserData(userData) {
    if (currentUser) {
      await set(ref(database, 'users/' + currentUser.uid), {
        ...userData,
        email: currentUser.email,
        updatedAt: new Date().toISOString()
      });
    }
  }

  // Função para obter dados do usuário do banco
  async function getUserData() {
    if (currentUser) {
      const userRef = ref(database, 'users/' + currentUser.uid);
      const snapshot = await get(userRef);
      return snapshot.exists() ? snapshot.val() : null;
    }
    return null;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    updateUserData,
    getUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

