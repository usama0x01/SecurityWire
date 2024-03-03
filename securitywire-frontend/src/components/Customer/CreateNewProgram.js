import React, { useState, useEffect } from "react";
import { Select, Form, Button, Container } from "semantic-ui-react";
import { InScopeLinks, OutScopeLinks, VRTs } from "./MultiInput";
import {
  createNewProgram,
  clearSuccess,
  updateProgram,
  deleteProgram,
} from "../../actions/customerActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import MyModal from "../MyModal";
import { Icon } from "semantic-ui-react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import Tooltip from "@mui/material/Tooltip";

const CreateNewProgram = (props) => {
  const history = useHistory();
  const location = useLocation();
  const createProgram = useSelector((state) => state.createProgram);
  const dispatch = useDispatch();
  const [title, settitle] = useState("");
  const [intro, setintro] = useState("");
  const [detail, setdetail] = useState("");
  const [active, setactive] = useState(false);
  const [isPublic, setisPublic] = useState(false);
  const [inScopeLinks, setinScopeLinks] = useState([]);
  const [outScopeLinks, setoutScopeLinks] = useState([]);
  const [vrts, setvrts] = useState([]);
  const [errors, seterrors] = useState({});

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do delete this program?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteProgram(id));
            history.push("/customer/createdPrograms");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    console.log(location);
    if (location) {
      const { program } = location;
      let inscopelinks = [];
      let outscopelinks = [];
      let vrt = [];

      if (program) {
        inscopelinks =
          program.inScope &&
          program.inScope.map((item) => ({ value: item, label: item }));
        outscopelinks =
          program.outScope &&
          program.outScope.map((item) => ({
            value: item,
            label: item,
          }));
        vrt =
          program.vrt &&
          program.vrt.map((item) => ({
            value: item,
            label: item,
          }));
      }

      if (program) {
        console.log("PROGRAM FOUND", program);
        settitle(program.title);
        setintro(program.intro);
        setdetail(program.detail);
        setactive(program.active);
        setisPublic(program.ispublic);
        setinScopeLinks(inscopelinks);
        setoutScopeLinks(outscopelinks);
        setvrts(vrt);
      }
      if (!Boolean(location.program)) {
        settitle("");
        setintro("");
        setdetail("");
        setactive(false);
        setisPublic(false);
        setinScopeLinks([]);
        setoutScopeLinks([]);
        setvrts([]);
      }
    }
  }, [location.program]);
  useEffect(() => {
    if (createProgram.isSuccess) {
      dispatch(clearSuccess());
      history.push("/customer/createdPrograms");
    }
  }, [createProgram.isSuccess]);

  const validateForm = (body) => {
    seterrors({});
    if (!body.title.length > 0) {
      console.log("TITLE", body.title);
      seterrors((prevState) => ({
        ...prevState,
        title: "Please enter program title",
      }));
      return false;
    }
    if (body.inScope && !body.inScope.length > 0) {
      seterrors((prevState) => ({
        ...prevState,
        inScopeLinks: "Please enter at least one in scope link",
      }));
      return false;
    }
    if (body.vrt && !body.vrt.length > 0) {
      seterrors((prevState) => ({
        ...prevState,
        vrts: "Please enter at least one vrt",
      }));
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const inscopelinks = inScopeLinks && inScopeLinks.map((link) => link.value);
    const outscopelinks =
      outScopeLinks && outScopeLinks.map((link) => link.value);
    const vrt = vrts && vrts.map((link) => link.value);
    console.log("LOCATION:::", location);
    const body = {
      _id: location && location.program && location.program._id,
      title,
      intro,
      detail,
      active,
      ispublic: isPublic,
      inScope: inscopelinks,
      outScope: outscopelinks,
      vrt,
    };
    const isFormValid = validateForm(body);
    console.log("FORM VALIDATION", isFormValid, errors);
    isFormValid && seterrors({});
    isFormValid &&
      (Boolean(location.program)
        ? dispatch(updateProgram(body))
        : dispatch(createNewProgram(body)));
  };
  return (
    <Container>
      <h2>
        {location && location.program
          ? "Update Program here"
          : "Create Program here"}
      </h2>
      <Form size="large" autoComplete="off">
        <Form.Input
          fluid
          name="title"
          required={true}
          icon="pencil"
          iconPosition="left"
          placeholder="Enter Title *"
          onChange={(event) => {
            const error = { ...errors };
            delete error.title;
            seterrors(error);
            settitle(event.target.value);
          }}
          label="Enter program title"
          value={title}
        />
        {errors.title && (
          <p style={{ color: "red", marginTop: "-1em" }}>{errors.title}</p>
        )}
        <Form.Input
          fluid
          name="intro"
          icon="info"
          iconPosition="left"
          placeholder="Enter Intro *"
          onChange={(event) => {
            setintro(event.target.value);
          }}
          value={intro}
          label="Enter program intro ? *"
        />
        <InScopeLinks
          placeholder="Enter InScope Links*"
          setinScopeLinks={setinScopeLinks}
          defaultValue={inScopeLinks}
          errors={errors}
          seterrors={seterrors}
        />
        {errors.inScopeLinks && (
          <p style={{ color: "red", marginTop: "-1em" }}>
            {errors.inScopeLinks}
          </p>
        )}
        <OutScopeLinks
          placeholder="Enter Output Links*"
          setoutScopeLinks={setoutScopeLinks}
          defaultValue={outScopeLinks}
        />

        <VRTs
          placeholder="Enter VRTS*"
          setvrts={setvrts}
          seterrors={seterrors}
          errors={errors}
          defaultValue={vrts}
        />
        {errors.vrts && (
          <p style={{ color: "red", marginTop: "-1em" }}>{errors.vrts}</p>
        )}
        <Form.TextArea
          fluid
          name="detail"
          placeholder="Enter detail about this program"
          onChange={(event) => {
            setdetail(event.target.value);
          }}
          value={detail}
          label="Enter details about the program?"
        />
        <Form.Field
          control={Select}
          options={[
            { text: "Active", value: true },
            { text: "Inactive", value: false },
          ]}
          onChange={(event) => {
            event.target.innerText === "Active"
              ? setactive(true)
              : setactive(false);
          }}
          defaultValue={active ? "Active" : "Inactive"}
          placeholder={active ? "Active" : "Inactive"}
          label="Is program active ?"
        />
        <Form.Field
          control={Select}
          options={[
            { key: "t", text: "Public", value: true },
            { key: "f", text: "Private", value: false },
          ]}
          onChange={(event) => {
            event.target.innerText === "Public"
              ? setisPublic(true)
              : setisPublic(false);
          }}
          defaultValue={isPublic ? "Public" : "Private"}
          placeholder={isPublic ? "Public" : "Private"}
          label="Select Public/Private ?"
        />
        <div style={{ display: "flex" }}>
          <Button
            color="green"
            onClick={(e) => handleSubmit(e)}
            loading={createProgram.isLoading}>
            <Icon name="add" />
            {location && location.program ? "Update PROGRAM" : "CREATE PROGRAM"}
          </Button>
          {location && location.program ? (
            <>
              <Button
                color="red"
                onClick={() => {
                  handleDelete(location.program._id);
                }}>
                <Icon name="delete" />
                Delete Progam
              </Button>

              <MyModal
                component="invite-researchers"
                header="Invite Researchers"
                color="blue"
                programId={location.program._id}>
                <Button disabled={!location.program.isApproved}>
                  <Icon name="mail" />
                  Invite Researchers
                </Button>
              </MyModal>
            </>
          ) : null}
        </div>
      </Form>
    </Container>
  );
};

export default CreateNewProgram;
