import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getResearchers,
  suspendUser,
  unSuspendUser,
} from "../../actions/adminActions";
import { Accordion, Icon, Button } from "semantic-ui-react";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Researchers = () => {
  const dispatch = useDispatch();
  const [activeIndex, setactiveIndex] = useState(null);
  const researchers = useSelector((state) => state.allResearchers);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (!researchers.isSuccess && !researchers.isError) {
      dispatch(getResearchers());
    } else {
      console.log("GET RESEARCHERS", researchers);
    }
  }, [researchers]);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setactiveIndex(newIndex);
  };
  const handleSuspend = (user) => {
    confirmAlert({
      title: "Confirm to Suspend",
      message: "Are you sure to do suspend this researcher?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setisLoading(true);
            dispatch(suspendUser(user)).then((res) => {
              setisLoading(false);
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const handleUnsuspend = (user) => {
    confirmAlert({
      title: "Confirm to Un-suspend",
      message: "Are you sure to do un-suspend this researcher?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setisLoading(true);
            dispatch(unSuspendUser(user)).then((res) => {
              setisLoading(false);
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <>
      <h2 style={{ textDecoration: "underline" }}>
        <i>All Security Researchers</i>
      </h2>
      <br />
      <Accordion styled fluid>
        {researchers &&
          researchers.data &&
          researchers.data.users &&
          researchers.data.users.map((researcher, idx) => (
            <>
              <Accordion.Title
                key={researcher._id}
                active={activeIndex === idx}
                index={idx}
                onClick={handleClick}>
                <h2>
                  <Icon name="dropdown" />
                  {researcher.name.charAt(0).toUpperCase() +
                    researcher.name.slice(1)}
                  {researcher.isSuspended && (
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}>
                      <span
                        style={{
                          marginRight: "5em",
                          backgroundColor: "red",
                          padding: "5px",
                          borderRadius: "10px",
                          color: "white",
                          fontSize: "60%",
                        }}>
                        Suspended
                      </span>
                    </div>
                  )}
                </h2>
              </Accordion.Title>
              <Accordion.Content key={idx} active={activeIndex === idx}>
                <p>
                  <strong>EMAIL: </strong>
                  {researcher.email}
                </p>
                <p>
                  <strong>Programs Enrolled: </strong>
                  {researcher.programsEnrolled.length}
                </p>
                <p>
                  <strong>Programs Submitted: </strong>
                  {researcher.programsSubmitted.length}
                </p>
                {researcher.isSuspended ? (
                  <>
                    <Button
                      loading={isLoading}
                      color="blue"
                      onClick={() => handleUnsuspend(researcher)}>
                      Unsuspend
                    </Button>
                  </>
                ) : (
                  <Button
                    loading={isLoading}
                    color="red"
                    onClick={() => handleSuspend(researcher)}>
                    Suspend
                  </Button>
                )}
              </Accordion.Content>
            </>
          ))}
      </Accordion>
    </>
  );
};

export default Researchers;
