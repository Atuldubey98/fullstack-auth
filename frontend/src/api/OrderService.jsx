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
}
export default OrderService;
