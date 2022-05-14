import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../../layouts/loader/Loader";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardGroup,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
} from "reactstrap";

import {
  AvForm,
  AvField,
  AvValidator,
  AvGroup,
} from "availity-reactstrap-validation";
import { useForm } from "react-hook-form";
const EditFaq = () => {
  const Params = useParams();

  const FaqId = Params.id;

  const [showdeletebtn, setshowdeletebtn] = useState(false);
  const [isDeleted, setisDeleted] = useState([]);

  const [isPosted, setisPosted] = useState([]);

  const [faqQuestion, setfaqQuestion] = useState("");

  const [faqanswer, setFaqAnswer] = useState("");

  const [faqapiData, setFaqApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  // const Editfaq = async () => {
  //   const faqData = { question: faqQuestion, answer: faqanswer };
  //   console.log(faqData);

  //   await axios
  //     .post(`${process.env.REACT_APP_API_URL}/admin/faq/`, faqData, {
  //       headers: {
  //         Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
  //       },
  //     })
  //     .then((response) => {
  //       setfaqPostStatus(response.status);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // EDITING PATCH REQUEST

  const editFormHandler = () => {
    const faqEditedData = {
      answer: faqanswer,
      question: faqQuestion,
    };

    console.log(faqEditedData);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/admin/faq/${FaqId}/`,
        faqEditedData,

        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setisPosted(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const getFaqData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/admin/faq/${FaqId}`, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        setApiStatus(data.status);
        // setFaqApiData(ResponseData);
        setFaqAnswer(ResponseData.answer);
        setfaqQuestion(ResponseData.question);

        // setFaqApiData(faqData);
      });
  };

  useEffect(() => {
    getFaqData();
  }, []);

  // DELETE BTN CONFIRM  HANDLER
  const deletebtnhandler = () => {
    setshowdeletebtn(!showdeletebtn);
  };

  // DELETE POST
  const faqDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/admin/faq/${FaqId}/`,

        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setisDeleted(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* {faqPostStatus && (
        <Alert color="success">Faq Has Created successfully</Alert>
      )} */}
      <AvForm onSubmit={handleSubmit(editFormHandler)}>
        {apiStatus === 200 ? (
          <Row>
            <Col xs="12" md="8" lg="9">
              <Card>
                <CardTitle tag="h3" className="p-3 mb-0">
                  Edit Faq
                </CardTitle>
                <CardBody className="">
                  {" "}
                  <FormGroup>
                    <AvField
                      label="Enter Your Faq Question"
                      type="text"
                      errorMessage="Invalid Title"
                      validate={{
                        required: { value: true },

                        minLength: { value: 6 },
                      }}
                      id="FaqQuestion"
                      name="Enter Faq Question"
                      placeholder="Enter Faq Question"
                      value={faqQuestion}
                      onChange={(event) => setfaqQuestion(event.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      label="Enter Your Faq Answer"
                      type="textarea"
                      errorMessage="Invalid Title"
                      validate={{
                        required: { value: true },

                        minLength: { value: 6 },
                      }}
                      name="Enter Faq Answer"
                      onChange={(event) => setFaqAnswer(event.target.value)}
                      id="FaqAnswer"
                      placeholder="Enter Faq Answer"
                      value={faqanswer}
                    />
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" md="4" lg="3">
              {/* ACTIONS SAVE , DRAFT */}
              <Row>
                <Card>
                  <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    Actions
                  </CardTitle>
                  <CardBody className="">
                    <div className="button-group">
                      <FormGroup>
                        <Button
                          onClick={() => {
                            console.log(faqapiData);
                            editFormHandler();
                          }}
                          className="btn"
                          color="primary"
                          size="lg"
                          block
                        >
                          Update
                        </Button>

                        {!showdeletebtn && (
                          <Button
                            onClick={() => {
                              console.log(faqapiData);
                              deletebtnhandler();
                            }}
                            className="btn"
                            color="warning"
                            size="lg"
                            block
                          >
                            Delete
                          </Button>
                        )}

                        {showdeletebtn && (
                          <div className="mt-5">
                            <h5> Are You Sure To Delete</h5>
                            <Button
                              onClick={() => {
                                faqDelete();
                              }}
                              className="btn"
                              color="danger"
                              size="lg"
                              block
                            >
                              Delete
                            </Button>

                            <Button
                              onClick={() => {
                                deletebtnhandler();
                              }}
                              className="btn"
                              color="primary"
                              size="lg"
                              block
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </FormGroup>
                    </div>
                  </CardBody>
                </Card>
              </Row>
            </Col>
          </Row>
        ) : (
          <Loader />
        )}
        {isPosted.status === 200 ? <Navigate to="/faq" /> : null}

        {isDeleted === 204 ? <Navigate to="/faq" /> : null}
      </AvForm>
    </div>
  );
};

export default EditFaq;
