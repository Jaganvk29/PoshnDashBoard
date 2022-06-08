import React, { useState, useEffect } from "react";

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
import { axiosJWT } from "../Auth/axiosJWT";

const CreatePartnerCategory = () => {
  const token = localStorage.getItem("tokenkey");
  const [error, setError] = useState({});
  const [PartnerCategory, setPartnerCategory] = useState("");

  const [faqPostStatus, setfaqPostStatus] = useState(false);

  const [alert, setAlert] = useState(true);

  const postCreateCategory = async () => {
    const PartnerData = {
      name: PartnerCategory,
    };

    await axiosJWT
      .post(`/admin/partner/category`, PartnerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setfaqPostStatus(response.status);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.status);
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
      <div>
        {faqPostStatus && (
          <Alert color="success">
            Partner Category Created successfully Now You Can Create Product
            Under This Created Category
          </Alert>
        )}
        {error >= 400 ? (
          <Alert color="warning">
            Some Error Occured Please Try Again Or Close The Website And Open
            Again
          </Alert>
        ) : null}
        <AvForm onSubmit={handleSubmit(postCreateCategory)}>
          <Row>
            <Col xs="12" md="8" lg="9">
              <Card>
                <CardTitle tag="h3" className="p-3 mb-0">
                  Create Category
                </CardTitle>
                <CardBody className="">
                  {" "}
                  <FormGroup>
                    <AvField
                      label="Enter Partner Category Name"
                      type="text"
                      errorMessage="Invalid Title"
                      validate={{
                        required: { value: true },

                        minLength: { value: 3 },
                      }}
                      id="ProductCate"
                      name="Enter Partner Category Name"
                      placeholder="Enter Partner Category Name"
                      onChange={(event) =>
                        setPartnerCategory(event.target.value)
                      }
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
                            postCreateCategory();
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

                      {faqPostStatus ? <Navigate to="/partners" /> : null}
                    </div>
                  </CardBody>
                </Card>
              </Row>
            </Col>
          </Row>
        </AvForm>
      </div>
    </div>
  );
};

export default CreatePartnerCategory;
