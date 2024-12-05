/** @format */

import requests from "./httpService";

const OrderServices = {
  getAllOrders: async ({
    body,
    headers,
    customerName,
    status,
    page = 1,
    limit = 8,
    day,
    method,
    startDate,
    endDate,
  }) => {
    const params = new URLSearchParams();
  
    // Thêm các tham số có giá trị vào query string
    if (customerName) params.append("customerName", customerName);
    if (status) params.append("status", status);
    if (day) params.append("day", day);
    if (method) params.append("method", method);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
  
    // Thêm các tham số mặc định
    params.append("page", page);
    params.append("limit", limit);
  
    // Tạo query string từ params
    const queryString = params.toString();
  
    // Gọi API với URL được xây dựng động
    return requests.get(`/orders?${queryString}`, body, headers);
  },
  

  getAllOrdersTwo: async ({ invoice, body, headers }) => {
    const searchInvoice = invoice !== null ? invoice : "";
    return requests.get(`/orders/all?invoice=${searchInvoice}`, body, headers);
  },

  getRecentOrders: async ({
    page = 1,
    limit = 8,
    startDate = "1:00",
    endDate = "23:59",
  }) => {
    return requests.get(
      `/orders/recent?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
    );
  },

  getOrderCustomer: async (id, body) => {
    return requests.get(`/orders/customer/${id}`, body);
  },

  getOrderById: async (id, body) => {
    return requests.get(`/orders/${id}`, body);
  },

  updateOrder: async (id, body, headers) => {
    return requests.put(`/orders/${id}`, body, headers);
  },

  deleteOrder: async (id) => {
    return requests.delete(`/orders/${id}`);
  },

  getDashboardOrdersData: async ({
    page = 1,
    limit = 8,
    endDate = "23:59",
  }) => {
    return requests.get(
      `/orders/dashboard?page=${page}&limit=${limit}&endDate=${endDate}`
    );
  },

  getDashboardAmount: async () => {
    return requests.get("/orders/dashboard-amount");
  },

  getDashboardCount: async () => {
    return requests.get("/orders/dashboard-count");
  },

  getDashboardRecentOrder: async ({ page = 1, limit = 8 }) => {
    return requests.get(
      `/orders/dashboard-recent-order?page=${page}&limit=${limit}`
    );
  },

  getBestSellerProductChart: async () => {
    return requests.get("/orders/best-seller/chart");
  },
};

export default OrderServices;
