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
  Alert,
} from "reactstrap";
import Blog from "../../components/dashboard/Blog";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../layouts/loader/Loader";
// import { Alert } from "bootstrap";

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

const Faq = () => {
  const [faqapiData, setFaqApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  const getFaqData = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/faq/`).then((data) => {
      const ResponseData = data.data;
      setApiStatus(data.status);
      console.log(data.status);

      const faqData = [];
      ResponseData.forEach((element) => {
        faqData.push({
          question: element.question,
          answer: element.answer,
          slug: element.slug,
          id: element.id,
        });
      });
      console.log(faqData);

      setFaqApiData(faqData);
    });
  };

  useEffect(() => {
    getFaqData();
  }, []);
  return (
    <div>
      <div>
        <h5 className="mb-3">Faq</h5>

        <Col xs="12" md="6" lg="12">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
          <Card>
            <CardTitle tag="h6" className="p-3 mb-0">
              Create Faq
            </CardTitle>
            <CardBody className="">
              <div className="button-group">
                <Link to="/createfaq">
                  <Button className="btn" color="primary" size="lg">
                    Create
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
            <h5 className="mb-3">Published Faq's</h5>

            {apiStatus === 200 &&
              faqapiData.map((data) => (
                <Col key={data.id} md="6" lg="4">
                  <Card body className="text-center">
                    <CardTitle className="border-bottom pb-2" tag="h5">
                      {data.question}
                    </CardTitle>
                    <CardText className="mt-2">{data.answer}</CardText>
                    <div>
                      <Link to={`/faqedit/${data.slug}`}>
                        <Button className="btn" color="primary">
                          Edit Faq
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Faq;
