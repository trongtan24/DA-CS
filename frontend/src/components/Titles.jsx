import React from "react";

const Titles = ({ title1, title2, titleStyle1, titleStyle2, paraStyle }) => {
  return (
    <div className={`${titleStyle1} bg-white rounded-xl`}>
      <h2 className={`${titleStyle2} h2 !m-0`}>
        {" "}
        {title1}
        <span className="text-base"> {title2} </span>
      </h2>
    </div>
  );
};

export default Titles;
