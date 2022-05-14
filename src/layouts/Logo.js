// import { ReactComponent as LogoDark } from "../assets/images/logos/materialpro.svg";
import { Link } from "react-router-dom";
import PoshnLogo from "../assets/images/logos/poshnlogo.png";
import "../Css/main.css";
const Logo = () => {
  return (
    <Link to="/">
      <img className="poshn-logo" src={PoshnLogo} />
    </Link>
  );
};

export default Logo;
