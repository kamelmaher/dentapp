import { toast } from "react-toastify";

export const showSuccess = (msg?: string) => {
    toast.success(msg || "تمت العملية بنجاح");
};

export const showError = (msg?: string) => {
    toast.error(msg || "حدث خطأ ما");
};

export const showInfo = (msg: string) => {
    toast.info(msg);
};

export const showWarning = (msg: string) => {
    toast.warn(msg);
};