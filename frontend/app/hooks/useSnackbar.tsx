import { toast, Slide } from 'react-toastify';

export type SnackbarTypes = 'info' | 'success' | 'error';

const useSnackBar = () => {
  const showSnackBar = (message: string, type: SnackbarTypes) => {
    toast[type](message, {
      position: 'bottom-center',
      autoClose: type !== 'error' ? 3000 : false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'colored',
      transition: Slide,
    });
  };

  return {
    showSnackBar,
  };
};

export default useSnackBar;
