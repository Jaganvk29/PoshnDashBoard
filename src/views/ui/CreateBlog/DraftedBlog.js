import React, { useState, useEffect } from "react";
import Blog from "../../../components/dashboard/Blog";
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
import axios from "axios";
import Loader from "../../../layouts/loader/Loader";

const DraftedBlog = () => {
  const [BlogapiData, setBlogApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();
  const getBlogData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/admin/blog/`, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        setApiStatus(data.status);
        // console.log(ResponseData);

        const BlogData = [];
        ResponseData.forEach((element) => {
          if (element.draft) {
            BlogData.push({
              title: element.title,
              image: element.image,
              slug: element.slug,
              id: element.id,
            });
          }
        });

        setBlogApiData(BlogData);
      });
  };

  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <div>
      <h5 className="mb-3">Drafted Blogs</h5>
      {apiStatus === 200 ? (
        <Row>
          {BlogapiData.map((blg, index) => (
            <Col sm="6" lg="6" xl="3" key={blg.id}>
              <Blog
                badgecol="secondary"
                badge="Draft"
                image={blg.image}
                title={blg.title}
                // subtitle={blg.subtitle}
                // text={blg.description}
                color={"primary"}
                link={`/editblog/${blg.slug}`}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DraftedBlog;
