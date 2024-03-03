import React from "react";

import Select from "react-select";
const options = [
  { value: "sec1", label: "Security Researcher 1" },
  { value: "sec2", label: "Security Researcher 2" },
  { value: "usama", label: "Usama Arshad" },
];

export default () => (
  <>
    <Select
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder="Invite researchers "
    />
    <br />
  </>
);
