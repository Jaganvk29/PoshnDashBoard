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
import axios from "axios";
import Loader from "../../../layouts/loader/Loader";
import Blog from "../../../components/dashboard/Blog";
const EditCategoryHome = () => {
  const [ProductapiData, setMyproductsApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  const getMyproductData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/admin/product/category`, {
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

              title: element.name,
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
      <h5>EDIT cagtegory</h5>
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
                link={`/editecategory/${blg.id}`}
                badgecol="success"
                // badge={blg.category.name}
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

export default EditCategoryHome;
