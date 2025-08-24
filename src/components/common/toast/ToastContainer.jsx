import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../../reduxToolKit/toastSlice.jsx';

export default function ToastComponent() {
  const dispatch = useDispatch();
  const { message, show, variant, icon } = useSelector((state) => {
    return state.toast;
  });
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  return (
    <>
    </>
    // <div className={`toast-container position-fixed bottom-0 end-0 p-3 ${show ? 'show' : ''}`}>
    //   <div className={`toast align-items-center text-bg-${variant} border-0`} role="alert" aria-live="assertive" aria-atomic="true">
    //     <div className="d-flex">
    //       <div className="toast-body">
    //         {icon && <i className={`bi ${icon}`}></i>} {message}
    //       </div>
    //       <button type="button" className="btn-close me-2 m-auto" onClick={() => dispatch(hideToast())}></button>
    //     </div>
    //   </div>
    // </div>
  );
}
