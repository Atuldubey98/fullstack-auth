import instance from "./axios";

class OrderService {
  static async getAllAddress() {
    try {
      const { data } = await instance.get(`/user/address/all`);
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async addAddressAPI(address) {
    try {
      const { data } = await instance.post(`/user/address`, address);
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async getPublishableKey() {
    try {
      const { data } = await instance.get("/config");
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async getPaymentIntent(cartProducts) {
    try {
      if (cartProducts.length === 0) {
        throw new Error("Please add items in basket");
      }
      const { data } = await instance.post("/create-payment-intent", {
        products: cartProducts,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
export default OrderService;
