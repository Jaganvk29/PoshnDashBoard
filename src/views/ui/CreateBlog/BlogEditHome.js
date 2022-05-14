import React, { useEffect, useState } from "react";
import bg1 from "../../../assets/images/bg/bg1.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  AvForm,
  AvField,
  AvValidator,
  AvGroup,
} from "availity-reactstrap-validation";
import imgplace from "../../../assets/images/imgplace.jpg";
import { useForm } from "react-hook-form";

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

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

import axios from "axios";
import Loader from "../../../layouts/loader/Loader";

const BlogEditHome = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // const onSubmit = (data) => console.log("THIS FUNCTION TRIGGD");

  console.log(watch("example")); // watch input value by passing the name of it

  // POST STATE  HANDLER
  const [isPosted, setisPosted] = useState([]);
  const [error, setError] = useState({
    blogtitle: "",
    blogcontent: "",
    blogimage: "",
  });

  // FORM DATA STATE HANDLERS TO POST

  const [blogtitle, setblogTitle] = useState("");
  const [blogcontent, setblogContent] = useState("");
  const [blogthumb, setblogthumb] = useState();
  const [loader, setLoader] = useState(false);

  const [blogdraft, setblogdraft] = useState(false);

  // IMAGE PRE LOAD
  const [profileimg1, setprofileimg1] = useState(imgplace);
  const [imagesize, setimagesize] = useState(false);

  // CHECKING FORM IS VALID

  const [isformValid, setisformValid] = useState(false);
  // ---------------

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // BROWSER HISTORY TO REDIRECT AFTER POST SUCESSFULLY

  let history = useNavigate();

  function handleClick() {}

  useEffect(() => {
    console.log(blogcontent);
  }, [editorState]);

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

  console.log(blogtitle);

  //  = console.log(data);

  const createBlog = async () => {
    const formData = new FormData();

    if (blogthumb != undefined) {
      formData.append("image", blogthumb.target.files[0]);
      formData.append("title", blogtitle);
      formData.append("content", blogcontent);
    }

    formData.append("draft", blogdraft);

    // ${process.env.REACT_APP_API_URL}
    // console.log(blogthumb.target.files[0]);
    axios
      .post(`https://girish.ml/admin/blog/`, formData, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((response) => {
        console.log(response);
        setisPosted(response);
        if (response.status === 201) {
          setTimeout(() => {
            history("/blog");
          }, 2000);
        }
      })
      .catch((error) => {
        setError(error.response.status);
        if (error.response) {
          const Errormsg = () => {};

          //do something
          console.log(error.response);
        } else if (error.request) {
          console.log("ERROR REQUEST");
          //do something else
        } else if (error.message) {
          console.log("ERROR MESSAGE");

          //do something other than the other two
        }
        console.log("FREOM HERE");
      });
  };

  console.log();
  const loaderhandler = () => {
    setLoader(true);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // let errors = this.state.errors;

    switch (name) {
      case "Blogtitle":
        if (value.length < 5) {
          setError({
            blogtitle: "Enter Atlaest 5 Character For Blog Title",
          });
        } else {
          setblogTitle(value);
          setError({ blogtitle: " " });
        }

        break;

      // case "image":
      //   if (value.length > 0) {
      //     setError({
      //       blogimage: "Image is Required",
      //     });
      //   } else {
      //     setblogthumb(event);
      //     setError({ blogtitle: " " });
      //   }

      //   break;

      // case "email":
      //   errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
      //   break;
      // case "password":
      //   errors.password =
      //     value.length < 8
      //       ? "Password must be at least 8 characters long!"
      //       : "";
      //   break;

      default:
        break;
    }
  };

  // console.log(error.response.status);
  return (
    <div>
      {isPosted.status === 201 && (
        <Alert color="success">
          Blog published successfully ... We Will Redirect You To Home Page
        </Alert>
      )}

      {error >= 400 ? (
        <Alert color="warning">
          Some Error Occured Please Try Again Or Close The Website And Open
          Again
        </Alert>
      ) : null}
      <AvForm onSubmit={handleSubmit(createBlog)}>
        <Row>
          <Col xs="12" md="8" lg="9">
            {/* --------------------------------------------------------------------------------*/}
            {/* Card-3*/}
            {/* --------------------------------------------------------------------------------*/}

            {/* TITLE */}
            <Card>
              <CardTitle tag="h6" className="p-3 mb-0">
                Blog Title
              </CardTitle>
              <CardBody className="">
                {" "}
                {/* <FormGroup> */}
                <AvField
                  name="Blogtitle"
                  label="Enter Your Blog Title"
                  type="text"
                  errorMessage="Invalid Title"
                  validate={{
                    required: { value: true },
                    minLength: { value: 6 },
                  }}
                  id="blogtitle"
                  placeholder="Enter Your Blog Title"
                  onChange={(event) => setblogTitle(event.target.value)}
                />
                {/* <label for="blogtitle">Enter Your Blog Title</label>
                <input
                  {...register("BlogTitle", { required: true, minLength: 10 })}
                /> */}
                {/* </FormGroup> */}
              </CardBody>
              {errors.BlogTitle && (
                <h1 className="form-err-text">Blog Title Is Required</h1>
              )}
            </Card>

            {/* CONTENT TEXT EDITOR */}

            {/* <FormGroup> */}
            <Card>
              <CardTitle tag="h6" className="p-3 mb-0">
                Create Posts
              </CardTitle>
              <CardBody className="">
                {/* TEXT EDITOR */}

                <div>
                  {/* <h1>React Editors</h1>
                     <h2>Start editing to see some magic happen!</h2> */}
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "2px",
                      minHeight: "600px",
                    }}
                  >
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={(newState) => {
                        setEditorState(newState);
                        setblogContent(
                          draftToHtml(
                            convertToRaw(newState.getCurrentContent())
                          )
                        );
                      }}
                    />
                  </div>

                  <label>Preview</label>
                  <div className="border p-2">
                    <p dangerouslySetInnerHTML={{ __html: blogcontent }}></p>
                  </div>
                </div>
              </CardBody>
            </Card>
            {/* </FormGroup> */}
          </Col>

          {/* RIGHT SIDE ACTIONS */}
          <Col xs="12" md="4" lg="3">
            {/* ACTIONS SAVE , DRAFT */}
            <Row>
              <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                  Actions
                </CardTitle>
                <CardBody className="">
                  <AvGroup>
                    <div className="button-group">
                      <Button
                        onClick={() => {
                          loaderhandler();
                        }}
                        className="btn"
                        size="lg"
                        block
                        type="submit"
                        color="primary"
                        disabled={imagesize}
                      >
                        Publish
                      </Button>

                      {/* <Button
                      
                        onClick={() => {
                          createBlog(false);
                          loaderhandler();
                        }}
                      ></Button> */}

                      <Button
                        disabled={imagesize}
                        className="btn"
                        outline
                        color="secondary"
                        size="lg"
                        block
                        onClick={() => {
                          createBlog();
                          setblogdraft(true);
                          handleClick();
                        }}
                      >
                        Draft
                      </Button>
                    </div>
                  </AvGroup>
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
                      <Label className="labelbtn mt-3" for="Addimage">
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
        {/* {isPosted.status === 201 ? <Navigate to="/blog" /> : null} */}
      </AvForm>
    </div>
  );
};

export default BlogEditHome;
