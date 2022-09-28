import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { categoryNameFromParamsName } from "../../helpers/CategoryFunctions";
import Cart from "../../assets/icon-cart.svg";
import "./navbar.css";

const NavBarCustomLink = ({ location, name }) => {
  return (
    <span className="border-bottom">
      <NavLink
        to={location}
        className={({ isActive }) => (isActive ? "activeLink" : "")}
      >
        {name}
      </NavLink>
    </span>
  );
};

const Navbar = () => {
  const categories = useSelector((state) => state.inventory.categories);
  return (
    <nav id="NavbarContainer" className="flex-row-centered-items">
      <div className="flex-row-centered-items">
        <NavBarCustomLink location="/" name="Home" />
      </div>
      <div className="flex-row-centered-items">
        <NavBarCustomLink location="/categories" name="Categories" />
        <div id="categoryNavLinks">
          {categories[1].map((category) => (
            <NavBarCustomLink
              key={category}
              location={`/categories/${category}`}
              name={categoryNameFromParamsName(categories, category)}
            />
          ))}
        </div>
      </div>
      <div id="NavbarCartandUser" className="flex-row-centered-items">
        <NavLink to="/cart">
          <img src={Cart} alt="cart" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
