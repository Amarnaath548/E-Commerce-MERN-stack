import React from "react";

const ErrorComponent = ({ error }) => {
  return (
    <div className="mt-5 p-5">
      <h2 className="text-red-700 text-2xl font-medium">{error.message}</h2>
    </div>
  );
};

export default ErrorComponent;
