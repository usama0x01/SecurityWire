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
import { Link } from "react-router-dom";
import Select from "react-select";
import { register } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const roleOptions = [
  { label: "Customer", value: "customer" },
  { label: "Security Researcher", value: "security-researcher" },
];
const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [success, setsuccess] = useState(false);
  const history = useHistory();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const [errors, seterrors] = useState([]);
  const [loading, setloading] = useState(false);
  const [role, setrole] = useState({ value: "customer", label: "Customer" });

  useEffect(() => {
    if (auth.isSuccess) {
      setsuccess(true);
      setloading(false);
      if (auth.data) {
        console.log("OBESERVER: ", auth.data.data.user.role);
        localStorage.setItem("token", auth.data.token);
        history.push(`/${auth.data.data.user.role}/createdPrograms`);
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

  const isFormValid = () => {
    let errors = [];
    let error;

    if (isFormEmpty()) {
      error = { message: "Fill in all fields" };
      seterrors(errors.concat(error));
      return false;
    } else if (!isPasswordValid()) {
      error = { message: "Password is invalid" };
      seterrors(errors.concat(error));
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = () => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const isPasswordValid = () => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      seterrors([]);
      setloading(true);
      //console.log("ROLE: ", role);
      dispatch(
        register({
          username,
          email,
          role: role.value,
          password,
          passwordConfirmation,
        })
      );
    }
  };
  const handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="orange" textAlign="center">
          Register here
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={(event) => setusername(event.target.value)}
              value={username}
              type="text"
            />

            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={(event) => setemail(event.target.value)}
              value={email}
              className={handleInputError(errors, "email")}
              type="email"
            />
            <div style={{ textAlign: "left", marginBottom: "10px" }}>
              <Select
                label="Select Role"
                defaultValue={[roleOptions[0], roleOptions[0]]}
                name="role"
                placeholder={"Select Role"}
                options={roleOptions}
                onChange={(e) => {
                  console.log(e.value);
                  setrole(e);
                }}
              />
            </div>
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={(event) => setpassword(event.target.value)}
              value={password}
              className={handleInputError(errors, "password")}
              type="password"
            />

            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={(event) => setpasswordConfirmation(event.target.value)}
              value={passwordConfirmation}
              className={handleInputError(errors, "password")}
              type="password"
            />

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="orange"
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
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
