import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

import axios from "axios";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditCategory = () => {
  const params = useParams();
  const catId = params.catid;
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
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/admin/product/category/${catId}/`,
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
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

    console.log(ProductData);

    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/admin/product/category/${catId}/`,
        ProductData,
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then((response) => {
        setfaqPostStatus(response.status);
      })
      .catch((error) => {
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

  // DELETE POST
  const BlogDeleteHandler = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/admin/product/category/${catId}/`,

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
      <div>
        {faqPostStatus && (
          <Alert color="success">
            Product Category Created successfully Now You Can Create Product
            Under This Created Category
          </Alert>
        )}
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
                      label="Enter Product Category Name"
                      type="text"
                      errorMessage="Invalid Title"
                      value={ProductCategory}
                      validate={{
                        required: { value: true },

                        minLength: { value: 3 },
                      }}
                      id="ProductCate"
                      name="Enter Product Category Name"
                      placeholder="Enter Product Category Name"
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
                      {isDeleted === 204 ? <Navigate to="/myproducts" /> : null}
                      {faqPostStatus ? <Navigate to="/myproducts" /> : null}
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

export default EditCategory;
