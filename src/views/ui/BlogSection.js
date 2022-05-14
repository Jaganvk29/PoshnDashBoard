import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import Blog from "../../components/dashboard/Blog";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../layouts/loader/Loader";
const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const BlogSection = () => {
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
      });
  };
  console.log(BlogapiData);

  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <div>
      <Col xs="12" md="6" lg="12">
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-3*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="p-3 mb-0">
            Create Posts
          </CardTitle>
          <CardBody className="">
            <div className="button-group">
              <Link to="/createblog">
                <Button className="btn" color="primary" size="lg">
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
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}

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
  );
};

export default BlogSection;
