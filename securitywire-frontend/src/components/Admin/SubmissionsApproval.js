import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  submissionsToApprove,
  approveSubmission,
} from "../../actions/adminActions";
import { downloadFile } from "../../actions/researcherActions";
import MaterialTable from "material-table";
import { Button } from "semantic-ui-react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import MyModal from "../MyModal";

const columns = [
  { title: "Program Title", field: "title" },
  { title: "Researcher", field: "researcher" },
  { title: "Proof of Concept", field: "poc" },
  { title: "Action", field: "action" },
];

const SubmissionsApproval = () => {
  const history = useHistory();
  const [data, setdata] = useState([]);
  const submissionsApproval = useSelector((state) => state.submissionsApproval);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    console.log("TOKEN", localStorage.getItem("token"));
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
    if (
      submissionsApproval && !submissionsApproval.isSuccess && !submissionsApproval.isError
    ) {
      dispatch(submissionsToApprove());
    } else {
      const submissions =
        submissionsApproval.data.submissions &&
        submissionsApproval.data.submissions.map((sb, idx) => ({
          title: sb.programId.title,
          researcher:
            sb.researcherId.name.charAt(0).toUpperCase() +
            sb.researcherId.name.slice(1),
          poc: (
            <NavLink
              to="/admin/submissionApproval"
              onClick={() => {
                const data = { fileName: sb.poc };
                dispatch(downloadFile(data));
              }}>
              {sb.poc}
            </NavLink>
          ),
          action: (
            <>
              <Button
                loading={isLoading}
                color="blue"
                onClick={() => {
                  // console.log(sb._id);
                  handleApprove(sb._id);
                }}>
                Approve
              </Button>
              <MyModal component='chat' style={{height:'50vh'}} user2={sb.researcherId} header={'Chat with '+ sb.researcherId.name}>
                <Button color="purple">Chat</Button>
              </MyModal>
            </>
          ),
        }));
      console.log(submissions);
      setdata(submissions);
    }
  }, [submissionsApproval]);
  const handleApprove = (id) => {
    confirmAlert({
      title: "Confirm to Approve",
      message: "Are you sure to approve this program?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setisLoading(true);
            dispatch(approveSubmission(id)).then((res) => {
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
    <MaterialTable
      columns={columns}
      data={data}
      title="Submissions to Approve"
      style={{ widht: "80%" }}
    />
  );
};

export default SubmissionsApproval;
