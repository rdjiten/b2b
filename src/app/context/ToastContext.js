// context/ToastContext.js
import { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type) => {
        const id = Date.now();
        setToasts((prevToasts) => [
            ...prevToasts,
            { id, message, type }
        ]);
        setTimeout(() => removeToast(id), 5000);  // Toast disappears after 5 seconds
    };

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-4 right-4 z-50">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast toast-${toast.type} mb-4 p-4 rounded-md shadow-lg`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
