import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInvitedPrograms,
  getInvited,
  getEnrolled,
} from "../../actions/researcherActions";
import { Loader, List, Button } from "semantic-ui-react";
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
const InvitedPrograms = () => {
  const invitedPrograms = useSelector((state) => state.invitedPrograms);
  const userId = useSelector(
    (state) => state.auth.data.data && state.auth.data.data.user._id
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setdata] = useState([]);
  useEffect(() => {
    if (!userId) {
      history.push("/login");
      return;
    }
    if (!invitedPrograms.data.programs) {
      dispatch(getInvitedPrograms());
    } else {
      const programs =
        invitedPrograms.data.programs &&
        invitedPrograms.data.programs.map((pg) => ({
          title: pg.title,
          customer: pg.customer.name,
          date: pg.date,
          inScope:
            pg.inScope &&
            pg.inScope.map((scope, key) => <p key={key}>{scope}</p>),
          outScope:
            pg.outScope &&
            pg.outScope.map((scope, key) => <p key={key}>{scope}</p>),
          vrt: pg.vrt.length,
          actions: (
            <div style={{ display: "flex" }}>
              <Button
                size="mini"
                primary
                onClick={() => {
                  dispatch(getEnrolled(pg._id));
                }}>
                Accept Invitation
              </Button>

              <Button size="mini" danger>
                Reject
              </Button>
            </div>
          ),
        }));
      console.log(programs);
      setdata(programs);
    }
  }, [invitedPrograms]);
  return (
    <>
      {invitedPrograms.isLoading === true ? <Loader active /> : null}
      {invitedPrograms.data.program &&
      invitedPrograms.data.programs.length === 0 ? (
        <h3>You are not invited in any program yet</h3>
      ) : null}
      <MaterialTable columns={columns} data={data} title="Invited Programs" />
    </>
  );
};

export default InvitedPrograms;
