import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";
import Loader from "../../../layouts/loader/Loader";
import Blog from "../../../components/dashboard/Blog";
import { axiosJWT } from "../Auth/axiosJWT";
const PartnerCategoryHome = () => {
  const token = localStorage.getItem("tokenkey");

  const [ProductapiData, setMyproductsApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  const getMyproductData = async () => {
    await axiosJWT
      .get(`/admin/partner/category`, {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMyproductData();
  }, []);

  return (
    <div>
      <h5>Edit cagtegory</h5>
      {apiStatus === 200 ? (
        <Row>
          <div className="mt-5"></div>
          {ProductapiData.map((blg, index) => (
            <Col sm="6" lg="6" xl="3" key={blg.id}>
              <Blog
                title={blg.title}
                color={"primary"}
                link={`/editpartnercategory/${blg.id}`}
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

export default PartnerCategoryHome;
