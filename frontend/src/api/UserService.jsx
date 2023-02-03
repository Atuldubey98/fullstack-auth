import instance from "./axios";
class UserService {
  static async getAllUsers() {
    try {
      const response = await instance.get("/user/all");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async currentUser() {
    try {
      const response = await instance.get("/user/current");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async logout() {
    try {
      const { data } = await instance.get("/user/logout");
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
