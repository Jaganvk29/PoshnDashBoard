import react, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import axios from "axios";
const tableData = [
  {
    avatar: user1,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
  },
  {
    avatar: user2,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    weeks: "35",
  },
  {
    avatar: user3,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    weeks: "35",
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    weeks: "35",
  },
];

const ProjectTables = (props) => {
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
