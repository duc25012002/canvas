



const baseUrl = 'https://mobile-store.id.vn';

const getUserId = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
    } else {
        ctf_get_token_api(token);
    }
};

const ctf_get_token_api = (token) => {
    return axios({
        method: 'GET',
        url: baseUrl + '/api/user-id',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        console.log("User ID:", response);
        localStorage.setItem("user_id", id);
    }).catch(error => {
        console.error("Error fetching user_id:", error);
    });
}


const handleUserId = async () => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("cart") || currentPath.includes("checkout")) {
        const id = await getUserId();
        if (id) {
            localStorage.setItem("user_id", id);
        } else {
            ctfAlert.aler_error("Something went wrong. Please try again.");
        }
    }
};


handleUserId(); 