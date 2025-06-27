// import Toast from 'react-native-toast-message';

// const showToast = (type, title, message) => {
//   Toast.show({
//     type: type,
//     text1: title,
//     text2: message,
//     position: 'top', 
//     visibilityTime: 3000, 
//     autoHide: true,
//     topOffset: 30, 
//     bottomOffset: 40,
//   });
// };

// const ToastService = {
//   showSuccess: (title, message) => showToast('success', title, message),
//   showError: (title, message) => showToast('error', title, message),
//   showInfo: (title, message) => showToast('info', title, message),
// };

// export default ToastService;

import Toast from 'react-native-simple-toast';

const showToast = (message) => {
  Toast.show(message, Toast.LONG); 
};

const ToastService = {
  showSuccess: (title, message) => showToast(message || title || 'Success'),
  showError: (title, message) => showToast(message || title || 'Error'),
  showInfo: (title, message) => showToast(message || title || 'Info'),
};

export default ToastService;

