import react, { useState, useEffect } from "react";
import ProjectTables from "../../components/dashboard/ProjectTable";
import selectimg from "../../assets/images/select.jpg";
import {
  Row,
  Col,
  Table,
  Card,
  CardTitle,
  CardBody,
  CardImg,
} from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";

import axios from "axios";
import Loader from "../../layouts/loader/Loader";
import { Link, Outlet } from "react-router-dom";
import ResponseDetail from "./Responses/ResponseDetail";

const Booking = () => {
  const [ResponseapiData, setResponseapiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  const [selectedResponse, setSelectedResponse] = useState(false);
  const [mselectedResponse, setmSelectedResponse] = useState(false);

  const [selectedResponsedata, setSelectedResponsedata] = useState([]);

  const getConactData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/admin/consultation/`, {
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
            type: element.consultation_type,
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
    <div>
      <Row className="desktop-respones-container">
        <h5 className="mb-3">Booking</h5>

        {/* <Col lg="12">
        <ProjectTables />
      </Col> */}

        {apiStatus === 200 ? (
          <Row xs="12" md="6" lg="12">
            <Col xs="12" md="12" lg="4">
              <Card className="card-scroll">
                <div className="card-scroll-container">
                  {ResponseapiData.map((data) => (
                    <div
                      key={data.id}
                      onClick={() => {
                        setSelectedResponsedata(data);
                        setSelectedResponse(true);
                      }}
                      className="d-flex align-items-center  border-bottom  ResponseCard   p-3"
                    >
                      <img
                        src={user1}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{data.fullname}</h6>
                        <span>{data.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* DETAILS */}

            <Col className="" xs="12" md="7" lg="8">
              {/* <ResponseDetail /> */}

              <Card className="card-scroll">
                {selectedResponse ? (
                  <div>
                    {" "}
                    <div className="border-bottom p-3">
                      <div className="d-flex align-items-center  p-2">
                        <img
                          src={user1}
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">
                            {selectedResponsedata.fullname}
                          </h6>
                          <span className="text-muted">
                            {selectedResponsedata.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td width="150">
                              {" "}
                              <h6>Full name</h6>
                            </td>
                            <td>
                              {" "}
                              <h6>: {selectedResponsedata.fullname}</h6>
                            </td>
                          </tr>
                          <tr>
                            <td width="150">
                              {" "}
                              <h6>Date</h6>
                            </td>
                            <td>
                              {" "}
                              <h6>: {selectedResponsedata.date}</h6>
                            </td>
                          </tr>
                          <tr>
                            <td width="150">
                              {" "}
                              <h6>Mobile Number</h6>
                            </td>
                            <td>
                              {" "}
                              <h6>: {selectedResponsedata.phone}</h6>
                            </td>
                          </tr>
                          <tr>
                            <td width="150">
                              {" "}
                              <h6>Email</h6>
                            </td>
                            <td>
                              {" "}
                              <h6>: {selectedResponsedata.email}</h6>
                            </td>
                          </tr>
                          <tr>
                            <td width="150">
                              {" "}
                              <h6>Message</h6>
                            </td>
                            <td>
                              {" "}
                              <h6>: {selectedResponsedata.message} </h6>
                            </td>
                          </tr>
                          <tr>
                            <td width="150">
                              {" "}
                              <h6>Consultation Type</h6>
                            </td>
                            <td>
                              {" "}
                              <h6>: {selectedResponsedata.type} </h6>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="selectimg-container">
                    <CardImg className="selectimg" src={selectimg} />

                    <h5>Select To See Details</h5>
                  </div>
                )}
              </Card>
              {/* <Card className="card-scroll"> */}
              {/* <Outlet /> */}
              {/* </Card> */}
            </Col>
          </Row>
        ) : (
          <Loader />
        )}
      </Row>

      {/* MOBILE RESPONSES */}
      <Card className="m-responses-detail">
        <CardBody>
          <div className="card-scroll-container">
            {mselectedResponse && (
              <div>
                {" "}
                <div className="d-flex justify-content-between">
                  <CardTitle tag="h5">Reponses</CardTitle>
                  <button
                    onClick={() => {
                      setmSelectedResponse(false);
                    }}
                  >
                    close
                  </button>
                </div>
                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <tbody>
                    <tr>
                      <td width="150">
                        {" "}
                        <h6>Name</h6>
                      </td>
                      <td>
                        {" "}
                        <h6>: {selectedResponsedata.fullname}</h6>
                      </td>
                    </tr>
                    <tr>
                      <td width="150">
                        {" "}
                        <h6>Date</h6>
                      </td>
                      <td>
                        {" "}
                        <h6>: {selectedResponsedata.date}</h6>
                      </td>
                    </tr>
                    <tr>
                      <td width="150">
                        {" "}
                        <h6>Phone</h6>
                      </td>
                      <td>
                        {" "}
                        <h6>: {selectedResponsedata.phone}</h6>
                      </td>
                    </tr>
                    <tr>
                      <td width="150">
                        <h6>Email</h6>
                      </td>
                      <td>
                        <h6>: {selectedResponsedata.email}</h6>
                      </td>
                    </tr>

                    <tr>
                      <td width="150">
                        <h6>Message</h6>
                      </td>
                      <td>
                        <h6>: {selectedResponsedata.message} </h6>
                      </td>
                    </tr>
                    <tr>
                      <td width="150">
                        {" "}
                        <h6>Consultation Type</h6>
                      </td>
                      <td>
                        {" "}
                        <h6>: {selectedResponsedata.type} </h6>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}

            {!mselectedResponse && (
              <div>
                <CardTitle tag="h5">Reponses</CardTitle>
                {ResponseapiData.map((data) => (
                  <div
                    key={data.id}
                    onClick={() => {
                      setSelectedResponsedata(data);
                      setmSelectedResponse(true);
                    }}
                    className="d-flex align-items-center ResponseCard   pt-3"
                  >
                    <img
                      src={user1}
                      className="rounded-circle"
                      alt="avatar"
                      width="32"
                      height="32"
                    />
                    <div className="ms-3">
                      <h6 className="mb-0">{data.fullname}</h6>
                      <h6>{data.phone}</h6>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Booking;
