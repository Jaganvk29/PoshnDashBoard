import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";
import Loader from "../../../layouts/loader/Loader";
import Blog from "../../../components/dashboard/Blog";
import { axiosJWT } from "../Auth/axiosJWT";
const EditCategoryHome = () => {
  const token = localStorage.getItem("tokenkey");

  const [ProductapiData, setMyproductsApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  const getMyproductData = async () => {
    await axiosJWT
      .get(`/admin/product/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    getMyproductData();
  }, []);

  return (
    <div>
      <h5>EDIT cagtegory</h5>
      {apiStatus === 200 ? (
        <Row>
          <div className="mt-5"></div>
          {ProductapiData.map((blg, index) => (
            <Col sm="6" lg="6" xl="3" key={blg.id}>
              <Blog
                title={blg.title}
                color={"primary"}
                link={`/editecategory/${blg.id}`}
                badgecol="success"
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
