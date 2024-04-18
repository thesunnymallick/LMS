import React from 'react';
import { HashLoader} from "react-spinners"
const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30 z-50">
     <HashLoader color="#a436d6" />
    </div>
  );
};

export default LoadingSpinner;
