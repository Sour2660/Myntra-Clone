// services/productService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const fetchAllProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const fetchProductsByCategory = async (category) => {
  const res = await axios.get(`${API_URL}?category=${category}`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
