import React, { useEffect, useState } from "react";
import {
  Container,
  Loader,
  Table,
  Dropdown,
  Button,
  Icon,
  Modal,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadCreatedPrograms,
  deleteProgram,
  clearDeletedProgram,
  updateProgram,
  getSecurityResearchers,
} from "../../actions/customerActions";
import { downloadFile } from "../../actions/researcherActions";
import MyModal from "../MyModal";
import { useHistory, NavLink } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import MaterialTable from "material-table";
import Payment from "./Payment";
const CreatedPrograms = () => {
  const programs = useSelector((state) => state.createdPrograms);
  const deletedProgram = useSelector((state) => state.deleteProgram);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(loadCreatedPrograms());
  }, [
    programs.data && programs.data.data && programs.data.data.results,
    deletedProgram.isSuccess,
  ]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do delete this program?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteProgram(id)),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  if (programs.isLoading) return <Loader active />;
  if (programs.isError) return <h3>{programs.errorMessage}</h3>;
  return (
    <Container>
      <h4>All Created Programs</h4>
      {!programs.isSuccess === true ? <Loader active /> : null}
      {programs.isSuccess && (
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sr #.</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Creation Date</Table.HeaderCell>
              <Table.HeaderCell>Approval Status</Table.HeaderCell>
              <Table.HeaderCell>Visiblity</Table.HeaderCell>
              <Table.HeaderCell>Enrolled Researchers</Table.HeaderCell>
              <Table.HeaderCell>Invited Researchers</Table.HeaderCell>
              <Table.HeaderCell>Submissions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {programs.data.program.reverse().map((program, index) => {
              return (
                <Table.Row
                  key={program._id}
                  onClick={() =>
                    history.push({
                      pathname: "/customer/createProgram",
                      program,
                    })
                  }>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{program.title}</Table.Cell>
                  <Table.Cell>{program.date}</Table.Cell>
                  <Table.Cell>
                    {program.isApproved ? "Yes" : "Pending"}
                  </Table.Cell>
                  <Table.Cell>
                    {program.ispublic ? "Public" : "Private"}
                  </Table.Cell>
                  <Table.Cell>{program.enrolled.length}</Table.Cell>
                  <Table.Cell>{program.invited.length}</Table.Cell>
                  <Table.Cell>{program.submissions.length}</Table.Cell>

                  <Table.Cell>
                    <Dropdown text="Actions">
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            history.push({
                              pathname: "/customer/createProgram",
                              program,
                            })
                          }>
                          <Icon name="add" color="green" />
                          Update Program
                        </Dropdown.Item>

                        <Dropdown.Item
                          disabled={deletedProgram.isLoading}
                          onClick={() => handleDelete(program._id)}>
                          <Icon name="delete" color="red" />
                          Delete program
                        </Dropdown.Item>
                        <SubmissionsModal program={program} />
                        <Dropdown.Item disabled={!program.isApproved}>
                          <MyModal
                            component="invite-researchers"
                            header="Invite Researchers"
                            programId={program._id}>
                            <Dropdown.Item>
                              <Icon name="mail" />
                              Invite Researchers
                            </Dropdown.Item>
                          </MyModal>
                        </Dropdown.Item>
                        <Dropdown.Item disabled={program.isApproved}>
                          <MyModal
                              component='chat'
                              header="Chat with admin"
                              user2={{_id: "6106bb7f8d9f1c22c80068ac"}}>
                            <Dropdown.Item>
                              <Icon name="chat" />
                              Chat with Admin
                            </Dropdown.Item>
                          </MyModal>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </Container>
  );
};

export default CreatedPrograms;

const columns = [
  { title: "Name", field: "researcher" },
  { title: "Proof of Concept", field: "poc" },
  { title: "Action", field: "action" },
];

function SubmissionsModal({ program }) {
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    if (program.submissions) {
      const submissions = program.submissions.map((sb, idx) => ({
        researcher:
          sb.researcherId.name.charAt(0).toUpperCase() +
          sb.researcherId.name.slice(1),
        poc: (
          <p
            onClick={() => {
              const data = { fileName: sb.poc };
              dispatch(downloadFile(data));
            }}>
            {sb.poc}
          </p>
        ),
        action: (
          <>
            {/* <Button loading={isLoading} color="blue">
              Accept Submission
            </Button> */}
            <Payment submission={sb} program={program} />
            {/*<Button color="purple">Chat</Button>*/}
            <MyModal component='chat' style={{height:'50vh'}} user2={sb.researcherId} header={'Chat with '+ sb.researcherId.name}>
              <Button color="purple">Chat</Button>
            </MyModal>
          </>
        ),
      }));
      console.log(submissions);
      setdata(submissions);
    }
  }, [program]);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Dropdown.Item disabled={program.submissions.length === 0}>
          <Icon name="address book" color="grey" />
          View Submissions
        </Dropdown.Item>
      }>
      <Modal.Header>Submissions for {program.title}</Modal.Header>
      <Modal.Content>
        <div style={{ zIndex: 99999999 }}>
          <MaterialTable
            columns={columns}
            data={data}
            title="Submissions"
            style={{ widht: "80%" }}
          />
        </div>
      </Modal.Content>
    </Modal>
  );
}
