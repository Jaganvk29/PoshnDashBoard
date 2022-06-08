import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const EditPartnerCategory = () => {
  const token = localStorage.getItem("tokenkey");
  const [error, setError] = useState({});
  const params = useParams();
  const catId = params.pcatId;
  const [ProductCategory, setProductCategory] = useState("");

  const [faqPostStatus, setfaqPostStatus] = useState(false);

  const [alert, setAlert] = useState(true);

  // DELETE
  const [showdeletebtn, setshowdeletebtn] = useState(false);
  const [isDeleted, setisDeleted] = useState([]);

  useEffect(() => {
    getMyproductData();
  }, []);

  // DELETE BTN CONFIRM  HANDLER
  const deletebtnhandler = () => {
    setshowdeletebtn(!showdeletebtn);
  };

  const getMyproductData = async () => {
    await axiosJWT
      .get(`/admin/partner/category/${catId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        console.log(ResponseData);
        setProductCategory(ResponseData.name);
      });
  };

  const postCreateCategory = async () => {
    const ProductData = {
      name: ProductCategory,
    };

    await axiosJWT
      .patch(`/admin/partner/category/${catId}/`, ProductData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
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

  // DELETE POST
  const BlogDeleteHandler = () => {
    axiosJWT
      .delete(
        `/admin/partner/category/${catId}/`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setisDeleted(response.status);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.status);
      });
  };

  return (
    <div>
      <div>
        {faqPostStatus && (
          <Alert color="success">Partner Category Edited successfully</Alert>
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
                  Edit Category
                </CardTitle>
                <CardBody className="">
                  {" "}
                  <FormGroup>
                    <AvField
                      label="Enter Partner Category Name"
                      type="text"
                      errorMessage="Invalid Title"
                      value={ProductCategory}
                      validate={{
                        required: { value: true },

                        minLength: { value: 3 },
                      }}
                      id="PartnerCate"
                      name="Enter Partner Category Name"
                      placeholder="Enter Partner Category Name"
                      onChange={(event) =>
                        setProductCategory(event.target.value)
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
                          Update
                        </Button>
                        {!showdeletebtn && (
                          <Button
                            onClick={() => {
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
                                BlogDeleteHandler();
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
                              className="btn btn-hover"
                              style={{ backgroundColor: "#324398" }}
                              color="primary"
                              size="lg"
                              block
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </FormGroup>
                      {isDeleted === 204 ? <Navigate to="/partners" /> : null}
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

export default EditPartnerCategory;
