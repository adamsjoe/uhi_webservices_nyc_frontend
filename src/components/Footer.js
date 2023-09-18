import React from "react";

const Footer = ({ data }) => {
  return (
    <div className="footer">
      <b>
        Student Submission
        <span className="last-collated-date">
          FIRST COLLATED DATE: {data.first} LAST COLLATED DATE: {data.last}
        </span>{" "}
      </b>
    </div>
  );
};

export default Footer;
