export default class CTFAlert {
  constructor() {}
  alert_success(text) {
    Swal.fire({
      icon: "success",
      title: "Thành công",
      text: text,
      showConfirmButton: true,
      confirmButtonText: "Countinue",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "index.html";
      }
    });
  }
  alert_success_v2(text) {
    Swal.fire({
      icon: "success",
      title: "Thành công",
      text: text,
      showConfirmButton: true,
      confirmButtonText: "Countinue",
    });
  }
  alert_error(text) {
    Swal.fire({
      icon: "error",
      title: "Thất bại",
      text: text,
      showConfirmButton: true,
      confirmButtonText: "Countinue",
    });
  }
  alert_warning(text) {
    Swal.fire({
      icon: "warning",
      title: "Cảnh báo",
      text: text,
      showConfirmButton: true,
      confirmButtonText: "Countinue",
    });
  }
  alert_info(text) {
    Swal.fire({
      icon: "info",
      title: "Thông báo",
      text: text,
      showConfirmButton: true,
      confirmButtonText: "Countinue",
    });
  }
}
