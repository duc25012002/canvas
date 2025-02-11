import apiService from "./api.js";
import { token } from "./api.js";
import { getOrderList } from "./order.js";
import CTFAlert from "../assets/js/ctf-alert.js";
const ctfAlert = new CTFAlert();

export const vnpayPayment = async (orderId, amount, urlReturn) => {
  const endpoint = "/api/order/vnpay_payment";
  const body = {
    order_id: orderId,
    amount: amount,
    url_return: urlReturn,
  };

  try {
    const response = await apiService.post(
      endpoint,
      body,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("VNPay Payment URL:", response.data);
    return response.data;
  } catch (error) {
    console.error("VNPay Payment failed:", error);
    ctfAlert.alert_error("Thanh toán VNPay thất bại.");
    throw error;
  }
};

export const processOrderPayment = async (urlReturn) => {
  const orderList = await getOrderList(token);

  if (orderList && orderList.length > 0) {
    const latestOrder = orderList[0];
    const { code, total_price } = latestOrder;
    try {
      const paymentResponse = await vnpayPayment(code, total_price, urlReturn);

      if (paymentResponse) {
        console.log(
          `Đang chuyển hướng đến trang thanh toán cho đơn hàng ${code}...`
        );
        ctfAlert.alert_success_v2(
          `Chuyển hướng đến trang thanh toán cho đơn hàng ${code}...`
        );
        setTimeout(() => {
          window.location.href = paymentResponse;
        }, 1500);
      } else {
        console.log("Không nhận được URL thanh toán từ VNPay.");
        ctfAlert.alert_error("Không nhận được URL thanh toán từ VNPay.");
      }
    } catch (error) {
      ctfAlert.alert_error(
        `Lỗi khi khởi tạo thanh toán cho đơn hàng ${code}: ${error.message}`
      );
    }
  } else {
    ctfAlert.alert_warning("Không có đơn hàng để thanh toán.");
  }
};
