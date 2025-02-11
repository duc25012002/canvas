import { baseUrl } from "./api.js";
import CTFAlert from "../assets/js/ctf-alert.js";
const ctfAlert = new CTFAlert();

const ctf_logout_api = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("Không tìm thấy token, có thể bạn đã đăng xuất!");
    return;
  }

  try {
    const response = await axios({
      method: "POST",
      url: `${baseUrl}/api/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      localStorage.removeItem("token");
      ctfAlert.alert_success("Logout successfully!");
      //   setTimeout(() => {
      //     window.location.href = "index.html";
      //   }, 2000);
    } else {
      console.error("Lỗi đăng xuất:", response.data.error);
    }
  } catch (error) {
    console.error(
      "Lỗi khi đăng xuất:",
      error.response?.data?.error || error.message
    );
    localStorage.removeItem("token");
  }
};

function checkLoginStatus() {
  const token = localStorage.getItem("token");
  const dropdownElement = document.querySelector(
    "#__session .box-dropdown.ha-dropdown"
  );

  if (token) {
    dropdownElement.innerHTML = `
        <li><a href="my-account.html">Profile</a></li>
        <li><a href="#" class="ctf-logout" id="logout">Logout</a></li>
    `;

    const handleLogout = async (event) => {
      event.preventDefault();
      await ctf_logout_api();
    };

    const elementLogout = document.getElementById("logout");
    elementLogout.addEventListener("click", handleLogout);
    const elementLogout_my_account =
      document.getElementById("logout-my-account");
    if (elementLogout_my_account) {
      elementLogout_my_account.addEventListener("click", handleLogout);
    }
  } else {
    dropdownElement.innerHTML = `
        <li><a href="register.html">Register</a></li>
        <li><a href="login.html">Login</a></li>
    `;
  }
}

function checkAuthRoutes() {
  const token = localStorage.getItem("token");
  const currentPage = window.location.pathname;

  if (token && currentPage.includes("/login.html")) {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
    return;
  }

  const protectedPages = ["my-account.html"];
  if (!token && protectedPages.some((page) => currentPage.includes(page))) {
    ctfAlert.alert_warning("Vui lòng đăng nhập để tiếp tục.");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
    return;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  checkLoginStatus();
  checkAuthRoutes();
});

// setInterval(() => {
//   checkLoginStatus();
//   checkAuthRoutes();
// }, 5000);

window.addEventListener("storage", function (e) {
  if (e.key === "token") {
    checkLoginStatus();
    checkAuthRoutes();
  }
});
