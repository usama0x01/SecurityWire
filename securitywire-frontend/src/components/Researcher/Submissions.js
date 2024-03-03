import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getSubmittedPrograms,
    postNewSubmission,
    unenroll,
    downloadFile, updateSubmission,
} from "../../actions/researcherActions";
import { Loader, List, Button } from "semantic-ui-react";
import { NavLink, useHistory } from "react-router-dom";
import classes from "./researcher.module.css";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import MaterialTable from "material-table";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import MyModal from "../MyModal";

const columns = [
  { title: "Sr", field: "sr" },
  { title: "Program", field: "programId" },
  { title: "POC", field: "poc" },
  { title: "Status", field: "isApproved" },
  { title: "Actions", field: "actions" },
];
const SubmittedPrograms = () => {
  const submittedPrograms = useSelector((state) => state.submittedPrograms);
  const userId = useSelector(
    (state) => state.auth.data.data && state.auth.data.data.user._id
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setdata] = useState([]);
    const [selectedFile, setselectedFile] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const onFileUpload = (submissionId, selectedFile, idx) => {
        console.log("selected file", selectedFile[idx]);
        if (selectedFile[idx]) {
            setisLoading(true);
            const formData = new FormData();
            formData.append("file", selectedFile[idx], selectedFile[idx].name);
            dispatch(updateSubmission(submissionId, formData)).then((res) => {
                setisLoading(false);
            });
        }
    };

    const addFile = (event, idx) => {
        console.log("INDEX: ", idx);
        let selected = [...selectedFile];
        console.log("SELECETEDs: ", selected);
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
    useEffect(() => {
        console.log("I am reran!!", selectedFile);
    }, [selectedFile]);
  useEffect(() => {
    if (!userId) {
      history.push("/login");
      return;
    }
    if (!submittedPrograms.data.programs) {
      dispatch(getSubmittedPrograms());
    } else {
      const programs =
        submittedPrograms.data.programs &&
        submittedPrograms.data.programs.map((pg, idx) => ({
          sr: idx + 1,
          programId: pg.programId && pg.programId.title,
          poc: (
            <NavLink
              to="/researcher/submissions"
              onClick={() => {
                const data = { fileName: pg.poc };
                dispatch(downloadFile(data));
              }}>
              {pg.poc}
            </NavLink>
          ),
            isApproved: !pg.isApproved
                ?<p style={{background:'grey', textAlign:'center',color:'white', padding:'5px', borderRadius:'10px'}}>Pending Approval</p>
                :<p style={{background:'green', textAlign:'center',color:'white', padding:'5px', borderRadius:'10px'}}>Approved by Admin</p>,
          actions: (
            <div style={{ display: "flex" }}>
                <>
                    <Button
                        loading={isLoading ? true : false}
                        size="mini"
                        color='orange'
                        // disabled={!selectedFile[idx]}
                        onClick={() => {
                            onFileUpload(pg._id, selectedFile, idx)
                            setselectedFile([])
                        }}>
                        Upload
                    </Button>
                    <div>
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => addFile(e, idx)}
                        />
                    </div>

                </>
              <MyModal component='chat' style={{height:'50vh'}} user2={{_id:pg.programId.customer}} header={'Chat with Customer'}>
                   <Button color="blue" disabled={!pg.isApproved}>Chat with customer</Button>
              </MyModal>
              <MyModal component='chat' style={{height:'50vh'}} disabled={pg.isApproved} user2={{_id: "6106bb7f8d9f1c22c80068ac"}} header={'Chat with Admin'}>
                   <Button color="purple">Chat with admin</Button>
              </MyModal>
            </div>
          ),
        }));
      console.log(programs);
      setdata(programs);
    }
  }, [submittedPrograms,selectedFile]);
  return (
    <>
      {submittedPrograms.isLoading === true ? <Loader active /> : null}
      {submittedPrograms.data.program &&
      submittedPrograms.data.programs.length === 0 ? (
        <h3>You have not posted any submissions yet!</h3>
      ) : null}
      <MaterialTable columns={columns} data={data} title="Submitted Programs" />
    </>
  );
};

export default SubmittedPrograms;
