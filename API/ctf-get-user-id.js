import { baseUrl } from "./api.js";
import CTFAlert from "../assets/js/ctf-alert.js";
const ctfAlert = new CTFAlert();

const getUserId = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    ctfAlert.alert_warning("Bạn cần đăng nhập để thực hiện hành động này!!!");
    window.location.href = "login.html";
  } else {
    ctf_get_token_api(token);
  }
};

const ctf_get_token_api = (token) => {
  return axios({
    method: "GET",
    url: baseUrl + "/api/user-id",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("User ID:", response);
      localStorage.setItem("user_id", id);
    })
    .catch((error) => {
      console.error("Error fetching user_id:", error);
      ctfAlert.alert_error(
        "Có lỗi xảy ra khi lấy thông tin người dùng. Vui lòng thử lại."
      );
    });
};

const handleUserId = async () => {
  const currentPath = window.location.pathname;
  if (currentPath.includes("cart") || currentPath.includes("checkout")) {
    const id = await getUserId();
    if (id) {
      localStorage.setItem("user_id", id);
    } else {
      ctfAlert.alert_error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  }
};

handleUserId();
