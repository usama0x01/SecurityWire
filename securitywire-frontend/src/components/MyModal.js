import React from "react";
import { Button, Modal, Icon } from "semantic-ui-react";
import InviteResearchers from "./Customer/InviteResearchers";
import Chat from "./Chat/Chat";

function MyModal(props) {
  const {
    component,
    header,
    data,
    color,
    type,
    name,
    size,
    action,
    programId,
      user2

  } = props;
  const [open, setOpen] = React.useState(false);
  const toggleModal = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <Modal
      closeOnDimmerClick={true}
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        props.children ? (
          props.children
        ) : (
          <Button color={color} size={size} fluid>
            <Icon name="add" />
            {header}
          </Button>
        )
      }
      open={open}
      size="tiny"
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        {console.log("COMPONENT", component)}
        {component === "invite-researchers" && (
          <InviteResearchers programId={programId} toggleModal={toggleModal} />
        )}
        {component === "chat" && (
         <Chat user2={user2}/>
        )}
      </Modal.Content>
    </Modal>
  );
}

export default MyModal;
