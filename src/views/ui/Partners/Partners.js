import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Loader from "../../../layouts/loader/Loader";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col,
} from "reactstrap";
import LoginTImeOut from "../../../components/LoginTImeOut";
import { axiosJWT } from "../Auth/axiosJWT";

const Partners = () => {
  const token = localStorage.getItem("tokenkey");

  const [isrefreshtoken, setrefreshtoken] = useState(false);

  const [apiStatus, setApiStatus] = useState();

  const [partnerapiData, setPartnerapiData] = useState([]);

  const getPartnerData = async () => {
    await axiosJWT
      .get(`/admin/partner/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        setApiStatus(data.status);

        const partnerData = [];
        ResponseData.forEach((element) => {
          partnerData.push({
            fullname: element.full_name,
            email: element.email,
            phone: element.phone,
            description: element.description,

            id: element.id,
          });
        });

        setPartnerapiData(partnerData);
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
  // console.log(ResponseapiData);

  useEffect(() => {
    getPartnerData();
  }, []);

  return (
    <div>
      <div>
        <div>
          <h5 className="mb-3">Partners</h5>

          {isrefreshtoken ? (
            <LoginTImeOut />
          ) : (
            <div>
              {" "}
              <Col xs="12" md="6" lg="12">
                <Card>
                  <CardTitle tag="h6" className="p-3 mb-0">
                    Create partner
                  </CardTitle>
                  <CardBody className="">
                    <div className="button-group">
                      <Link to="/createpartner">
                        <Button
                          className="btn btn-hover"
                          style={{ backgroundColor: "#324398" }}
                          color="primary"
                          size="lg"
                        >
                          Create
                        </Button>
                      </Link>

                      <Link to={"/createpartnercategory"}>
                        <Button className="btn" color="secondary" size="lg">
                          Create Category
                        </Button>
                      </Link>

                      <Link to={"/partnercategory"}>
                        <Button className="btn" color="secondary" size="lg">
                          Edit Category
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              {apiStatus === 200 ? (
                <Row>
                  <h5 className="mb-3">Partners List</h5>

                  {apiStatus === 200 &&
                    partnerapiData.map((data) => (
                      <Col key={data.id} md="6" lg="4">
                        <Card body className="text-center">
                          <CardTitle className="border-bottom pb-2" tag="h5">
                            {data.fullname}
                          </CardTitle>
                          <CardText className="mt-2">
                            {data.description}
                          </CardText>
                          <div>
                            <Link to={`/editpartner/${data.id}`}>
                              <Button
                                className="btn btn-hover"
                                style={{ backgroundColor: "#324398" }}
                                color="primary"
                              >
                                Edit Partner
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
      </div>
    </div>
  );
};

export default Partners;
