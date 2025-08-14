// resources/js/plugins/toast.js
import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"

export default {
    install(app) {
        app.config.globalProperties.$toast = (message, type = "info") => {
            let bgStyle = "linear-gradient(to right, #00b09b, #96c93d)";
            if (type === "success") bgStyle = "linear-gradient(to right, #085078, #1D976C)";
            if (type === "error") bgStyle = "linear-gradient(to right, #D31027, #ff5f6d)";
            if (type === "warning") bgStyle = "linear-gradient(to right, #f7971e, #ffd200)";

            Toastify({
                text: message,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: bgStyle
                },
                stopOnFocus: true
            }).showToast();
        }
    }
}
