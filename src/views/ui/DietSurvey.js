import react, { useState, useEffect } from "react";

import selectimg from "../../assets/images/select.jpg";
import { axiosJWT } from "./Auth/axiosJWT";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import user1 from "../../assets/images/users/user.png";
import close from "../../assets/images/close.png";

import axios from "axios";
import Loader from "../../layouts/loader/Loader";

import LoginTImeOut from "../../components/LoginTImeOut";

const DietSurvey = () => {
  const token = localStorage.getItem("tokenkey");

  const [ResponseapiData, setResponseapiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  const [selectedResponse, setSelectedResponse] = useState(false);
  const [mselectedResponse, setmSelectedResponse] = useState(false);

  const [selectedResponsedata, setSelectedResponsedata] = useState({});
  const [surveyResponsestate, setsurveyResponsestate] = useState();

  const [isrefreshtoken, setrefreshtoken] = useState(false);

  const [currrentSelection, setcurrrentSelection] = useState();

  const { surveyResponse } = selectedResponsedata;

  const getConactData = async () => {
    await axiosJWT
      .get(`/admin/dietsurvey/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        setApiStatus(data.status);

        const contactData = [];
        const surveyResponseData = [];
        ResponseData.forEach((element) => {
          contactData.push({
            fullname: element.full_name,
            email: element.email,
            phone: element.phone,

            id: element.id,
            surveyResponse: element.response,
          });
        });

        const { surveyResponse } = contactData;

        setResponseapiData(contactData.reverse());
      })
      .catch((error) => {
        refreshToken();
      });
  };
  // console.log(ResponseapiData[15].surveyResponse);

  const refreshToken = async () => {
    const token = localStorage.getItem("tokenkey");
    const refreshtokencode = localStorage.getItem("refresh");

    try {
      const res = await axios.post("/admin/login/refresh", {
        refresh: refreshtokencode,
      });

      return res.data.access;
    } catch (err) {
      // tokenhandler(err);

      if (err.response.status === 401) {
        setrefreshtoken(true);
      }

      // return err;
    }
  };

  useEffect(() => {
    getConactData();
  }, []);

  return (
    <div>
      <Row className="desktop-respones-container">
        <h5 className="mb-3">Diet Survey</h5>

        {/* <Col lg="12">
        <ProjectTables />
      </Col> */}
        {isrefreshtoken ? (
          <LoginTImeOut />
        ) : apiStatus === 200 ? (
          <Row xs="12" md="6" lg="12">
            <Col xs="12" md="12" lg="4">
              <Card className="card-scroll">
                <div className="card-scroll-container">
                  {ResponseapiData.map((data) => (
                    <div
                      key={data.id}
                      onClick={() => {
                        setSelectedResponsedata(data);
                        setSelectedResponse(true);
                        setcurrrentSelection(data.id);
                      }}
                      className={`${
                        currrentSelection === data.id
                          ? "d-flex align-items-center  border-bottom  ResponseCardactive   p-3"
                          : "d-flex align-items-center  border-bottom  ResponseCard   p-3"
                      } `}
                    >
                      <img
                        src={user1}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{data.fullname}</h6>
                        <span>{data.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* DETAILS */}

            <Col className="" xs="12" md="7" lg="8">
              {/* <ResponseDetail /> */}

              <Card className="card-scroll">
                {selectedResponse ? (
                  <div>
                    {" "}
                    <div className="border-bottom p-3">
                      <div className="d-flex align-items-center  p-2">
                        <img
                          src={user1}
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">
                            {selectedResponsedata.fullname}
                          </h6>
                          <span className="text-muted">
                            {selectedResponsedata.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      {surveyResponse.map((survey, index) => (
                        <div className="survey-cards" key={index}>
                          <Card
                            body
                            className="border-bottom"
                            style={{ backgroundColor: "#324398" }}
                            inverse
                          >
                            <CardTitle className="border-bottom pb-4" tag="h5">
                              <div>
                                <h5>{survey.question.question_text}</h5>
                              </div>
                            </CardTitle>
                            <CardBody tag="h5">
                              <ul>
                                {/* <h6>{survey.answers} </h6> */}
                                {survey.answers.map((answer) => (
                                  <li>
                                    <h6>{answer.choice_text}</h6>
                                  </li>
                                ))}
                              </ul>
                              {survey.custom_answer != undefined &&
                                survey.custom_answer != null && (
                                  <div>
                                    <ol>
                                      {" "}
                                      <li>
                                        <h6>{survey.custom_answer}</h6>
                                      </li>
                                    </ol>
                                  </div>
                                )}
                            </CardBody>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="selectimg-container">
                    <CardImg className="selectimg" src={selectimg} />

                    <h5>Select To See Details</h5>
                  </div>
                )}
              </Card>
              {/* <Card className="card-scroll"> */}
              {/* <Outlet /> */}
              {/* </Card> */}
            </Col>
          </Row>
        ) : (
          <Loader />
        )}
      </Row>

      {/* MOBILE RESPONSES */}
      <Card className="m-responses-detail">
        <CardBody>
          <div className="card-scroll-container">
            {mselectedResponse && (
              <div>
                {" "}
                <div className="d-flex justify-content-between">
                  <CardTitle tag="h5">Reponses</CardTitle>
                  <Button
                    onClick={() => {
                      setmSelectedResponse(false);
                    }}
                    color="transparent"
                  >
                    <img src={close} />
                  </Button>
                </div>
                <div>
                  {" "}
                  <div className="border-bottom p-3">
                    <div className="d-flex align-items-center  p-2">
                      <img
                        src={user1}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">
                          {selectedResponsedata.fullname}
                        </h6>
                        <span className="text-muted">
                          {selectedResponsedata.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    {surveyResponse.map((survey, index) => (
                      <div className="survey-cards" key={index}>
                        <Card
                          body
                          className="border-bottom"
                          style={{ backgroundColor: "#324398" }}
                          inverse
                        >
                          <CardTitle className="border-bottom pb-2" tag="h5">
                            <div>
                              <h5>{survey.question.question_text}</h5>
                            </div>
                          </CardTitle>
                          <CardBody tag="h5">
                            <ul>
                              {/* <h6>{survey.answers} </h6> */}
                              {survey.answers.map((answer) => (
                                <li>
                                  <h6>{answer.choice_text}</h6>
                                </li>
                              ))}

                              {survey.custom_answer != undefined &&
                                survey.custom_answer != null && (
                                  <div>
                                    <h6>{survey.custom_answer}</h6>
                                  </div>
                                )}
                            </ul>
                          </CardBody>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!mselectedResponse && (
              <div>
                <CardTitle tag="h5">Reponses</CardTitle>
                {ResponseapiData.map((data) => (
                  <div
                    key={data.id}
                    onClick={() => {
                      setSelectedResponsedata(data);
                      setmSelectedResponse(true);
                    }}
                    className="d-flex align-items-center ResponseCard   pt-3"
                  >
                    <img
                      src={user1}
                      className="rounded-circle"
                      alt="avatar"
                      width="32"
                      height="32"
                    />
                    <div className="ms-3">
                      <h6 className="mb-0">{data.fullname}</h6>
                      <h6>{data.email}</h6>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DietSurvey;

{
  /* <table className="table table-borderless">
<tbody>
  <tr>
    <td width="150">
      {" "}
      <h6>Full name</h6>
    </td>
    <td>
      {" "}
      <h6>: {selectedResponsedata.fullname}</h6>
    </td>
  </tr>
  <tr>
    <td width="150">
      {" "}
      <h6>Date</h6>
    </td>
    <td>
      {" "}
      <h6>: {selectedResponsedata.date}</h6>
    </td>
  </tr>
  <tr>
    <td width="150">
      {" "}
      <h6>Mobile Number</h6>
    </td>
    <td>
      {" "}
      <h6>: {selectedResponsedata.phone}</h6>
    </td>
  </tr>
  <tr>
    <td width="150">
      {" "}
      <h6>Email</h6>
    </td>
    <td>
      {" "}
      <h6>: {selectedResponsedata.email}</h6>
    </td>
  </tr>
  <tr>
    <td width="150">
      {" "}
      <h6>Message</h6>
    </td>
    <td>
      {" "}
      <h6>: {selectedResponsedata.message} </h6>
    </td>
  </tr>
  <tr>
    <td width="150">
      {" "}
      <h6>Consultation Type</h6>
    </td>
    <td>
      {" "}
      <h6>: {selectedResponsedata.type} </h6>
    </td>
  </tr>
</tbody>
</table> */
}
