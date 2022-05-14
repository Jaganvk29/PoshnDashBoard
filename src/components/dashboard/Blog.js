import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  Badge,
} from "reactstrap";

const Blog = (props) => {
  return (
    <Card>
      {props.image && <CardImg alt="Card image cap" src={props.image} />}
      <CardBody className="p-4">
        <CardTitle tag="h5">
          {props.title}
          {props.badge && (
            <Badge color={`${props.badgecol}`}>{props.badge}</Badge>
          )}
        </CardTitle>

        <CardSubtitle>{props.subtitle}</CardSubtitle>
        <CardText className="mt-3">{props.text}</CardText>
        <Link to={`${props.link}`}>
          <Button color={props.color}>Edit</Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default Blog;
