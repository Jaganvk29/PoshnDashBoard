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

const MyProducts = () => {
  const [ProductapiData, setMyproductsApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  const getMyproductData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/admin/product/`, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        setApiStatus(data.status);
        // console.log(ResponseData);

        const Myproductarr = [];
        ResponseData.forEach((element) => {
          if (!element.draft) {
            Myproductarr.push({
              id: element.id,
              category: element.category,
              categoryid: element.category_id,
              title: element.name,
              price: element.price,
              description: element.description,
            });
          }
        });

        setMyproductsApiData(Myproductarr);
      });
  };
  console.log(ProductapiData);

  useEffect(() => {
    getMyproductData();
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
              <Link to="/createproducts">
                <Button className="btn" color="primary" size="lg">
                  Create
                </Button>
              </Link>

              <Link to={"/createcategory"}>
                <Button className="btn" color="secondary" size="lg">
                  Create Category
                </Button>
              </Link>

              <Link to={"/editecategory"}>
                <Button className="btn" color="secondary" size="lg">
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
          <h5 className="mb-3">Blog</h5>
          {ProductapiData.map((blg, index) => (
            <Col sm="6" lg="6" xl="3" key={blg.id}>
              <Blog
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
  );
};

export default MyProducts;
