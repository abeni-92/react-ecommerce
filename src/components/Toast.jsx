import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const notify = (message, type = "sucess") => {
  toast[type](message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export default Toast;
