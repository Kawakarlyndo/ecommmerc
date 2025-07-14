import { ref, push, get, set, remove, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '../firebase';

// Função para adicionar um novo produto
export async function addProduct(productData) {
  try {
    const productsRef = ref(database, 'products');
    const newProductRef = push(productsRef);
    
    const product = {
      ...productData,
      id: newProductRef.key,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await set(newProductRef, product);
    return { success: true, id: newProductRef.key, product };
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    return { success: false, error: error.message };
  }
}

// Função para obter todos os produtos
export async function getAllProducts() {
  try {
    const productsRef = ref(database, 'products');
    const snapshot = await get(productsRef);
    
    if (snapshot.exists()) {
      const products = [];
      snapshot.forEach((childSnapshot) => {
        products.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return { success: true, products };
    } else {
      return { success: true, products: [] };
    }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return { success: false, error: error.message };
  }
}

// Função para obter um produto por ID
export async function getProductById(productId) {
  try {
    const productRef = ref(database, `products/${productId}`);
    const snapshot = await get(productRef);
    
    if (snapshot.exists()) {
      return { 
        success: true, 
        product: { 
          id: snapshot.key, 
          ...snapshot.val() 
        } 
      };
    } else {
      return { success: false, error: 'Produto não encontrado' };
    }
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return { success: false, error: error.message };
  }
}

// Função para atualizar um produto
export async function updateProduct(productId, productData) {
  try {
    const productRef = ref(database, `products/${productId}`);
    const updatedProduct = {
      ...productData,
      id: productId,
      updatedAt: new Date().toISOString()
    };
    
    await set(productRef, updatedProduct);
    return { success: true, product: updatedProduct };
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return { success: false, error: error.message };
  }
}

// Função para deletar um produto
export async function deleteProduct(productId) {
  try {
    const productRef = ref(database, `products/${productId}`);
    await remove(productRef);
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return { success: false, error: error.message };
  }
}

// Função para buscar produtos por categoria
export async function getProductsByCategory(category) {
  try {
    const productsRef = ref(database, 'products');
    const categoryQuery = query(productsRef, orderByChild('category'), equalTo(category));
    const snapshot = await get(categoryQuery);
    
    if (snapshot.exists()) {
      const products = [];
      snapshot.forEach((childSnapshot) => {
        products.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return { success: true, products };
    } else {
      return { success: true, products: [] };
    }
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    return { success: false, error: error.message };
  }
}

// Função para buscar produtos por nome
export async function searchProductsByName(searchTerm) {
  try {
    const productsRef = ref(database, 'products');
    const snapshot = await get(productsRef);
    
    if (snapshot.exists()) {
      const products = [];
      snapshot.forEach((childSnapshot) => {
        const product = childSnapshot.val();
        if (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          products.push({
            id: childSnapshot.key,
            ...product
          });
        }
      });
      return { success: true, products };
    } else {
      return { success: true, products: [] };
    }
  } catch (error) {
    console.error('Erro ao buscar produtos por nome:', error);
    return { success: false, error: error.message };
  }
}

