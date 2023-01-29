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
}

export default UserService;
