import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  categoryNameFromParamsName,
  inventoryForThisCategory,
} from "../../helpers/CategoryFunctions";
import "./category.css";
import { useEffect } from "react";

const CategoryCard = ({ id, image, title, price, categoryItem }) => {
  return (
    <Link to={`/categories/${categoryItem}/${id}`} className="categoryCard">
      <div className="cCImageContainer">
        <img src={image} alt={title.slice(0, 30)} />
      </div>
      <div className="cCTitleAndPriceContainer">
        <p>{title}</p>
        <p>${price}</p>
      </div>
    </Link>
  );
};

const Category = () => {
  const categories = useSelector((state) => state.inventory.categories);
  const inventory = useSelector((state) => state.inventory.inventory);
  const params = useParams();
  const navigate = useNavigate();
  const categoryNameFromParamsNameInstance = categoryNameFromParamsName(
    categories,
    params.category
  );
  const inventoryForThisCategoryInstance = inventoryForThisCategory(
    inventory,
    categories,
    params.category
  );

  const isValidCategory = categories[1].find(
    (category) => category === params.category
  );

  const categoryName = isValidCategory
    ? categoryNameFromParamsNameInstance
    : "404 Error";

  useEffect(() => {
    if (!isValidCategory) return navigate("/error/category");
  }, []);

  let documentTitle = `The Shop! - ${categoryName}`;

  useDocumentTitle(documentTitle);

  return (
    <section className="pageContainer">
      <h1 className="pageHeaderTitle">{categoryNameFromParamsNameInstance}</h1>
      <div className="categoryCardContainer">
        {inventoryForThisCategoryInstance.map((item) => (
          <CategoryCard
            key={item.id}
            {...item}
            categoryItem={params.category}
          />
        ))}
      </div>
    </section>
  );
};

export default Category;
