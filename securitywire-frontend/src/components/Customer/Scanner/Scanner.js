import React, { useState, useEffect } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getCreatedScans, scanProgram } from "../../../actions/customerActions";
import { useHistory } from "react-router";
import MaterialTable from "material-table";
import urlExist from "url-exist";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { useStateManager } from "react-select";

const columns = [
  { title: "URL", field: "url" },
  { title: "Date Created", field: "date" },
  { title: "Status", field: "status" },
  { title: "Logs", field: "log" },
];

const Scanner = () => {
  const [data, setdata] = useState([]);
  const [url, seturl] = useState("");
  const [urlError, seturlError] = useState();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const createdScans = useSelector((state) => state.createdScans);
  const [Results, setResults] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) history.push("/login");
  }, []);

  useEffect(() => {
    loadResults();
    const socket = socketIOClient("http://localhost:4000/");
    socket.on("FromAPI", (data) => {
      console.log("------===+===---------");
      loadResults();
    });
  }, []);

  const loadResults = async () => {
    seturlError(null);
    let config = {};
    try {
      config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
    } catch (e) {
      console.log(e);
    }
    axios
      .get(`http://localhost:8000/api/v1/Scanner`, config)
      .then((response) => {
        const result = response.data;
        var { status, data } = result;
        data = JSON.stringify(data);
        data = JSON.parse(data);
        data = data.Scan;
        if (status != "success") {
          seturlError("some error occured");
        } else {
          data = data.filter((val) => val.url != "error");
          console.log(data);
          setResults(data);
        }
      })
      .catch((error) => {
        if (error.status == 403) {
          seturlError("Access denied, Login Again");
        } else {
          seturlError("An error occurred. Check your network and try again");
        }
        console.log(error);
        console.log("error");
      });
  };

  useEffect(() => {
    if (!createdScans.isSuccess) {
      dispatch(getCreatedScans());
    } else {
      const dataLocal =
        Results &&
        Results.map((data) => ({
          url: data.url,
          date: new Date(data.date).toDateString(),
          logs: data.logs,
          status:
            data.status === "active" ? (
              <span
                style={{
                  background: "orange",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {data.status}
              </span>
            ) : (
              <span
                style={{
                  background: "green",
                  color: "white",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {data.status}
              </span>
            ),
        }));
      setdata(dataLocal);
    }
  }, [createdScans]);
  const isValidUrl = () => {
    const r = new RegExp(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    );
    const isValid = r.test(url);
    console.log("IS VALID:", url, isValid);
    if (isValid) {
      seturlError(undefined);
      return true;
    }
    seturlError("Invalid url, please try again!");
    return false;
  };
  function validURL(str) {
    var pattern = new RegExp(
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  const sendValues = async (e) => {
    e.preventDefault();
    seturlError(null);
    const isLive = await urlExist(url);
    console.log(validURL(url));
    console.log(isLive);
    console.log("isLive");
    if (validURL(url)) {
      axios
        .get(`http://localhost:8000/api/v1/Scanner/status`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          var { status, data } = response;
          if (data.status != false) {
            seturlError("Wait for Previous Scan to complete.");
          } else {
            seturl(null);
            fetch(`http://localhost:8000/api/v1/Scanner/create`, {
              method: "POST",
              headers: {
                Acc6ept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({ url: url }),
            }).catch((error) => {
              if (error.status == 403) {
                seturlError("Access denied, Login Again");
              } else {
                seturlError(
                  "An error occurred. Check your network and try again"
                );
              }
              console.log(error);
              console.log("error-inner");
            });
          }
        })
        .catch((error) => {
          if (error.status == 403) {
            seturlError("Access denied, Login Again");
          } else {
            seturlError("An error occurred. Check your network and try again");
          }
          console.log(error);
          console.log("error");
        });
    } else {
      seturlError("Enter Valid Url.");
    }
    loadResults();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidUrl()) return;
    setloading(true);
    dispatch(scanProgram(url)).then((res) => {
      setloading(false);
    });
  };
  return (
    <div>
      <br />
      <h1 style={{ textAlign: "center" }}>
        Welcome to Security Wire Automated Scanning
      </h1>
      <form
        onSubmit={sendValues}
        style={{ display: "flex", justifyContent: "center", margin: "3em" }}
      >
        <Input
          icon="searchengin"
          size="massive"
          placeholder="Enter url to scan"
          style={{ marginRight: "1em" }}
          onChange={(e) => seturl(e.target.value)}
        />
        <Button loading={loading} disable={loading} color="blue">
          Scan Now
        </Button>
      </form>
      {urlError && (
        <h3 style={{ color: "red", textAlign: "center" }}>{urlError}</h3>
      )}
      <br />
      <MaterialTable
        columns={columns}
        data={data.reverse()}
        title="Your Scans"
        style={{ widht: "80%", maxHeight: "50vh", overflow: "scroll" }}
      />
    </div>
  );
};

export default Scanner;
