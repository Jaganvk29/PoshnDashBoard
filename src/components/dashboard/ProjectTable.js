import react, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

import user4 from "../../assets/images/users/user.png";

import { axiosJWT } from "../../views/ui/Auth/axiosJWT";

const ProjectTables = (props) => {
  const [ResponseapiData, setResponseapiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();

  const [selectedResponse, setSelectedResponse] = useState(false);
  const [mselectedResponse, setmSelectedResponse] = useState(false);

  const [selectedResponsedata, setSelectedResponsedata] = useState([]);
  const token = localStorage.getItem("tokenkey");

  const getConactData = async () => {
    await axiosJWT
      .get(`/admin/consultation/`, {
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
            type: element.consultation_type,
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
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{props.tabletitle}</CardTitle>
          {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the projects
          </CardSubtitle> */}

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>NAME</th>
                <th>CONTACT</th>
                <th>DATE</th>

                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {ResponseapiData.map(
                (Data, index) =>
                  index <= 6 && (
                    <tr key={index} className="border-top">
                      <td>
                        <div className="d-flex align-items-center p-2">
                          <img
                            src={user4}
                            className="rounded-circle"
                            alt="avatar"
                            width="45"
                            height="45"
                          />
                          <div className="ms-3">
                            <h6 className="mb-0">{Data.fullname}</h6>
                            <span className="text-muted">{Data.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>{Data.phone}</td>
                      <td>{Data.date.substr(0, 10)}</td>
                      <td>{Data.id}</td>
                    </tr>
                  )
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
