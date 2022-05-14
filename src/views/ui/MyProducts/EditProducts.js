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

const EditProducts = () => {
  const params = useParams();
  const prodId = params.productid;
  const [getcatedata, setgetcatedata] = useState([]);

  const [ProductCategory, setProductCategory] = useState("");

  const [CategoryId, setCategoryId] = useState("");
  const [productName, setproductname] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productDesc, setproductDesc] = useState("");

  const [faqPostStatus, setfaqPostStatus] = useState(false);

  const [alert, setAlert] = useState(true);

  // DELETE
  const [showdeletebtn, setshowdeletebtn] = useState(false);
  const [isDeleted, setisDeleted] = useState([]);

  // useEffect(() => {
  //   // when the component is mounted, the alert is displayed for 3 seconds

  // }, []);

  // DELETE BTN CONFIRM  HANDLER
  const deletebtnhandler = () => {
    setshowdeletebtn(!showdeletebtn);
  };
  useEffect(() => {
    getMyproductData();
  }, []);

  const getMyproductData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/admin/product/${prodId}/`, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        console.log(ResponseData);

        setProductCategory(ResponseData.category.name);
        setCategoryId(ResponseData.category.id);
        setproductname(ResponseData.name);
        setproductPrice(ResponseData.price);
        setproductDesc(ResponseData.description);
      });
  };

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
      .patch(
        `${process.env.REACT_APP_API_URL}/admin/product/${prodId}/`,
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
        `${process.env.REACT_APP_API_URL}/admin/product/${prodId}/`,

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
                      value={productName}
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
                    value={ProductCategory}
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
                    value={CategoryId}
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
                      value={productPrice}
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
                      value={productDesc}
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

export default EditProducts;
