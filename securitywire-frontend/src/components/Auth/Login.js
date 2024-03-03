import React, { useState, useEffect } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import Particles from "react-tsparticles";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login } from "../../actions/index";
import classes from "./style.module.css";

const Login = () => {
  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState([]);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.isSuccess) {
      setsuccess(true);
      setloading(false);
      if (auth.data) {
        console.log("OBESERVER: ", auth.data.data.user.role);
        localStorage.setItem("token", auth.data.token);
        auth.data.data.user.role === "customer"
          ? history.push(`/customer/createdPrograms`)
          : auth.data.data.user.role === "admin"
          ? history.push(`/admin/programApproval`)
          : history.push(`/researcher/enrolled`);
      }
    }
    if (auth.isError) {
      let errors = [];
      let error;
      error = { message: auth.errorMessage };
      seterrors(errors.concat(error));
      setloading(false);
    }
  }, [auth]);
  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      seterrors([]);
      setloading(true);
      dispatch(login({ email, password }));
    }
  };

  const isFormValid = () => email && password;

  const handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };
  return (
      <>
    <Grid
      textAlign="center"
      verticalAlign="middle"
      className={classes.background}>
      <Grid.Column style={{ maxWidth: 450, padding:'50px',}} >
        <Header as="h1" icon color="violet" textAlign="center">
          Login here
        </Header>
        <Form onSubmit={handleSubmit} size="large" autoComplete="off">
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={(event) => {
                setemail(event.target.value);
              }}
              value={email}
              className={handleInputError(errors, "email")}
              type="email"
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={(event) => {
                setpassword(event.target.value);
              }}
              value={password}
              className={handleInputError(errors, "password")}
              type="password"
            />

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="violet"
              fluid
              size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
        {success ? <Message success>Login Success</Message> : null}
        <Message>
          Dont't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
        </>
  );
};

export default Login;
