import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import imgplace from "../../../assets/images/imgplace.jpg";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { axiosJWT } from "../Auth/axiosJWT";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditProducts = () => {
  const token = localStorage.getItem("tokenkey");
  const [error, setError] = useState({});

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

  // EDIT IMAGE
  const [profileimg1, setprofileimg1] = useState(imgplace);

  const [blogimage, setblogimage] = useState();
  const [blogimageedit, setblogimageedit] = useState();
  const [uploadNewImage, setUploadNewImage] = useState(false);
  const [imagesize, setimagesize] = useState(false);

  // DELETE BTN CONFIRM  HANDLER
  const deletebtnhandler = () => {
    setshowdeletebtn(!showdeletebtn);
  };
  useEffect(() => {
    getMyproductData();
  }, []);

  const uploadNewImageHandler = () => {
    setUploadNewImage(!uploadNewImage);
  };

  const imageHandler1 = (e) => {
    setblogimageedit(e);
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

  const getMyproductData = async () => {
    await axiosJWT
      .get(`/admin/product/${prodId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;

        setProductCategory(ResponseData.category.name);
        setblogimage(ResponseData.image);
        setproductname(ResponseData.name);
        setproductPrice(ResponseData.price);
        setproductDesc(ResponseData.description);
      });
  };

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
        setError(error.response.status);
        console.log(error);
      });
  };

  const createfaq = async () => {
    const ProductData = new FormData();
    ProductData.append("category.name", ProductCategory);
    if (blogimageedit != undefined) {
      ProductData.append("image", blogimageedit.target.files[0]);
    }

    ProductData.append("name", productName);
    ProductData.append("price", productPrice);
    ProductData.append("description", productDesc);

    await axiosJWT
      .patch(
        `/admin/product/${prodId}/`,
        ProductData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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

  // DELETE POST
  const BlogDeleteHandler = () => {
    axiosJWT
      .delete(
        `/admin/product/${prodId}/`,

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
        setError(error.response.status);
        console.log(error);
      });
  };

  return (
    <div>
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
                          className="btn btn-hover"
                          style={{ backgroundColor: "#324398" }}
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
                      {isDeleted === 204 ? <Navigate to="/myproducts" /> : null}
                      {faqPostStatus ? <Navigate to="/myproducts" /> : null}
                    </div>
                  </CardBody>
                </Card>
              </Row>

              {/* THUMBNAIL */}
              <Row>
                <Card>
                  <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    ThumbNail
                  </CardTitle>
                  <CardBody className="">
                    <div className="button-group">
                      <h5>Current Thumbnail</h5>
                      <CardImg
                        alt="Card image cap"
                        src={blogimage}
                        height="100%"
                        width="100%"
                      />
                      <Button
                        onClick={() => {
                          uploadNewImageHandler();
                        }}
                        className="btn btn-hover"
                        style={{ backgroundColor: "#324398" }}
                        color="primary"
                        size="lg"
                        block
                      >
                        Uplaod New ThumbNail
                      </Button>
                      {uploadNewImage && (
                        <div>
                          {" "}
                          <Col className=" mt-4">
                            <h5>Update ThumbNail</h5>
                            <CardImg
                              alt="Card image cap"
                              src={profileimg1}
                              height="100%"
                              width="100%"
                            />
                            {imagesize && (
                              <Alert color="warning">
                                Image Size is Large Try To Uplaod Less Than 2mb
                                Image
                              </Alert>
                            )}
                          </Col>
                          <FormGroup>
                            <Label
                              className="labelbtn btn-hover mt-3"
                              style={{ backgroundColor: "#324398" }}
                              for="Addimage"
                            >
                              Add Image
                            </Label>

                            <AvField
                              id="Addimage"
                              type="file"
                              name="file"
                              accept="image/*"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: "ThumbNail is Required",
                                },
                              }}
                              onChange={(e) => {
                                imageHandler1(e);
                              }}
                              data-max-size="2048"
                            />
                          </FormGroup>
                        </div>
                      )}
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
