import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getCustomers,
  suspendUser,
  unSuspendUser,
} from "../../actions/adminActions";
import { Accordion, Icon, Button } from "semantic-ui-react";
import { getContrastRatio } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Customers = () => {
  const dispatch = useDispatch();
  const [activeIndex, setactiveIndex] = useState(null);
  const customers = useSelector((state) => state.allCustomers);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    if (!customers.isSuccess && !customers.isError) {
      dispatch(getCustomers());
    } else {
      console.log("GET Customers", customers);
    }
  }, [customers]);
  const handleSuspend = (user) => {
    confirmAlert({
      title: "Confirm to Suspend",
      message: "Are you sure to do suspend this customer?",
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
      message: "Are you sure to do un-suspend this customer?",
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
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setactiveIndex(newIndex);
  };
  return (
    <div style={{ overflow: "scroll", maxHeight: "80vh" }}>
      <h2 style={{ textDecoration: "underline" }}>
        <i>All Customers</i>
      </h2>
      <br />
      <Accordion styled fluid>
        {customers &&
          customers.data &&
          customers.data.users &&
          customers.data.users.map((user, idx) => (
            <>
              <Accordion.Title
                key={user._id}
                active={activeIndex === idx}
                index={idx}
                onClick={handleClick}>
                <h2>
                  <Icon name="dropdown" />
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                  {user.isSuspended && (
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
                  {user.email}
                </p>
                <p>
                  <strong>Programs Created: </strong>
                  {user.createdPrograms.length}
                </p>
                {user.isSuspended ? (
                  <>
                    <Button
                      loading={isLoading}
                      color="blue"
                      onClick={() => handleUnsuspend(user)}>
                      Unsuspend
                    </Button>
                  </>
                ) : (
                  <Button
                    loading={isLoading}
                    color="red"
                    onClick={() => handleSuspend(user)}>
                    Suspend
                  </Button>
                )}
              </Accordion.Content>
            </>
          ))}
      </Accordion>
    </div>
  );
};

export default Customers;
