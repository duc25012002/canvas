import apiService from "./api.js";
import CTFAlert from "../assets/js/ctf-alert.js";
const ctfAlert = new CTFAlert();
document
  .querySelector(".btn.btn-secondary")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const name = document.querySelector("#inputname").value;
    const phone = document.querySelector("#inputphone").value;
    const address = document.querySelector("#inputaddress").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#c-password").value;
    const token = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    if (
      !email ||
      !name ||
      !phone ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      ctfAlert.alert_warning("Tất cả các thông tin là bắt buộc");
      return;
    }
    if (password !== confirmPassword) {
      ctfAlert.alert_error("Mật khẩu không khớp");
      return;
    }

    this.innerHTML = "Đang đăng ký...";
    this.disabled = true;

    const data = {
      email: email,
      name: name,
      phone: phone,
      address: address,
      password: password,
      repassword: confirmPassword,
    };

    try {
      const result = await apiService.post("/api/user/register", data);

      if (result.status === "success") {
        ctfAlert.alert_success("Đăng ký thành công");
        // setTimeout(() => {
        //   window.location.href = "index.html";
        // }, 1000);
      } else {
        ctfAlert.alert_error(result.message || "Đăng ký thất bại");
        this.innerHTML = "Register";
        this.disabled = false;
      }
    } catch (error) {
      console.error("Error:", error);
      ctfAlert.alert_error("Đăng ký thất bại");
    } finally {
      this.innerHTML = "Register";
      this.disabled = false;
    }
  });
