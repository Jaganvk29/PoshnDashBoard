import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Loader from "../../../layouts/loader/Loader";
import imgplace from "../../../assets/images/imgplace.jpg";

import { AvForm, AvField } from "availity-reactstrap-validation";
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
import { Navigate, useParams } from "react-router-dom";
import { axiosJWT } from "../Auth/axiosJWT";
import { useForm } from "react-hook-form";

const EditPartner = () => {
  const [error, setError] = useState({});

  const { register, handleSubmit, watch } = useForm();
  const token = localStorage.getItem("tokenkey");

  const [partnerName, setpartnername] = useState("");
  const [partnerEmail, setpartneremail] = useState("");
  const [partnerPhone, setpartnerphone] = useState("");
  const [partnerLocation, setpartnerlocation] = useState("");
  const [partnerDesc, setpartnerDesc] = useState("");
  const [isrefreshtoken, setrefreshtoken] = useState(false);
  const [partnerPostStatus, setPartnerPostStatus] = useState(false);
  const [PartnerCategory, setPartnerCategory] = useState("");
  const [getcatedata, setgetcatedata] = useState([]);

  const [apiStatus, setApiStatus] = useState();
  const params = useParams();
  const partnerId = params.partnerID;

  // IMAGE STATE

  const [alert, setAlert] = useState(true);

  const [blogimage, setblogimage] = useState();
  const [blogimageedit, setblogimageedit] = useState();
  const [uploadNewImage, setUploadNewImage] = useState(false);

  const [profileimg1, setprofileimg1] = useState(imgplace);
  const [imagesize, setimagesize] = useState(false);
  const [blogthumb, setblogthumb] = useState();

  // DELETE HANDLER STATE
  const [isDeleted, setisDeleted] = useState([]);
  const [showdeletebtn, setshowdeletebtn] = useState(false);

  const uploadNewImageHandler = () => {
    setUploadNewImage(!uploadNewImage);
  };
  const getPartnerData = async () => {
    await axiosJWT
      .get(`/admin/partner/${partnerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;

        console.log(ResponseData);
        setApiStatus(data.status);
        setPartnerCategory(ResponseData.category.name);
        setblogimage(ResponseData.image);
        setpartnername(ResponseData.full_name);
        setpartneremail(ResponseData.email);
        setpartnerphone(ResponseData.phone);
        setpartnerlocation(ResponseData.location);
        setpartnerDesc(ResponseData.description);
      })
      .catch((error) => {
        console.log(error);
        let currentDate = new Date();
        const refreshtokencode = localStorage.getItem("refresh");

        const decodedToken = jwt_decode(refreshtokencode);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          setrefreshtoken(true);
        }
      });
  };

  useEffect(() => {
    getcategory();
  }, []);

  useEffect(() => {
    getPartnerData();
  }, []);
  const getcategory = async () => {
    await axiosJWT
      .get(`/admin/partner/category`, {
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

  // DELETE BTN CONFIRM  HANDLER
  const deletebtnhandler = () => {
    setshowdeletebtn(!showdeletebtn);
  };

  // DELETE PARTNER
  const faqDelete = () => {
    axiosJWT
      .delete(
        `/admin/partner/${partnerId}/`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        setisDeleted(response.status);
      })
      .catch((error) => {
        setError(error.response.status);
        console.log(error);
      });
  };
  console.log(PartnerCategory);

  function handleStatusmsg() {
    if (partnerPostStatus === 201) {
      setPartnerPostStatus(true);
    }

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  const createPartner = async () => {
    const PartnerData = new FormData();

    // const postData = {
    //   category: {
    //     name: PartnerCategory,
    //   },
    //   full_name: partnerName,
    //   email: partnerEmail,
    //   phone: partnerPhone,
    //   location: partnerLocation,
    //   description: partnerDesc,
    //   image: blogthumb.target.files[0],
    // };

    console.log(partnerName);

    if (blogthumb != undefined) {
      console.log(blogthumb.target.files[0]);

      PartnerData.append("image", blogthumb.target.files[0]);
    }

    PartnerData.append("category.name", PartnerCategory);
    PartnerData.append("full_name", partnerName);
    PartnerData.append("email", partnerEmail);
    PartnerData.append("phone", partnerPhone);
    PartnerData.append("location", partnerLocation);
    PartnerData.append("description", partnerDesc);

    await axiosJWT
      .patch(`/admin/partner/${partnerId}/`, PartnerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPartnerPostStatus(response.status);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.status);
      });
  };
  return (
    <div>
      <div>
        {partnerPostStatus === 200 && (
          <Alert color="success">Partner Edited successfully</Alert>
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

        <AvForm onSubmit={handleSubmit(createPartner)}>
          <Row>
            <Col xs="12" md="8" lg="9">
              <Card>
                <CardTitle tag="h3" className="p-3 mb-0">
                  Add Partner
                </CardTitle>
                <CardBody className="">
                  {" "}
                  <FormGroup>
                    <AvField
                      label="Enter Partner Name *"
                      type="text"
                      errorMessage="Invalid Name"
                      value={partnerName}
                      validate={{
                        required: { value: true },

                        minLength: { value: 3 },
                      }}
                      id="PartnerName"
                      name="Enter Partner Name "
                      placeholder="Enter Partner Name "
                      onChange={(event) => setpartnername(event.target.value)}
                    />
                  </FormGroup>
                  <AvField
                    type="select"
                    name="Partner"
                    value={PartnerCategory}
                    label="Select Partner Category Name"
                    onChange={(event) => setPartnerCategory(event.target.value)}
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
                      label="Enter Partner Email *"
                      type="email"
                      errorMessage="Invalid Email"
                      value={partnerEmail}
                      validate={{
                        required: { value: true },

                        minLength: { value: 3 },
                      }}
                      id="PartnerEmail"
                      name="Enter Partner Email"
                      placeholder="Enter Partner Email"
                      onChange={(event) => setpartneremail(event.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      label="Enter Partner Contact Number *"
                      type="text"
                      value={partnerPhone}
                      errorMessage="Invalid Number"
                      validate={{
                        required: { value: true },

                        minLength: { value: 8 },
                      }}
                      id="PartnerNumber"
                      name="Enter Partner Contact Number"
                      placeholder="Enter Partner Contact Number"
                      onChange={(event) => setpartnerphone(event.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      label="Enter Partner Address *"
                      type="text"
                      value={partnerLocation}
                      errorMessage="Invalid Address"
                      validate={{
                        required: { value: true },

                        minLength: { value: 5 },
                      }}
                      id="PartnerAddress"
                      name="Enter Partner Address"
                      placeholder="Enter Partner Address"
                      onChange={(event) =>
                        setpartnerlocation(event.target.value)
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      label="Enter Partner Description *"
                      type="textarea"
                      value={partnerDesc}
                      errorMessage="Invalid Description"
                      validate={{
                        required: { value: true },

                        minLength: { value: 10 },
                      }}
                      id="PartnerDesc"
                      name="Enter Partner Description"
                      placeholder="Enter Partner Description"
                      onChange={(event) => setpartnerDesc(event.target.value)}
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
                            createPartner();
                          }}
                          className="btn btn-hover"
                          style={{ backgroundColor: "#324398" }}
                          color="primary"
                          size="lg"
                          block
                        >
                          Edit Partner
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

                      {partnerPostStatus ? <Navigate to="/partners" /> : null}
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
                            <h5>Update ThumbNail </h5>
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
                              className="labelbtn mt-3 btn-hover"
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
        {isDeleted === 204 ? <Navigate to="/partners" /> : null}
      </div>
    </div>
  );
};

export default EditPartner;
