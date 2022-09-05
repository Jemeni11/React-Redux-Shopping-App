import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  categoryNameFromParamsName,
  inventoryForThisCategory,
} from "../../helpers/CategoryFunctions";
import Cart from "../../assets/icon-cart.svg";
import Delete from "../../assets/icon-delete.svg";
import Minus from "../../assets/icon-minus.svg";
import Plus from "../../assets/icon-plus.svg";
import "./product.css";

const ProductImageContainer = ({ image, id = "", category = "" }) => {
  return (
    <div id="ProductImageContainer" className="flex-half-width-padded-item">
      <img src={image} alt={`Product Number ${id} - Category ${category}`} />
    </div>
  );
};

const ProductDetailsContainer = ({
  categoryNameFromParamsNameInstance,
  title,
  description,
  rating,
  price,
  amount,
  amountChangeHandler,
  buttonClickHandler,
  isProductInCart,
}) => {
  return (
    <section
      id="ProductDetailsContainer"
      className="flex-half-width-padded-item"
    >
      <h3>{categoryNameFromParamsNameInstance}</h3>
      <h1>{title}</h1>
      <p id="description">{description}</p>
      <small>
        Rated {rating.rate} out of 5 stars by {rating.count} people
      </small>
      <p id="price">${price}</p>
      <div id="cartControlsContainer">
        <div id="buttonContainer">
          <button id="minus" onClick={() => amountChangeHandler("minus")}>
            <img src={Minus} alt="minus" />
          </button>
          <span>{amount}</span>
          <button id="plus" onClick={() => amountChangeHandler("plus")}>
            <img src={Plus} alt="plus" />
          </button>
        </div>
        <div id="CartButtonsContainer">
          {isProductInCart ? (
            <button
              id="removeFromCartButton"
              className="basicButton"
              onClick={() => buttonClickHandler(amount, "remove")}
            >
              <img src={Delete} alt="delete" />
              <span>Remove&nbsp;from&nbsp;cart</span>
            </button>
          ) : (
            <button
              id="addToCartButton"
              className="basicButton"
              onClick={() => buttonClickHandler(amount, "add")}
            >
              <img src={Cart} alt="cart" />
              <span>Add&nbsp;to&nbsp;cart</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

const Product = () => {
  const categories = useSelector((state) => state.inventory.categories);
  const inventory = useSelector((state) => state.inventory.inventory);
  const cart = useSelector((state) => state.cart.selectedItems);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productID = params.productId;

  const categoryNameFromParamsNameInstance = categoryNameFromParamsName(
    categories,
    params.category
  );

  const inventoryForThisCategoryInstance = inventoryForThisCategory(
    inventory,
    categories,
    params.category
  );

  const isProductInCart = cart?.find((item) => item.id === +productID);

  const findProductUsingID = inventoryForThisCategoryInstance.filter(
    (inventoryItem) => inventoryItem.id === +productID
  );

  useDocumentTitle(`The Shop! - Product ${productID}`);

  const [amount, setAmount] = useState(1);
  const amountChangeHandler = (operation) => {
    if (operation === "minus") {
      if (+amount === 1) return;
      setAmount((prevAmount) => prevAmount - 1);
    } else if (operation === "plus") {
      setAmount((prevAmount) => prevAmount + 1);
    }
  };

  const buttonClickHandler = (item) => (amount, operation) => {
    if (operation === "add") {
      dispatch(
        cartActions.addCart({
          id: item.id,
          value: { ...item, amount: amount },
        })
      );
    } else if (operation === "remove") {
      dispatch(cartActions.removeCart({ value: { id: item.id } }));
    }
  };

  useEffect(() => {
    if (findProductUsingID.length === 0) return navigate("/error/product");
  }, []);

  return (
    <>
      {findProductUsingID.map((item) => (
        <div key={item.id} id="ProductContainer">
          <ProductImageContainer
            image={item.image}
            id={item.id}
            category={item.category}
          />
          <ProductDetailsContainer
            categoryNameFromParamsNameInstance={
              categoryNameFromParamsNameInstance
            }
            isProductInCart={isProductInCart}
            description={item.description}
            price={item.price}
            rating={item.rating}
            title={item.title}
            amount={amount}
            amountChangeHandler={amountChangeHandler}
            buttonClickHandler={buttonClickHandler(item)}
          />
        </div>
      ))}
    </>
  );
};

export default Product;
