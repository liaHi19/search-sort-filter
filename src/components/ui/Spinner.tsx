import React, { FC } from "react";
import { ClimbingBoxLoader } from "react-spinners";

const Spinner: FC = () => {
  return (
    <div className="flex items-center justify-center w-100">
      <ClimbingBoxLoader />
    </div>
  );
};

export default Spinner;
