import React, { useState, useEffect } from "react";
import { axiosJWT } from "./Auth/axiosJWT";
import jwt_decode from "jwt-decode";

import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import Blog from "../../components/dashboard/Blog";

import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../layouts/loader/Loader";
import LoginTImeOut from "../../components/LoginTImeOut";

const BlogSection = () => {
  const token = localStorage.getItem("tokenkey");
  const [BlogapiData, setBlogApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();
  const [isrefreshtoken, setrefreshtoken] = useState(false);

  const getBlogData = async () => {
    await axiosJWT
      .get(`/admin/blog/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        setApiStatus(data.status);

        const BlogData = [];
        ResponseData.forEach((element) => {
          if (!element.draft) {
            BlogData.push({
              title: element.title,
              image: element.image,
              slug: element.slug,
              id: element.id,
            });
          }
        });

        setBlogApiData(BlogData);
      })
      .catch((error) => {
        let currentDate = new Date();
        const refreshtokencode = localStorage.getItem("refresh");

        const decodedToken = jwt_decode(refreshtokencode);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          setrefreshtoken(true);
        }
      });
  };

  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-3*/}
      {/* --------------------------------------------------------------------------------*/}
      {isrefreshtoken ? (
        <LoginTImeOut />
      ) : (
        <div>
          <Col xs="12" md="6" lg="12">
            <Card>
              <CardTitle tag="h6" className="p-3 mb-0">
                Create Posts
              </CardTitle>
              <CardBody className="">
                <div className="button-group">
                  <Link to="/createblog">
                    <Button
                      className="btn btn-hover"
                      style={{ backgroundColor: "#324398" }}
                      color="primary"
                      size="lg"
                    >
                      Create
                    </Button>
                  </Link>

                  <Link to={"/draft"}>
                    <Button className="btn" color="secondary" size="lg">
                      See Drafted
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
          {apiStatus === 200 ? (
            <Row>
              <h5 className="mb-3">Blog</h5>
              {BlogapiData.map((blg, index) => (
                <Col sm="6" lg="6" xl="3" key={blg.id}>
                  <Blog
                    image={blg.image}
                    title={blg.title}
                    // subtitle={blg.subtitle}
                    // text={blg.description}
                    color={"primary"}
                    link={`/editblog/${blg.slug}`}
                    badgecol="success"
                    badge="Published"
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Loader />
          )}
        </div>
      )}
    </div>
  );
};

export default BlogSection;
