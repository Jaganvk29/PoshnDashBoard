import React from "react";
import react, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const FeedData = [
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minute ago",
  },
  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minute ago",
  },
  {
    title: "New order received.",
    icon: "bi bi-bag-check",
    color: "success",
    date: "6 minute ago",
  },
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minute ago",
  },
];

const Feeds = () => {
  const [ResponseapiData, setResponseapiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  const [selectedResponse, setSelectedResponse] = useState(false);
  const [mselectedResponse, setmSelectedResponse] = useState(false);

  const [selectedResponsedata, setSelectedResponsedata] = useState([]);

  const getConactData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/admin/contact/`, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
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
        {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
          Widget you can use
        </CardSubtitle> */}
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
                    {/* <Button
                className="rounded-circle me-3"
                size="sm"
                color={feed.color}
              >
                <i className={feed.icon}></i>
              </Button> */}
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
