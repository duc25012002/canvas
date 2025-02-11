import { baseUrl } from "./api.js";
import CTFAlert from "../assets/js/ctf-alert.js";
const ctfAlert = new CTFAlert();

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".login-form .btn-secondary");

  if (loginButton) {
    loginButton.addEventListener("click", async function () {
      const email = document.querySelector('input[name="email"]').value;
      const password = document.querySelector('input[name="password"]').value;

      this.innerHTML = "Loading...";
      this.disabled = true;

      const data = {
        email: email,
        password: password,
      };
      await ctf_login_api(loginButton, data);
    });
  }
});

const ctf_login_api = async (loginButton, data) => {
  try {
    const response = await axios({
      method: "POST",
      url: baseUrl + "/api/user/login",
      data: data,
    });
    if (response.data && response.data.status === "success") {
      localStorage.setItem("token", response.data.access_token);

      ctfAlert.alert_success("Login successfully!");

      //   setTimeout(() => {
      //     window.location.href = "index.html";
      //   }, 3000);
    } else {
      ctfAlert.alert_error("Login failed!");
    }
  } catch (error) {
    console.error("Error:", error);
    ctfAlert.alert_error("Login failed!");
    loginButton.innerHTML = "Sign In";
    loginButton.disabled = false;
  } finally {
    loginButton.innerHTML = "Sign In";
    loginButton.disabled = false;
  }
};
