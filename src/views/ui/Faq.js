import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col,
} from "reactstrap";

import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../layouts/loader/Loader";
import { axiosJWT } from "./Auth/axiosJWT";
import LoginTImeOut from "../../components/LoginTImeOut";
// import { Alert } from "bootstrap";

const Faq = () => {
  const token = localStorage.getItem("tokenkey");

  const [faqapiData, setFaqApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();
  const [isrefreshtoken, setrefreshtoken] = useState(false);

  const getFaqData = async () => {
    axiosJWT
      .get(`/admin/faq/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        setApiStatus(data.status);

        const faqData = [];
        ResponseData.forEach((element) => {
          faqData.push({
            question: element.question,
            answer: element.answer,
            slug: element.slug,
            id: element.id,
          });
        });

        setFaqApiData(faqData);
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
    getFaqData();
  }, []);
  return (
    <div>
      {isrefreshtoken ? (
        <LoginTImeOut />
      ) : (
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
                    <Button
                      className="btn btn-hover"
                      style={{ backgroundColor: "#324398" }}
                      color="primary"
                      size="lg"
                    >
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
                          <Button
                            className="btn btn-hover"
                            style={{ backgroundColor: "#324398" }}
                            color="primary"
                          >
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
      )}
    </div>
  );
};

export default Faq;
