import React from 'react';

const MessageCard = ({ message }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 rounded-lg shadow-2xl p-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <button className="text-gray-100 hover:text-gray-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-xl text-white mt-4">{message}</p>
      </div>
    </div>
  );
};

export default MessageCard;