import React from "react";

const Footer = ({ data }) => {
  return (
    <div className="footer">
      <b>
        Student Submission
        <span className="last-collated-date">
          First collated date: {data.first} Last collated date: {data.last}
        </span>{" "}
      </b>
    </div>
  );
};

export default Footer;
