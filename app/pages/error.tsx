import { Link } from "react-router";

import { Article } from "../components/Article";

// Rendered by post.tsx when a top-level page/slug doesn't exist.
export default function Error() {
  return (
    <Article>
      <h1 className="error">Sorry this page does not exist!</h1>
      <p>
        <Link to="/">Return home</Link>
      </p>
    </Article>
  );
}
