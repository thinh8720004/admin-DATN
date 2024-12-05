import requests from "./httpService";

const SupplierServices = {
  getAllSuppliers: async () => {
    return requests.get("/supplier");
  },

  getAllSuppliersFull: async () => {
    return requests.get("/supplier/all");
  },

  getSupplierById: async (id) => {
    return requests.get(`/supplier/${id}`);
  },

  addSupplier: async (body) => {
    return requests.post("/supplier/add", body);
  },

  addAllSuppliers: async (body) => {
    return requests.post("/supplier/add/all", body);
  },

  updateSupplier: async (id, body) => {
    return requests.put(`/supplier/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/supplier/status/${id}`, body);
  },

  deleteSupplier: async (id, body) => {
    return requests.delete(`/supplier/${id}`, body);
  },

  updateManySuppliers: async (body) => {
    return requests.patch("/supplier/update/many", body);
  },

  deleteManySuppliers: async (body) => {
    return requests.patch("/supplier/delete/many", body);
  },
};

export default SupplierServices;
