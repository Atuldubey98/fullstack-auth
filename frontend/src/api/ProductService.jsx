import instance from "./axios";

class ProductService {
  static async getAllProducts(limit, page, search) {
    try {
      const { data } = await instance.get(`/product/${page}`, {
        params: { limit, search },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async getAllCategories() {
    try {
      const { data } = await instance.get("/category");
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async addProduct(product) {
    try {
      const { data } = await instance.post("/product", product);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
