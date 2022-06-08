import React, { useState, useEffect } from "react";
import { axiosJWT } from "../Auth/axiosJWT";
import imgplace from "../../../assets/images/imgplace.jpg";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import axios from "axios";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateProducts = () => {
  const token = localStorage.getItem("tokenkey");

  const [error, setError] = useState({});
  const [getcatedata, setgetcatedata] = useState([]);

  const [ProductCategory, setProductCategory] = useState("");

  const [CategoryId, setCategoryId] = useState("");
  const [productName, setproductname] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productDesc, setproductDesc] = useState("");

  const [faqPostStatus, setfaqPostStatus] = useState(false);

  const [alert, setAlert] = useState(true);

  const [profileimg1, setprofileimg1] = useState(imgplace);
  const [imagesize, setimagesize] = useState(false);
  const [blogthumb, setblogthumb] = useState();

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    await axiosJWT
      .get(`/admin/product/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;

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
      })
      .catch((error) => {
        // setError(error.response.status);
        console.log(error);
      });
  };

  const createfaq = async () => {
    const formData = new FormData();

    if (blogthumb != undefined) {
      formData.append("category.name", ProductCategory);

      formData.append("image", blogthumb.target.files[0]);
      formData.append("name", productName);
      formData.append("price", productPrice);
      formData.append("description", productDesc);
    }

    await axios
      .post(`/admin/product/`, formData, {
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

  const imageHandler1 = (e) => {
    setblogthumb(e);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setprofileimg1(reader.result);
      }
    };
    const image = [];

    if (e.target.files[0] != undefined) {
      if (e.target.files[0].size < 2102166) {
        image.push(e.target.files[0]);
        reader.readAsDataURL(image[0]);
        setimagesize(false);
      } else {
        setimagesize(true);
        setprofileimg1(imgplace);
      }
    }
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
          <Alert color="success">Product Created successfully</Alert>
        )}

        {error >= 400 ? (
          <Alert color="warning">
            Some Error Occured Please Try Again Or Close The Website And Open
            Again (Hint : Please Fill All Input Fields ...)
          </Alert>
        ) : null}
        {error === 0 ? (
          <Alert color="warning">
            Some Error Occured Please Try To Upload Image Size Below 2Mb
          </Alert>
        ) : null}
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
                  {/* <AvField
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
                  </AvField> */}
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
                          className="btn btn-hover"
                          style={{ backgroundColor: "#324398" }}
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

              <Row>
                <Card>
                  <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    ThumbNail
                  </CardTitle>
                  <CardBody className="">
                    <div className="button-group">
                      <CardImg
                        alt="Card image cap"
                        src={profileimg1}
                        height="100%"
                        width="100%"
                      />
                      {imagesize && (
                        <Alert color="warning">
                          Image Size is Large Try To Uplaod Less Than 2mb Image
                        </Alert>
                      )}

                      <FormGroup>
                        <Label
                          className="labelbtn mt-3 btn-hover"
                          style={{ backgroundColor: "#324398" }}
                          for="Addimage"
                        >
                          Add Image
                        </Label>

                        <AvField
                          id="Addimage"
                          name="image"
                          // label="ThumbNail is Required"
                          type="file"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "ThumbNail is Required",
                            },
                          }}
                          accept="image/*"
                          onChange={(e) => {
                            imageHandler1(e);
                          }}
                          data-max-size="2048"
                        />
                      </FormGroup>
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
