import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import Blog from "../../components/dashboard/Blog";

import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../layouts/loader/Loader";
import { axiosJWT } from "./Auth/axiosJWT";
import LoginTImeOut from "../../components/LoginTImeOut";

const MyProducts = () => {
  const token = localStorage.getItem("tokenkey");

  const [ProductapiData, setMyproductsApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();
  const [isrefreshtoken, setrefreshtoken] = useState(false);

  const getMyproductData = async () => {
    await axiosJWT
      .get(`/admin/product/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        setApiStatus(data.status);

        const Myproductarr = [];
        ResponseData.forEach((element) => {
          if (!element.draft) {
            Myproductarr.push({
              id: element.id,
              category: element.category,

              title: element.name,
              price: element.price,
              description: element.description,
              image: element.image,
            });
          }
        });

        setMyproductsApiData(Myproductarr);
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
    getMyproductData();
  }, []);

  return (
    <div>
      {isrefreshtoken ? (
        <LoginTImeOut />
      ) : (
        <div>
          <Col xs="12" md="6" lg="12">
            {/* --------------------------------------------------------------------------------*/}
            {/* Card-3*/}
            {/* --------------------------------------------------------------------------------*/}
            <Card>
              <CardTitle tag="h6" className="p-3 mb-0">
                Create Products
              </CardTitle>
              <CardBody className="">
                <div className="button-group">
                  <Link to="/createproducts">
                    <Button
                      className="btn-hover btn "
                      style={{ backgroundColor: "#324398" }}
                      // color="primary"
                      size="lg"
                    >
                      Create
                    </Button>
                  </Link>

                  <Link to={"/createcategory"}>
                    <Button
                      className="btn btn-hover"
                      color="secondary"
                      size="lg"
                    >
                      Create Category
                    </Button>
                  </Link>

                  <Link to={"/editecategory"}>
                    <Button
                      className="btn btn-hover"
                      color="secondary"
                      size="lg"
                    >
                      Edit Category
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
              <h5 className="mb-3">Products</h5>
              {ProductapiData.map((blg, index) => (
                <Col sm="6" lg="6" xl="3" key={blg.id}>
                  <Blog
                    image={blg.image}
                    title={blg.title}
                    // subtitle={blg.subtitle}
                    // text={blg.description}
                    color={"primary"}
                    link={`/myproducts/${blg.id}`}
                    badgecol="success"
                    badge={blg.category.name}
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

export default MyProducts;
