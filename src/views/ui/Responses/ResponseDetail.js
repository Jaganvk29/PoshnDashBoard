import react, { useState, useEffect } from "react";

import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import user1 from "../../../assets/images/users/user1.jpg";

import axios from "axios";
import Loader from "../../../layouts/loader/Loader";
import { Link, useParams } from "react-router-dom";
import { axiosJWT } from "../Auth/axiosJWT";
const ResponseDetail = () => {
  const [reqId, setReqId] = useState();
  const params = useParams();
  const paramid = params.responseId;
  useEffect(() => {
    setReqId();
  }, [params]);

  //   console.log(reqId);
  const [ResponseapiData, setResponseapiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  const getConactData = async () => {
    await axiosJWT
      .get(`/admin/contact/${paramid}`, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((data) => {
        const ResponseData = data.data;
        setApiStatus(data.status);
        // console.log(ResponseData);
        setResponseapiData(ResponseData);

        // const contactData = [];
        // ResponseData.forEach((element) => {
        //   contactData.push({
        //     fullname: element.full_name,
        //     email: element.email,
        //     phone: element.phone,
        //     date: element.date,
        //     message: element.message,

        //     id: element.id,
        //   });
        // });
      });
  };
  //   console.log(ResponseapiData);

  useEffect(() => {
    getConactData();
  }, [params]);

  return (
    <div>
      {" "}
      <Card className="card-scroll">
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
              <h6 className="mb-0">{ResponseapiData.full_name}</h6>
              <span className="text-muted">{ResponseapiData.email}</span>
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
                  <h6>: {ResponseapiData.full_name}</h6>
                </td>
              </tr>
              <tr>
                <td width="150">
                  {" "}
                  <h6>Date</h6>
                </td>
                <td>
                  {" "}
                  <h6>: {ResponseapiData.date}</h6>
                </td>
              </tr>
              <tr>
                <td width="150">
                  {" "}
                  <h6>Mobile Number</h6>
                </td>
                <td>
                  {" "}
                  <h6>: {ResponseapiData.phone}</h6>
                </td>
              </tr>
              <tr>
                <td width="150">
                  {" "}
                  <h6>Email</h6>
                </td>
                <td>
                  {" "}
                  <h6>: {ResponseapiData.email}</h6>
                </td>
              </tr>
              <tr>
                <td width="150">
                  {" "}
                  <h6>Message</h6>
                </td>
                <td>
                  {" "}
                  <h6>: {ResponseapiData.message} </h6>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ResponseDetail;
