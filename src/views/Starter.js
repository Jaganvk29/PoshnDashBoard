import react, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";

import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import jwt_decode from "jwt-decode";

import LoginTImeOut from "../components/LoginTImeOut";

const Starter = () => {
  const [isrefreshtoken, setrefreshtoken] = useState(false);

  const checkToken = () => {
    let currentDate = new Date();
    const refreshtokencode = localStorage.getItem("refresh");

    const decodedToken = jwt_decode(refreshtokencode);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      setrefreshtoken(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div>
      {isrefreshtoken ? (
        <LoginTImeOut />
      ) : (
        <div>
          <Row>
            <Col sm="6" lg="6" xl="7" xxl="8">
              <SalesChart />
            </Col>
            <Col sm="6" lg="6" xl="5" xxl="4">
              <Feeds />
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <ProjectTables tabletitle="Booking Details" />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Starter;
