import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./cart.css";

const Cart = () => {
  useDocumentTitle("The Shop! - Cart");
  const cart = useSelector((state) => state.cart.selectedItems);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cartActions.calculateSubTotal());
  });

  function numberToPrecision(number) {
    const numberLength = number.toString().split(".")[0].length + 2;
    return +number.toPrecision(numberLength);
  }

  function lookLikeCurrency(number) {
    return number.toLocaleString("en-US", { minimumFractionDigits: 2 });
  }

  const subTotalToPrecision = numberToPrecision(subTotal);

  const Shipping = 0.05 * subTotal;
  const shippingToPrecision = numberToPrecision(Shipping);

  const discount = 0.1 * subTotal;
  const discountToPrecision = numberToPrecision(discount);

  const total = numberToPrecision(
    subTotalToPrecision - discountToPrecision + shippingToPrecision
  );

  const TableRow = ({ id = "", name, currency, sign = "" }) => {
    return (
      <tr id={id}>
        <td className="tableHeadings">{name}</td>
        <td className="tableValue">{`${sign} $${lookLikeCurrency(
          currency
        )}`}</td>
      </tr>
    );
  };

  const Table = () => {
    return (
      <table>
        <thead>
          <tr>
            <th colSpan="2" id="tableTitle">
              Order Summary
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow name="Subtotal" currency={subTotalToPrecision} />
          <TableRow name="Shipping" currency={shippingToPrecision} />
          <TableRow
            name="10% Discount"
            currency={discountToPrecision}
            sign="-"
          />
          <TableRow id="tableTotal" name="Total" currency={total} />
        </tbody>
      </table>
    );
  };

  const amountChangeClickHandler = (operation, id) => {
    const findProductUsingID = cart.filter(
      (inventoryItem) => inventoryItem.id === +id
    )[0];

    let amount = findProductUsingID.amount;

    if (operation === "minus") {
      amount -= 1;
      if (+amount === 0) {
        dispatch(cartActions.removeCart({ value: { id } }));
        return;
      }
    } else if (operation === "plus") {
      amount += 1;
    }

    dispatch(
      cartActions.addCart({
        id,
        value: { ...findProductUsingID.value, amount },
      })
    );
  };

  const CartDetailsItemCart = ({
    id,
    title,
    image,
    category,
    price,
    amount,
  }) => {
    return (
      <li className="CartDetailsItemCartContainer">
        <div className="CartDetailsItemImageContainer">
          <img
            src={image}
            alt={`Product Number ${id} - Category ${category}`}
          />
        </div>
        <div className="CartDetailsItemDetails">
          <p className="CDID_category">{category}</p>
          <p className="CDID_title">{title}</p>
          <div className="CDID_buttonContainer">
            <button
              className="CDID_removeButton"
              onClick={() =>
                dispatch(cartActions.removeCart({ value: { id } }))
              }
            >
              Remove
            </button>
            <button
              className="CDID_minusButton"
              onClick={() => amountChangeClickHandler("minus", id)}
            >
              &#8722;
            </button>
            <button
              className="CDID_plusButton"
              onClick={() => amountChangeClickHandler("plus", id)}
            >
              {" "}
              &#43;
            </button>
          </div>
          <div className="CDID_priceContainer">
            <div>
              <p className="CDID_price">${price} </p>
              <p>&#215;</p>
              <p> {amount}</p>
            </div>
            <p className="CDID_total">
              ${lookLikeCurrency(numberToPrecision(price * amount))}
            </p>
          </div>
        </div>
      </li>
    );
  };

  const checkoutHandler = () => {
    setModalIsOpen(true);
  };

  const closeButtonFunction = () => {
    setModalIsOpen(false);
    dispatch(cartActions.clearCart());
  };

  return (
    <section id="cartSectionContainer" className="pageContainer">
      <h1 className="pageHeaderTitle">Cart</h1>
      {cart.length === 0 ? (
        <>
          <h1>No Items</h1>
          <button
            onClick={() => navigate("/categories")}
            className="basicButton"
          >
            Go back to categories
          </button>
        </>
      ) : (
        <div id="cartContainer">
          <div id="cartDetails">
            <ul>
              {cart.map((cartItems) => (
                <CartDetailsItemCart key={cartItems.id} {...cartItems} />
              ))}
            </ul>
          </div>
          <div id="orderSummary">
            <Table />
            <button
              id="checkoutButton"
              className="basicButton"
              onClick={checkoutHandler}
            >
              Checkout
            </button>
            {modalIsOpen && (
              <Modal
                setIsOpen={setModalIsOpen}
                closeButtonFunction={closeButtonFunction}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
