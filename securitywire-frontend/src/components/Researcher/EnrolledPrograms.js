import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEnrolledPrograms,
  getEnrolled,
  postNewSubmission,
  unenroll,
} from "../../actions/researcherActions";
import { Loader, List, Button, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import classes from "./researcher.module.css";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import MaterialTable from "material-table";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

const columns = [
  { title: "Program Title", field: "title" },
  { title: "Company Name", field: "customer" },
  { title: "Date Created", field: "date" },
  { title: "In Scope Links", field: "inScope" },
  { title: "Out Scope Links", field: "outScope" },
  { title: "Min Bounty", field: "vrt" },
  { title: "Actions", field: "actions" },
];
const EnrolledPrograms = () => {
  const enrolledPrograms = useSelector((state) => state.enrolledPrograms);
  const userId = useSelector(
    (state) => state.auth.data.data && state.auth.data.data.user._id
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setdata] = useState([]);
  const [selectedFile, setselectedFile] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [enrolledLoading, setenrolledLoading] = useState(false);

  const onFileUpload = (programId, selectedFile, idx) => {
    console.log("selected file", selectedFile[idx]);
    if (selectedFile[idx]) {
      console.log("SELECTED FILE", selectedFile[idx], programId);
      setisLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile[idx], selectedFile[idx].name);
      console.log("I AM FORM DATA", programId, formData);
      dispatch(postNewSubmission(programId, formData)).then((res) => {
        setisLoading(false);
      });
    }
  };
  const addFile = (event, idx) => {
    // console.log("INDEX: ", idx);
    // let selected = [...selectedFile];
    // console.log("SELECETEDs: ", selected);
    const file = event.target.files[0];
    if (file) {
      console.log("INDEX SL:", idx, selectedFile[idx]);
      if (!!selectedFile[idx]) {
        setselectedFile((prevState) => prevState.splice(idx, 1, file));
      } else {
        setselectedFile((prevState) => {
          let local = [...prevState];
          local[idx] = file;
          console.log("LOCAL: ", local);
          return local;
        });
      }
    }
  };
  const handleUnenroll = (pg) => {
    console.log("UNENROLLING...", enrolledLoading)
    setenrolledLoading(true)
    dispatch(unenroll(pg)).then(res=>{
      setenrolledLoading(false)
      console.log("UNENROLLED...", enrolledLoading)

    });
  }
  useEffect(() => {
    if (!userId) {
      history.push("/login");
      return;
    }
    if (!enrolledPrograms.data.programs) {
      dispatch(getEnrolledPrograms());
    } else {
      const programs =
        enrolledPrograms.data.programs &&
        enrolledPrograms.data.programs.map((pg, idx) => ({
          title: pg.title,
          customer: pg.customer.name,
          date: new Date(pg.date).toLocaleString(),
          inScope:
            pg.inScope &&
            pg.inScope.map((scope, key) => <p key={key}>{scope}</p>),
          outScope:
            pg.outScope &&
            pg.outScope.map((scope, key) => <p key={key}>{scope}</p>),
          vrt: pg.vrt.length,
          actions: (
            <div style={{ display: "flex", width: "100px" }}>
              {pg.enrolled.length > 0 &&
              pg.enrolled.some((prog) => {
                console.log(
                  "IS SUBMITRRTRTRT ******",
                  prog.programsSubmitted,
                  pg._id.toString(),
                  prog.programsSubmitted.includes(pg._id.toString())
                );
                return (
                  prog.programsSubmitted &&
                  prog.programsSubmitted.includes(pg._id.toString())
                );
              }) ? (
                <h4>Submitted Findings!</h4>
              ) : (
                <>
                  <div>
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => addFile(e, idx)}
                    />
                  </div>
                  <Button
                    loading={isLoading ? true : false}
                    size="mini"
                    primary
                    disabled={!selectedFile[idx]}
                    onClick={() => onFileUpload(pg._id, selectedFile, idx)}>
                    Upload
                  </Button>
                </>
              )}

              <Button
                size="mini"
                secondary
                loading={enrolledLoading}
                onClick={() => {
                  handleUnenroll(pg._id)
                }}>
                Unenroll
              </Button>
            </div>
          ),
        }));
      console.log(programs);
      setdata(programs);
    }
  }, [enrolledPrograms, selectedFile]);
  useEffect(() => {
    console.log("I am reran!!", selectedFile);
  }, [selectedFile]);
  return (
    <>
      {enrolledPrograms.isLoading === true ? <Loader active /> : null}
      {enrolledPrograms.data.program &&
      enrolledPrograms.data.programs.length === 0 ? (
        <h3>You are not enrolled in any program yet</h3>
      ) : null}
      <MaterialTable

        columns={columns}
        data={data}
        title="Enrolled Programs"
        // style={{ width: "80%" }}
        // style={{width: 200}}
      />
    </>
  );
};

export default EnrolledPrograms;
