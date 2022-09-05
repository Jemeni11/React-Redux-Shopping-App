import { useNavigate, useParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./errorpage404.css";

const ErrorPage404 = () => {
  useDocumentTitle("The Shop! - 404 Error");
  const params = useParams();
  const pageTitle = params.pageTitle;
  const isPageTitleValid =
    pageTitle?.length > 0 && ["category", "product"].includes(pageTitle);

  const navigate = useNavigate();
  const pageTitleRender = isPageTitleValid ? pageTitle : "page";
  return (
    <section className="pageContainer">
      <h1 className="pageHeaderTitle">Error</h1>
      <p>That {pageTitleRender} does not exist</p>
      <button onClick={() => navigate("/categories")} className="basicButton">
        Go back to categories
      </button>
    </section>
  );
};

export default ErrorPage404;
