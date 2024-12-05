/** @format */

import requests from "./httpService";

const ProductServices = {

  getAllProducts: async ({ page, limit, category, title, price }) => {
    const params = new URLSearchParams();
  
    // Chỉ thêm các tham số có giá trị
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (category) params.append("category", category);
    if (title) params.append("title", title);
    if (price) params.append("price", price);
  
    // Kết hợp base URL với query params
    const queryString = params.toString(); // Chuyển thành chuỗi `key=value&key=value`
    return requests.get(`/products?${queryString}`);
  },
  

  getProductById: async (id) => {
    return requests.post(`/products/${id}`);
  },
  addProduct: async (body) => {
    return requests.post("/products/add", body);
  },
  addAllProducts: async (body) => {
    return requests.post("/products/all", body);
  },
  updateProduct: async (id, body) => {
    return requests.patch(`/products/${id}`, body);
  },
  updateManyProducts: async (body) => {
    return requests.patch("products/update/many", body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/products/status/${id}`, body);
  },

  deleteProduct: async (id) => {
    return requests.delete(`/products/${id}`);
  },
  deleteManyProducts: async (body) => {
    return requests.patch("/products/delete/many", body);
  },
};

export default ProductServices;
