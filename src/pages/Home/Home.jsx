import "./home.css";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle"

const Home = () => {
  useDocumentTitle("The Shop! - Home")
  return (
    <section id="homePageContainer" className="pageContainer">
      <h1 className="pageHeaderTitle">Welcome !</h1>
      <button className="basicButton">
        <Link to="/categories">Let's go shopping!</Link>
      </button>
    </section>
  );
};

export default Home;
