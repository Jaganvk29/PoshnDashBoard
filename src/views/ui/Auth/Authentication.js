import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../Context/AuthContext";
import jwt_decode from "jwt-decode";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col,
  FormGroup,
  Alert,
} from "reactstrap";
import "../../../Css/main.css";
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const token = localStorage.getItem("tokenkey");
  const refreshtoken = localStorage.getItem("refresh");

  // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
  };

  const history = useNavigate();

  const [accessTokenn, setaccessToken] = useState();
  const [refreshTokenn, setrefreshToken] = useState();
  const [isrefreshtoken, setrefreshtoken] = useState(false);

  const [enteredusername, setuserName] = useState();
  const [enteredpassword, setpassword] = useState();
  const [authresponse, setauthresponse] = useState();
  const [autherrorresponse, setautherrorresponse] = useState();
  const [autherrormsg, setautherrormsg] = useState();

  const { isLogged, authHandler } = useContext(AuthContext);

  useEffect(() => {
    let currentDate = new Date();
    const refreshtokencode = localStorage.getItem("refresh");
    const accesstoeken = localStorage.getItem("tokenkey");

    if (refreshtokencode === null || undefined) {
      history("/login");
      console.log("Code Undefind");
    } else {
      const decodedToken = jwt_decode(refreshtokencode);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        history("/login");
        console.log("Code Found");
      } else {
        const decodedaccessToken = jwt_decode(accesstoeken);
        if (decodedaccessToken.exp * 1000 < currentDate.getTime()) {
          history("/login");
        } else {
          authHandler(true);
          history("/starter");
        }

        // const freshAccessCode = refreshToken();
      }
    }
  }, []);

  const remove = () => {
    localStorage.removeItem("Name");
    localStorage.removeItem("Password");
  };

  const authposthandler = () => {
    const authData = {
      username: enteredusername,
      password: enteredpassword,
    };

    axios
      .post(`/admin/login`, authData)
      .then((response) => {
        setaccessToken(response.data.access);
        setrefreshToken(response.data.refresh);
        setauthresponse(response.data);

        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem("tokenkey", response.data.access);

        authHandler(true);
        history("/starter");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 400) {
          setautherrorresponse(true);
        }
      });
  };

  const loginBtnHadler = () => {
    authHandler(true);
  };

  return (
    <div>
      <main>
        <div className="Authpage">
          <AvForm onSubmit={authposthandler}>
            <Row className="Authpage-container">
              <Col xs="12" md="4">
                {autherrorresponse && (
                  <Alert color="warning">
                    {autherrormsg != undefined
                      ? autherrormsg
                      : "Please Enter a Correct Username and Password"}
                  </Alert>
                )}
                <Card>
                  <CardTitle tag="h3" className="p-3 mb-0">
                    Login
                  </CardTitle>
                  <CardBody className="">
                    <FormGroup>
                      <AvField
                        label="Enter Username"
                        type="text"
                        errorMessage="Invalid Username"
                        validate={{
                          required: { value: true },

                          minLength: { value: 4 },
                        }}
                        id="Enter Username"
                        name="Enter Username"
                        placeholder="Enter Username"
                        onChange={(event) => {
                          setuserName(event.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <AvField
                        label="Enter Password"
                        type="password"
                        errorMessage="Invalid Password"
                        validate={{
                          required: { value: true },

                          minLength: { value: 4 },
                        }}
                        id="Enter Password"
                        name="Enter Password"
                        placeholder="Enter Password"
                        onChange={(event) => setpassword(event.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      {/* <Link to={"/starter"}> */}
                      <Button className="btn" color="primary" size="lg" block>
                        Login
                      </Button>

                      {/* </Link> */}
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </AvForm>
        </div>
      </main>
    </div>
  );
};

export default Authentication;
