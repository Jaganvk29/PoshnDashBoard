import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../layouts/loader/Loader";
import { useForm } from "react-hook-form";
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
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { AvForm, AvField } from "availity-reactstrap-validation";
// ------------------------------------------
const BlogEdit = () => {
  const params = useParams();
  const blogid = params.blogid;
  const [blogcontent, setblogContent] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // ERROR ON POSTING
  const [error, setError] = useState({
    blogtitle: "",
    blogcontent: "",
    blogimage: "",
  });
  const [blogdraft, setblogdraft] = useState(false);
  const [contenteditoractive, setcontenteditoractive] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // POST STATE  HANDLER
  const [isPosted, setisPosted] = useState([]);

  // IMAGE PRE LOAD
  const [profileimg1, setprofileimg1] = useState(imgplace);

  const [blogtitle, setblogtitle] = useState("");
  const [blogcontentdata, setblogcontentdata] = useState("");
  const [blogimage, setblogimage] = useState();
  const [blogimageedit, setblogimageedit] = useState();

  const [showdeletebtn, setshowdeletebtn] = useState(false);
  const [isDeleted, setisDeleted] = useState([]);

  // UPLOAD NEW BLOG IMAGE

  const [uploadNewImage, setUploadNewImage] = useState(false);
  const [imagesize, setimagesize] = useState(false);

  useEffect(() => {
    console.log(blogcontent);
  }, [editorState]);

  // GET OLD POST DATA

  const getFaqData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/admin/blog/${blogid}/`, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        console.log(ResponseData);
        setisPosted(data.status);
        setblogtitle(ResponseData.title);
        setblogcontentdata(ResponseData.content);
        setblogimage(ResponseData.image);
        setblogdraft(ResponseData.draft);

        const contentBlock = htmlToDraft(ResponseData.content);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );

        const _editorState = EditorState.createWithContent(contentState);
        setEditorState(_editorState);
      });
  };

  useEffect(() => {
    getFaqData();
  }, []);

  // USED TO NAVIGATE AFTER 3S
  let history = useNavigate();

  // PATCH REQUEST

  const editBlog = async () => {
    // e.preventDefault();
    const formData = new FormData();

    if (uploadNewImage) {
      if (blogimageedit != undefined) {
        console.log(blogimageedit);
        formData.append("image", blogimageedit.target.files[0]);

        formData.append("title", blogtitle);

        if (contenteditoractive === true) {
          formData.append("content", blogcontent);
        }

        formData.append("draft", blogdraft);
      }

      formData.append("title", blogtitle);

      if (contenteditoractive === true) {
        formData.append("content", blogcontent);
      }

      formData.append("draft", blogdraft);
    } else {
      formData.append("title", blogtitle);
      if (contenteditoractive === true) {
        formData.append("content", blogcontent);
      }
      formData.append("draft", blogdraft);
    }
    formData.append("draft", blogdraft);
    console.log(blogdraft);

    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/admin/blog/${blogid}/`,
        formData,

        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setisPosted(response);
        if (response.status === 200) {
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

  // DELETE BTN CONFIRM  HANDLER
  const deletebtnhandler = () => {
    setshowdeletebtn(!showdeletebtn);
  };

  // DELETE POST
  const BlogDeleteHandler = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/admin/blog/${blogid}/`,

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

  // UPLOAD NEW IMAGE HANDLER

  const uploadNewImageHandler = () => {
    setUploadNewImage(!uploadNewImage);
  };

  return (
    <div>
      {/* {faqPostStatus && (
    <Alert color="success">Faq Has Created successfully</Alert>
  )} */}
      {isPosted.status === 200 && (
        <Alert color="success">
          Blog Post is Edited and published successfully ... We Will Redirect
          You To Main Page
        </Alert>
      )}

      {error >= 400 ? (
        <Alert color="warning">
          Some Error Occured Please Try Again Or Close The Website And Open
          Again or Upload Lower Size Image
        </Alert>
      ) : null}
      <AvForm onSubmit={handleSubmit(editBlog)}>
        <Row>
          <Col xs="12" md="8" lg="9">
            {/* TITLE */}
            <Card>
              <CardTitle tag="h6" className="p-3 mb-0">
                Blog Title
              </CardTitle>
              <CardBody className="">
                {" "}
                <FormGroup>
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
                    value={blogtitle}
                    onChange={(event) => setblogtitle(event.target.value)}
                  />

                  {/*                   
                  <Input
                    id="exampleEmail"
                    name="Enter Your Blog Title"
                    placeholder="Enter Your Blog Title"
                    type="text"
                   
                  /> */}
                </FormGroup>
              </CardBody>
            </Card>
            {/* CONTENT TEXT EDITOR */}

            <FormGroup>
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
                          setcontenteditoractive(true);
                          setEditorState(newState);
                          setblogContent(
                            draftToHtml(
                              convertToRaw(newState.getCurrentContent())
                            )
                          );
                        }}
                      />
                    </div>

                    <Label>Preview</Label>
                    <div className="border p-2">
                      <div
                        dangerouslySetInnerHTML={{ __html: blogcontent }}
                      ></div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </FormGroup>
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
                    <Button
                      type="submit"
                      className="btn"
                      color="primary"
                      size="lg"
                      block
                      onClick={() => {
                        setblogdraft(false);
                      }}
                    >
                      {blogdraft ? "Publish" : "Update"}
                    </Button>

                    <Button
                      type="submit"
                      className="btn"
                      outline
                      color="secondary"
                      size="lg"
                      block
                      onClick={() => {
                        setblogdraft(true);
                      }}
                    >
                      {blogdraft ? "Save" : "Draft"}
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
                      className="btn"
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
                          <h5>Update ThumbNail Thumbnail</h5>
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
                          <Label className="labelbtn mt-3" for="Addimage">
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

        {/* {apiStatus === 200 ? (
       
        ) : (
          <Loader />
        )} */}
        {/* {isPosted.status === 200 ? <Navigate to="/blog" /> : null} */}

        {isDeleted === 204 ? <Navigate to="/blog" /> : null}
      </AvForm>
    </div>
  );
};

export default BlogEdit;
