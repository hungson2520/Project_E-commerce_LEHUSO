import React from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
const OTPInput = () => {
  const location = useLocation();

  const { emailReset } = location.state || {};

  return (
    <div className="flex  flex-col items-center justify-center h-screen">
      <div className="bg-gray-200 p-8 rounded-md shadow-md ">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="mb-4">
          Chúng tôi đã gửi mã OTP đến email {emailReset} của bạn.
        </p>
        <div className="flex space-x-7 mb-4">
          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 text-center border border-gray-300 rounded"
          />
          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 text-center border border-gray-300 rounded"
          />
          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 text-center border border-gray-300 rounded"
          />
          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 text-center border border-gray-300 rounded"
          />
          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 text-center border border-gray-300 rounded"
          />
          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 text-center border border-gray-300 rounded"
          />
        </div>
        <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Xác Thực Tài Khoản
        </button>
      </div>
    </div>
  );
};

export default OTPInput;
