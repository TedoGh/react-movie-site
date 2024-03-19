import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found-err">404</h1>
      <h1>Sorry, we couldn't find this page</h1>
      <h4>
        But don't worry you can find plenty of other things on our homepage.
      </h4>
      <div style={{ marginTop: "30px" }}>
        <Link to={"/"}>
          <Button>Back to home page</Button>
        </Link>
      </div>
    </div>
  );
}
