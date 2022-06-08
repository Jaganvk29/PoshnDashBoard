import React, { useState } from "react";

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
import { AvForm, AvField } from "availity-reactstrap-validation";

import axios from "axios";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const CreateFaq = () => {
  const [error, setError] = useState({});

  const [faqQuestion, setfaqQuestion] = useState("");

  const [faqanswer, setFaqAnswer] = useState("");

  const [faqPostStatus, setfaqPostStatus] = useState(false);

  const [alert, setAlert] = useState(true);

  const createfaq = async () => {
    const token = localStorage.getItem("tokenkey");

    const faqData = { question: faqQuestion, answer: faqanswer };

    await axios
      .post(`${process.env.REACT_APP_API_URL}/admin/faq/`, faqData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setfaqPostStatus(response.status);
      })
      .catch((error) => {
        setError(error.response.status);
        console.log(error);
      });
  };

  function handleStatusmsg() {
    if (faqPostStatus === 201) {
      setfaqPostStatus(true);
    }

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div>
      {faqPostStatus && (
        <Alert color="success">Faq Has Created successfully</Alert>
      )}

      {error >= 400 ? (
        <Alert color="warning">
          Some Error Occured Please Try Again Or Close The Website And Open
          Again
        </Alert>
      ) : null}

      <AvForm onSubmit={handleSubmit(createfaq)}>
        <Row>
          <Col xs="12" md="8" lg="9">
            <Card>
              <CardTitle tag="h3" className="p-3 mb-0">
                Add Faq
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
                    onChange={(event) => setfaqQuestion(event.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <AvField
                    label="Enter Your Faq Answer"
                    type="textarea"
                    errorMessage="Invalid Answer"
                    validate={{
                      required: { value: true },

                      minLength: { value: 6 },
                    }}
                    id="FaqAnswer"
                    name="Enter Faq Answer"
                    placeholder="Enter Faq Answer"
                    onChange={(event) => setFaqAnswer(event.target.value)}
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
                          createfaq();
                          handleStatusmsg();
                        }}
                        className="btn btn-hover"
                        style={{ backgroundColor: "#324398" }}
                        color="primary"
                        size="lg"
                        block
                      >
                        Publish
                      </Button>
                    </FormGroup>

                    {faqPostStatus ? <Navigate to="/faq" /> : null}
                  </div>
                </CardBody>
              </Card>
            </Row>
          </Col>
        </Row>
      </AvForm>
    </div>
  );
};

export default CreateFaq;
