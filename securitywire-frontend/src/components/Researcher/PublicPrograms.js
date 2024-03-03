import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPublicPrograms,
  getEnrolled,
} from "../../actions/researcherActions";
import {
  Card,
  Container,
  Loader,
  Table,
  Dropdown,
  Button,
  Icon,
  List,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import classes from "./researcher.module.css";
import MaterialTable from 'material-table';

const PublicPrograms = () => {
  const publicPrograms = useSelector((state) => state.publicPrograms);
  const userId = useSelector(
    (state) => state.auth.data.data && state.auth.data.data.user._id
  );
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!userId) {
      history.push("/login");
      return;
    }
    if (!publicPrograms.isSuccess && !publicPrograms.isLoading) {
      dispatch(getPublicPrograms());
    }
  }, [publicPrograms]);
  return (
    <>
      {publicPrograms.isLoading === true ? <Loader active /> : null}
      {publicPrograms.isSuccess > 0
        ? [...publicPrograms.data.program].map((program, idx) => {
            return (
            <Card fluid key={idx} style={{width:'85%', margin:'0 auto', marginTop:'3em'}}>
              <Card.Content header={program.title}/>
              {program.detail && <Card.Content description={program.detail && program.detail.substring(0, 50) + '...'}/>}
              {program.inScope.length>0 && <Card.Content>
                {program.inScope.length > 0 && "IN SCOPE LINKS:"}
                {program.inScope.map((link, idx) => (
                    <span key={idx} className={classes.linksItem}>
                    {link}
                  </span>
                ))}
              </Card.Content>}
              {program.outScope.length>0 && <Card.Content>
                {program.outScope.length > 0 && "OUT SCOPE LINKS:"}
                {program.outScope.map((link, idx) => (
                    <span key={idx} className={classes.linksItem}>
                    {link}
                  </span>
                ))}
              </Card.Content>}
              <Card.Content extra>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <span>CREATED BY : <strong><Icon name='user' />{program.customer.name}</strong></span>
                  {program.enrolled.find(user => user.toString() === userId.toString()) ? <Button
                      disabled
                      color="blue"
                      style={{marginRight: '2em'}}
                      onClick={() => {
                        dispatch(getEnrolled(program._id));
                      }}>
                    Enrolled
                  </Button>: <Button
                      color="blue"
                      style={{marginRight: '2em'}}
                      onClick={() => {
                        dispatch(getEnrolled(program._id));
                      }}>
                    Get enrolled
                  </Button>}
                </div>
              </Card.Content>
            </Card>
            );
          })
        : null}
    </>
  );
};

export default PublicPrograms;