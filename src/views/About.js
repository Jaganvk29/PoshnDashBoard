import react, { useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosJWT } from "./ui/Auth/axiosJWT";
import jwt_decode from "jwt-decode";
import {
  Card,
  Badge,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import Loader from "../layouts/loader/Loader";
import LoginTImeOut from "../components/LoginTImeOut";
const About = () => {
  const [error, setError] = useState({});

  const token = localStorage.getItem("tokenkey");

  let history = useNavigate();

  // POST STATE  HANDLER
  const [isPosted, setisPosted] = useState([]);
  const [ResponseapiData, setResponseapiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();
  // IMAGE PRE LOAD
  const [profileimg1, setprofileimg1] = useState();
  // UPLOAD NEW BLOG IMAGE PREVIEW
  const [uploadNewImage1, setUploadNewImage1] = useState(false);
  const [uploadNewImage2, setUploadNewImage2] = useState(false);
  const [uploadNewImage3, setUploadNewImage3] = useState(false);

  // UPLOD NEW BLOG IMAGE TO API
  const [uploadeditNewImage1, setUploadeditNewImage1] = useState();
  const [uploadeditNewImage2, setUploadeditNewImage2] = useState();
  const [uploadeditNewImage3, setUploadeditNewImage3] = useState();

  const [editimage1, seteditimage1] = useState();
  const [editimage2, seteditimage2] = useState();
  const [editimage3, seteditimage3] = useState();

  const [blogimageedit, setblogimageedit] = useState();

  // GET DATA STATE HANDLER

  const [abname, setAbName] = useState();
  const [abExperience, setabExperience] = useState();
  const [abprofessionalaff, setabprofessionalaff] = useState();
  const [abAbout, setabAbout] = useState();
  const [abprofessionalback, setabprofessionalback] = useState();
  const [image1, setimage1] = useState();
  const [image2, setimage2] = useState();
  const [image3, setimage3] = useState();
  const [isrefreshtoken, setrefreshtoken] = useState(false);
  // GET REQUEST FROM SERVER
  const getAboutData = async () => {
    await axiosJWT
      .get(`/admin/about`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        setApiStatus(data.status);

        const contactData = [];

        setAbName(ResponseData[0].name);
        setabExperience(ResponseData[0].experience);
        setabprofessionalaff(ResponseData[0].professional_affiliations);
        setabAbout(ResponseData[0].about);
        setabprofessionalback(ResponseData[0].professional_background);
        setimage1(ResponseData[0].image1);
        setimage2(ResponseData[0].image2);
        setimage3(ResponseData[0].image3);
      })
      .catch((error) => {
        setError(error.response.status);

        let currentDate = new Date();
        const refreshtokencode = localStorage.getItem("refresh");

        const decodedToken = jwt_decode(refreshtokencode);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          setrefreshtoken(true);
        }
      });
  };

  useEffect(() => {
    getAboutData();
  }, []);

  // PATCH REQUEST TO SERVER
  const editAbout = async () => {
    const formData = new FormData();

    if (uploadeditNewImage1 != undefined && uploadNewImage1) {
      formData.append("image1", uploadeditNewImage1.target.files[0]);
    }
    if (uploadeditNewImage2 != undefined && uploadNewImage2) {
      formData.append("image2", uploadeditNewImage2.target.files[0]);
    }
    if (uploadeditNewImage3 != undefined && uploadNewImage3) {
      formData.append("image3", uploadeditNewImage3.target.files[0]);
    }

    formData.append("name", abname);
    formData.append("about", abAbout);
    formData.append("experience", abExperience);
    formData.append("professional_background", abprofessionalback);
    formData.append("professional_affiliations", abprofessionalaff);

    axiosJWT
      .patch(
        `/admin/about/1/`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setisPosted(response);
        if (response.status === 200) {
          setTimeout(() => {
            history("/starter");
          }, 3000);
        }
      })
      .catch((error) => {
        setError(error.response.status);
        console.log(error);
      });
  };

  // IMAGE PREVIEW & UPLOAD HANDLERS
  const imageHandler1 = (e) => {
    setUploadeditNewImage1(e);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        seteditimage1(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const imageHandler2 = (e) => {
    setUploadeditNewImage2(e);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        seteditimage2(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const imageHandler3 = (e) => {
    setUploadeditNewImage3(e);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        seteditimage3(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      {isrefreshtoken ? (
        <LoginTImeOut />
      ) : apiStatus === 200 ? (
        <div>
          {isPosted.status === 200 && (
            <Alert color="success">
              About Section Updated successfully ... Wait Few seconds We Will
              Redirect You To Home Page
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
              Some Error Occured Please Try Again Or Upload Image Size Below 2Mb
              For All Images Or Upload One By One
            </Alert>
          ) : null}
          <Form>
            <Row>
              <Col xs="12" md="8" lg="9">
                {/* --------------------------------------------------------------------------------*/}
                {/* Card-1*/}
                {/* --------------------------------------------------------------------------------*/}
                <Card>
                  <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <Link to="/createabout">
                      {" "}
                      <i className="bi bi-bell me-2"> </i>
                    </Link>
                    About
                  </CardTitle>
                  <CardBody className="p-4">
                    {/* NAME */}
                    <FormGroup>
                      <Label for="ab-name">Edit Name</Label>
                      <Input
                        id="ab-name"
                        placeholder="Enter Your Name"
                        name="text"
                        value={abname}
                        type="textarea"
                        onChange={(event) => setAbName(event.target.value)}
                      />
                    </FormGroup>

                    {/* About */}

                    <FormGroup>
                      <Label for="ab-ab">Edit About</Label>
                      <Input
                        id="ab-ab"
                        placeholder="Enter Text For About Section"
                        name="text"
                        value={abAbout}
                        type="textarea"
                        onChange={(event) => setabAbout(event.target.value)}
                      />
                    </FormGroup>
                    {/* EXPERIENCE */}
                    <FormGroup>
                      <Label for="ab-exp">Edit Experience</Label>
                      <Input
                        id="ab-exp"
                        placeholder="Enter Experience"
                        name="text"
                        value={abExperience}
                        type="textarea"
                        onChange={(event) =>
                          setabExperience(event.target.value)
                        }
                      />
                    </FormGroup>
                    {/* PROFESSIONAL BACKGROUND */}
                    <FormGroup>
                      <Label for="ab-back">
                        Edit Professional Background{" "}
                        <Badge color="secondary" className="ms-3">
                          Use ~ this Symbol For Sepration
                        </Badge>
                      </Label>
                      <Input
                        id="ab-back"
                        placeholder="Enter Your Name"
                        name="text"
                        value={abprofessionalback}
                        type="textarea"
                        onChange={(event) =>
                          setabprofessionalback(event.target.value)
                        }
                      />
                    </FormGroup>

                    {/* professional_affiliations */}

                    <FormGroup>
                      <Label for="Ab-affi">
                        Edit professional affiliations{" "}
                        <Badge color="secondary" className="ms-3">
                          Use ~ this Symbol For Sepration
                        </Badge>
                      </Label>
                      <Input
                        id="Ab-affi"
                        placeholder="Enter professional affiliations"
                        name="text"
                        value={abprofessionalaff}
                        type="textarea"
                        onChange={(event) =>
                          setabprofessionalaff(event.target.value)
                        }
                      />
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" md="4" lg="3">
                <Row>
                  <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                      Actions{" "}
                    </CardTitle>

                    <CardBody>
                      <FormGroup>
                        <Button
                          onClick={editAbout}
                          className="btn"
                          color="primary"
                          size="lg"
                          block
                        >
                          Update
                        </Button>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Row>
                {/* ---------------------------------------- */}
                {/* THUMBNAIL */}
                <Row>
                  <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                      About Dispay Pictures
                    </CardTitle>
                    <CardBody className="">
                      <div className="button-group">
                        <h5>Current Top Image</h5>
                        <CardImg
                          alt="Card image cap"
                          src={image1}
                          height="100%"
                          width="100%"
                        />
                        <Button
                          onClick={() => {
                            setUploadNewImage1(!uploadNewImage1);
                          }}
                          className="btn"
                          color="primary"
                          size="lg"
                          block
                        >
                          Update Top Image
                        </Button>

                        {uploadNewImage1 && (
                          <div>
                            {" "}
                            <Col className=" mt-4">
                              <h5>Update ThumbNail Thumbnail</h5>
                              <CardImg
                                alt="Card image cap"
                                src={editimage1}
                                height="100%"
                                width="100%"
                              />
                            </Col>
                            <FormGroup>
                              <Label className="labelbtn" for="Addimage">
                                Add Image
                              </Label>

                              {/* <Button></Button> */}

                              <Input
                                id="Addimage"
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={(e) => {
                                  imageHandler1(e);
                                }}
                              />
                            </FormGroup>
                          </div>
                        )}
                      </div>
                    </CardBody>

                    {/* LEFT IMAGE */}
                    <CardBody className="">
                      <div className="button-group">
                        <h5>Current Left Image</h5>
                        <CardImg
                          alt="Card image cap"
                          src={image2}
                          height="100%"
                          width="100%"
                        />
                        <Button
                          onClick={() => {
                            setUploadNewImage2(!uploadNewImage2);
                          }}
                          className="btn"
                          color="primary"
                          size="lg"
                          block
                        >
                          Update Left Image
                        </Button>
                        {uploadNewImage2 && (
                          <div>
                            {" "}
                            <Col className=" mt-4">
                              <h5>Update ThumbNail Thumbnail</h5>
                              <CardImg
                                alt="Card image cap"
                                src={editimage2}
                                height="100%"
                                width="100%"
                              />
                            </Col>
                            <FormGroup>
                              <Label className="labelbtn" for="Addimage2">
                                Add Image
                              </Label>

                              {/* <Button></Button> */}

                              <Input
                                id="Addimage2"
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={(e) => {
                                  imageHandler2(e);
                                }}
                              />
                            </FormGroup>
                          </div>
                        )}
                      </div>
                    </CardBody>

                    {/* RIGHT IMAGE */}
                    <CardBody className="">
                      <div className="button-group">
                        <h5>Current Right Image</h5>
                        <CardImg
                          alt="Card image cap"
                          src={image3}
                          height="100%"
                          width="100%"
                        />
                        <Button
                          onClick={() => {
                            setUploadNewImage3(!uploadNewImage3);
                          }}
                          className="btn"
                          color="primary"
                          size="lg"
                          block
                        >
                          Update Right Image
                        </Button>
                        {uploadNewImage3 && (
                          <div>
                            {" "}
                            <Col className=" mt-4">
                              <h5>Update ThumbNail Thumbnail</h5>
                              <CardImg
                                alt="Card image cap"
                                src={editimage3}
                                height="100%"
                                width="100%"
                              />
                            </Col>
                            <FormGroup>
                              <Label className="labelbtn" for="Addimage3">
                                Add Image
                              </Label>

                              {/* <Button></Button> */}

                              <Input
                                id="Addimage3"
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={(e) => {
                                  imageHandler3(e);
                                }}
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
          </Form>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default About;
