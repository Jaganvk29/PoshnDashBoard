import React, { useState, useEffect } from "react";

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

const CreateCategory = () => {
  const [ProductCategory, setProductCategory] = useState("");

  const [faqPostStatus, setfaqPostStatus] = useState(false);

  const [alert, setAlert] = useState(true);

  // useEffect(() => {
  //   // when the component is mounted, the alert is displayed for 3 seconds

  // }, []);

  const postCreateCategory = async () => {
    const ProductData = {
      name: ProductCategory,
    };

    console.log(ProductData);

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/admin/product/category`,
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
                  Create Category
                </CardTitle>
                <CardBody className="">
                  {" "}
                  <FormGroup>
                    <AvField
                      label="Enter Product Category Name"
                      type="text"
                      errorMessage="Invalid Title"
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
                          Publish
                        </Button>
                      </FormGroup>

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

export default CreateCategory;
