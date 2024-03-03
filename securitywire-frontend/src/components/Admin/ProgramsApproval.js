import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { programsToApprove, approveProgram } from "../../actions/adminActions";
import MaterialTable from "material-table";
import { Button } from "semantic-ui-react";
import MyModal from "../MyModal";
const columns = [
  { title: "Program Title", field: "title" },
  { title: "Company Name", field: "customer" },
  { title: "Date Created", field: "date" },
  { title: "In Scope Links", field: "inScope" },
  { title: "Out Scope Links", field: "outScope" },
  { title: "VRT", field: "vrt" },
  { title: "Action", field: "action" },
];

const ProgramsApproval = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setdata] = useState([]);
  const programsApproval = useSelector((state) => state.programsApproval);

  useEffect(() => {
    console.log("TOKEN", localStorage.getItem("token"));
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
    if (programsApproval && !programsApproval.isSuccess && !programsApproval.isError) {
      dispatch(programsToApprove());
    } else {
      console.log("programs", programsApproval, programsApproval.data.programs);
      const programs =
        programsApproval.data.programs &&
        programsApproval.data.programs.map((pg, idx) => ({
          title: pg.title,
          customer: pg.customer.name,
          date: pg.date,
          inScope:
            pg.inScope &&
            pg.inScope.map((scope, key) => <p key={key}>{scope}</p>),
          outScope:
            pg.outScope &&
            pg.outScope.map((scope, key) => <p key={key}>{scope}</p>),
          vrt: pg.vrt && pg.vrt.map((scope, key) => <p key={key}>{scope}</p>),
          action: (
            <>
              <Button
                color="blue"
                onClick={() => {
                  console.log(pg._id);
                  dispatch(approveProgram(pg._id));
                }}>
                Approve
              </Button>
                <MyModal component='chat' style={{height:'50vh'}} user2={pg.customer} header={'Chat with '+pg.customer.name}>
                    <Button color="purple">Chat</Button>
                </MyModal>
            </>
          ),
        }));
      console.log(programs);
      setdata(programs);
    }
  }, [programsApproval]);
  return (
    <MaterialTable

      columns={columns}
      data={data}
      title="Programs to Approve"
      style={{ widht: "80%" }}
    />
  );
};

export default ProgramsApproval;
