export default class CTFAlert {
    constructor() { }
    aler_success(text) {
        Swal.fire({
            icon: "success",
            title: "Thành công",
            text: text,
            showConfirmButton: true,
            confirmButtonText: 'Countinue',
        }).then((result) => {
            if (result.isConfirmed) {

                window.location.href = "index.html";
            }
        });
    }
    aler_error(text) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: text,
            showConfirmButton: true,
            confirmButtonText: 'Countinue',
        });
    }
}

