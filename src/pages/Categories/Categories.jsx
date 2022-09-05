import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./categories.css";

const CategoriesItem = ({ URLSlug, title }) => {
  return (
    <div className="categoriesItem">
      <p>
        <Link to={`/categories/${URLSlug}`}>{title}</Link>
      </p>
    </div>
  );
};

const Categories = () => {
  const categories = useSelector((state) => state.inventory.categories);
  useDocumentTitle("The Shop! - Categories");
  return (
    <section className="pageContainer">
      <h1 className="pageHeaderTitle">Categories</h1>
      <div id="categories">
        {categories[0].map((category, index) => (
          <CategoriesItem
            key={category}
            URLSlug={categories[1][index]}
            title={category}
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;
