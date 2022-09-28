import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { inventoryForThisCategory } from "../../helpers/CategoryFunctions";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./categories.css";

const CategoriesItem = ({ URLSlug, title, image }) => {
  return (
    <Link to={`/categories/${URLSlug}`} className="categoriesItem">
      <div className="cIImageContainer">
        <img src={image} alt={title.slice(0, 30)} />
      </div>
      <div className="cITitleContainer">
        <p>{title}</p>
      </div>
    </Link>
  );
};

const Categories = () => {
  const categories = useSelector((state) => state.inventory.categories);
  const inventory = useSelector((state) => state.inventory.inventory);
  const inventoryForThisCategoryInstance = (catArr, catName) =>
    inventoryForThisCategory(inventory, catArr, catName);

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
            image={
              inventoryForThisCategoryInstance(
                categories,
                categories[1][index]
              )[0].image
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;
