import { Link } from "react-router-dom";
import "./css/NotFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <p className="not-found-code">404</p>
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist in this Mini Store.</p>

      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;