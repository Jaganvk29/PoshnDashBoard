import { Button } from "bootstrap";
import React from "react";
import { Card } from "reactstrap";
import loginpic from "../assets/images/login.jpg";
const LoginTImeOut = () => {
  return (
    <div>
      <Card className="login-timeout-container">
        <h5>Login Session Timed Out Please Login Again</h5>{" "}
        <img className="login-timeout-img" src={loginpic}></img>
        <Button>Login</Button>
      </Card>
    </div>
  );
};

export default LoginTImeOut;
