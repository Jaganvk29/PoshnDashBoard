import { Card, CardBody, CardSubtitle, CardTitle, Table } from "reactstrap";
import Chart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../layouts/loader/Loader";
import { axiosJWT } from "../../views/ui/Auth/axiosJWT";
const SalesChart = () => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
      },
    },
    colors: ["#0d6efd", "#009efb", "#6771dc"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "2020",
      data: [20, 40, 50, 30, 40, 50, 30, 30, 40],
    },
    {
      name: "2022",
      data: [10, 20, 40, 60, 20, 40, 60, 60, 20],
    },
  ];

  const [ProductapiData, setMyproductsApiData] = useState([]);
  const [apiStatus, setApiStatus] = useState();
  const token = localStorage.getItem("tokenkey");
  useEffect(() => {
    getMyproductData();
  }, []);
  const getMyproductData = async () => {
    await axiosJWT
      .get(`/admin/product/`, {
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
          Myproductarr.push({
            id: element.id,
            category: element.category,
            categoryid: element.category_id,
            title: element.name,
            price: element.price,
            description: element.description,
          });
        });

        setMyproductsApiData(Myproductarr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Pricing Membership</CardTitle>
        {apiStatus === 200 ? (
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Product NAME</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {ProductapiData.map((Data, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{Data.title}</h6>
                      </div>
                    </div>
                  </td>
                  <td>{Data.category.name}</td>
                  <td>{Data.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Loader />
        )}
      </CardBody>
    </Card>
  );
};

export default SalesChart;
