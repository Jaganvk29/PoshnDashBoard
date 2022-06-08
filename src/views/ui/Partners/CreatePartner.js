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
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreatePartner = () => {
  const [isPosted, setisPosted] = useState([]);
  const [error, setError] = useState({});

  const token = localStorage.getItem("tokenkey");

  const [partnerName, setpartnername] = useState("");
  const [partnerEmail, setpartneremail] = useState("");
  const [partnerPhone, setpartnerphone] = useState("");
  const [partnerLocation, setpartnerlocation] = useState("");
  const [partnerDesc, setpartnerDesc] = useState("");
  const [PartnerCategory, setPartnerCategory] = useState("");
  const [getcatedata, setgetcatedata] = useState([]);

  const [partnerPostStatus, setPartnerPostStatus] = useState(false);

  const [alert, setAlert] = useState(true);

  const [profileimg1, setprofileimg1] = useState(imgplace);
  const [imagesize, setimagesize] = useState(false);
  const [blogthumb, setblogthumb] = useState();

  // BROWSER HISTORY TO REDIRECT AFTER POST SUCESSFULLY

  let history = useNavigate();

  useEffect(() => {
    getcategory();
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
        console.log(data.status);

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

  const createPartner = async () => {
    const formData = new FormData();

    if (blogthumb != undefined) {
      formData.append("category.name", PartnerCategory);
      formData.append("full_name", partnerName);
      formData.append("email", partnerEmail);
      formData.append("phone", partnerPhone);
      formData.append("location", partnerLocation);
      formData.append("description", partnerDesc);
      formData.append("image", blogthumb.target.files[0]);
    }

    // formData.append("category.name", ProductCategory);

    await axiosJWT
      .post(`/admin/partner/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPartnerPostStatus(response.status);
        console.log(response);
        if (response.status === 201) {
          setTimeout(() => {
            history("/partners");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.status);
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
    if (partnerPostStatus === 201) {
      setPartnerPostStatus(true);
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
        {partnerPostStatus === 201 && (
          <Alert color="success">
            Partner Added successfully ... We Will Redirect You To Home Page
          </Alert>
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
                    name="prodcat"
                    label="Select Partner Category "
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
                            handleStatusmsg();
                          }}
                          className="btn btn-hover"
                          style={{ backgroundColor: "#324398" }}
                          color="primary"
                          size="lg"
                          block
                        >
                          Add Partner
                        </Button>
                      </FormGroup>
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
                          style={{ backgroundColor: "#324398" }}
                          className=" btn-hover labelbtn mt-3"
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

export default CreatePartner;
