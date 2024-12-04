const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
console.log('BASE_URL:', process.env.BASE_URL);

export const fetchData = async (endpoint) => {
  try {
    console.log(`Fetching data from: ${BASE_URL}${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in fetchData: ${error.message}`);
    throw error;
  }
};

export const sendData = async (endpoint, method, body) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to httpcl ${method} ${endpoint}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in sendData for: ${error.message}`);
    throw error;
  }
};

/*import { readFile } from 'fs/promises';

export const fetchData = async (endpoint) => {
  const data = await readFile('./db.json', 'utf-8');
  const products = JSON.parse(data).products;

  if (endpoint === 'products') {
    return products; // Returnerar alla produkter
  }

  if (endpoint.startsWith('products/')) {
    const id = parseInt(endpoint.split('/')[1], 10);
    return products.find((product) => product.id === id); // Returnera en specifik produkt
  }

  throw new Error('Invalid endpoint');
};
*/
