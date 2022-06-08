import React from "react";
import react, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { Link } from "react-router-dom";

import { axiosJWT } from "../../views/ui/Auth/axiosJWT";

const Feeds = () => {
  const [ResponseapiData, setResponseapiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  const [selectedResponse, setSelectedResponse] = useState(false);
  const [mselectedResponse, setmSelectedResponse] = useState(false);

  const [selectedResponsedata, setSelectedResponsedata] = useState([]);
  const token = localStorage.getItem("tokenkey");
  const getConactData = async () => {
    await axiosJWT
      .get(`/admin/contact/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        setApiStatus(data.status);
        // console.log(ResponseData);

        const contactData = [];
        ResponseData.forEach((element) => {
          contactData.push({
            fullname: element.full_name,
            email: element.email,
            phone: element.phone,
            date: element.date,
            message: element.message,

            id: element.id,
          });
        });

        setResponseapiData(contactData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(ResponseapiData);

  useEffect(() => {
    getConactData();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Responses</CardTitle>

        <ListGroup flush className="mt-4">
          {ResponseapiData.map(
            (Response, index) =>
              index <= 6 && (
                <Link key={index} to="/responses">
                  {" "}
                  <ListGroupItem
                    action
                    className="d-flex align-items-center p-3 border-0"
                  >
                    {Response.fullname}
                    <small className="ms-auto text-muted text-small">
                      {Response.date.substr(0, 10)}
                    </small>
                  </ListGroupItem>
                </Link>
              )
          )}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
