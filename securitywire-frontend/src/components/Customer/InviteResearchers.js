import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelector, useDispatch } from "react-redux";
import {
  getSecurityResearchers,
  inviteResearchers,
} from "../../actions/customerActions";
const animatedComponents = makeAnimated();

export default function InviteResearchers({ programId, toggleModal }) {
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const researchers = useSelector((state) => state.inviteResearchers);
  const programs = useSelector((state) => state.createdPrograms);
  let [selectedResearchers, setselectedResearchers] = useState([]);
  useEffect(() => {
    // console.log("I AM LAODED INVITE");
    const program =
      programs.isSuccess &&
      programs.data.program.find((program) => program._id === programId);
    // console.log("PROGRAM FOUND", program, program.invited);
    setselectedResearchers(program.invited);
    dispatch(getSecurityResearchers())
      .then((res) => {
        //console.log("RESPONSE: ", res);
        let optionsLocal = res.users.map((user) => ({
          value: user._id,
          label: user.name.charAt(0).toUpperCase() + user.name.slice(1),
        }));
        const selected =
          program &&
          optionsLocal.map((option) => {
            if (program.invited.includes(option.value.toString())) {
              return option;
            }
          });
        optionsLocal = optionsLocal.filter(
          (option) => !program.invited.includes(option.value)
        );
        console.log("SELECTED, OPTIONS", selected, optionsLocal);
        setselectedResearchers([...selected]);
        setOptions([...optionsLocal]);
      })
      .catch((err) => console.error(err.message));
  }, [programs]);
  const handleChange = (e) => {
    console.log("I am changed", e);
    const selectedResearchersLocal = [...e];
    setselectedResearchers(selectedResearchersLocal);
  };
  const handleSubmit = () => {
    if (selectedResearchers.length > 0) {
      // console.log("SELECETED REASEACERSSS", selectedResearchers);
      const users = selectedResearchers.map(
        (researcher) => researcher && researcher.value
      );
      console.log("INVTIED RESEARCHERS!!", users);
      dispatch(inviteResearchers({ users }, programId));
      toggleModal();
    }
  };
  return (
    <form onSubmit={toggleModal}>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        value={selectedResearchers}
        isMulti
        options={options}
        onChange={(e) => handleChange(e)}
      />
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button color="green" type="submit" onClick={handleSubmit}>
          Invite Researchers
        </Button>
      </div>
    </form>
  );
}
