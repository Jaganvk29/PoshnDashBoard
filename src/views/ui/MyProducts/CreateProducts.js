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

const CreateProducts = () => {
  const [getcatedata, setgetcatedata] = useState([]);

  const [ProductCategory, setProductCategory] = useState("");

  const [CategoryId, setCategoryId] = useState("");
  const [productName, setproductname] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productDesc, setproductDesc] = useState("");

  const [faqPostStatus, setfaqPostStatus] = useState(false);

  const [alert, setAlert] = useState(true);

  // useEffect(() => {
  //   // when the component is mounted, the alert is displayed for 3 seconds

  // }, []);

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/admin/product/category`, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        console.log(ResponseData);
        // console.log(ResponseData);
        // setApiStatus(data.status);
        // console.log(ResponseData);

        const cateData = [];
        ResponseData.forEach((element) => {
          if (!element.draft) {
            cateData.push({
              categoryid: element.id,
              title: element.name,
            });
          }
        });

        setgetcatedata(cateData);
      });
  };

  console.log(getcatedata);
  const createfaq = async () => {
    console.log(`Functio nactiveted ${ProductCategory}`);

    const ProductData = {
      category: {
        name: ProductCategory,
      },

      category_id: parseInt(CategoryId),
      name: productName,
      price: productPrice,
      description: productDesc,
    };
    console.log(ProductData);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/admin/product/`, ProductData, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
        },
      })
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
          <Alert color="success">Faq Has Created successfully</Alert>
        )}
        <AvForm onSubmit={handleSubmit(createfaq)}>
          <Row>
            <Col xs="12" md="8" lg="9">
              <Card>
                <CardTitle tag="h3" className="p-3 mb-0">
                  Add Products
                </CardTitle>
                <CardBody className="">
                  {" "}
                  <FormGroup>
                    <AvField
                      label="Enter Product Name *"
                      type="text"
                      errorMessage="Invalid Answer"
                      validate={{
                        required: { value: true },

                        minLength: { value: 3 },
                      }}
                      id="ProductName"
                      name="Enter Product Name"
                      placeholder="Enter Product Name"
                      onChange={(event) => setproductname(event.target.value)}
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <AvField
                      type="text"
                      errorMessage="Invalid Title"
                      validate={{
                        required: { value: true },

                        minLength: { value: 3 },
                      }}
                      id="ProductCate"
                      name="Enter Product Category Name"
                      placeholder="Enter Product Category Name"
                    />
                  </FormGroup> */}
                  <AvField
                    type="select"
                    name="prodcat"
                    label="Select Product Category Name"
                    onChange={(event) => setProductCategory(event.target.value)}
                    validate={{
                      required: { value: true },
                    }}
                  >
                    <option>Selct Cateogry Name</option>
                    {getcatedata.map((cate, index) => (
                      <option value={cate.title} key={index}>
                        {cate.title}
                      </option>
                    ))}
                  </AvField>
                  <AvField
                    type="select"
                    name="prodcatid"
                    label="Enter Category Id *"
                    onChange={(event) => setCategoryId(event.target.value)}
                    validate={{
                      required: { value: true },
                    }}
                  >
                    <option>Selct Cateogry Id</option>
                    {getcatedata.map((cate, index) => (
                      <option
                        value={cate.categoryid}
                        key={index}
                      >{`${cate.categoryid} - ${cate.title}`}</option>
                    ))}
                  </AvField>
                  {/* <FormGroup>
                    <AvField
                      type="number"
                      errorMessage="Enter Only Numeric Characters"
                      validate={{
                        required: { value: true },

                        minLength: { value: 1 },
                      }}
                      id="CateId"
                      name="Enter Category Id"
                      placeholder="Enter Category Id"
                    />
                  </FormGroup> */}
                  <FormGroup>
                    <AvField
                      label="Enter Price *"
                      type="text"
                      errorMessage="Invalid Answer"
                      validate={{
                        required: { value: true },

                        minLength: { value: 1 },
                      }}
                      id="ProductPrice"
                      name="Enter Price"
                      placeholder="Enter Price"
                      onChange={(event) => setproductPrice(event.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      label="Enter Product Description *"
                      type="textarea"
                      errorMessage="Invalid Answer"
                      validate={{
                        required: { value: true },

                        minLength: { value: 10 },
                      }}
                      id="ProductDesc"
                      name="Enter Product Description"
                      placeholder="Enter Product Description"
                      onChange={(event) => setproductDesc(event.target.value)}
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

export default CreateProducts;
