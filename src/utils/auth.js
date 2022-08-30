import api from "../serve/api";

class Auth {
  static loggedIn() {
    const r = !!localStorage.getItem("logged");
    console.log("Res => ", r);
    return r;
  }

  static async login(email, password) {
    const body = {
      username: email,
      password,
    };
    console.log("==> ", body);
    try {
      //   const user = null;
      await api.post("/auth/local", body).then((res) => {
        localStorage.setItem("token", res.data.token);
        // localStorage.setItem("token", "token");
        localStorage.setItem("logged", true);
      });
      return true;
    } catch (e) {
      return false;
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
