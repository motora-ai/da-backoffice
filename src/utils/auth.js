import api from "../serve/api";

class Auth {
  static loggedIn() {
    return !!localStorage.getItem("logged");
  }

  static async login(email, password, code) {
    const body = {
      username: email,
      password,
      otp: code,
    };
    try {
      //   const user = null;
      await api.post("/auth/local", body).then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user.id);
        localStorage.setItem("user_role", res.data.user.role);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("username", res.data.user.name);
        // localStorage.setItem("token", "token");
        localStorage.setItem("logged", true);
      });
      return 200;
    } catch (e) {
      console.log("erro => ", e.response.status);
      return e.response.status;
    }
  }

  static token() {
    return localStorage.getItem("token");
  }

  static logout() {
    localStorage.removeItem("logged");
    localStorage.removeItem("token");
  }
}

export default Auth;
