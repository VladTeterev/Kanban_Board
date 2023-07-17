import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const Menus = ["Profile", "Log Out"];
  return (
    <header className="header">
      <h1 className="header__name">Awesome Kanban Board</h1>
      <div className="container">
        <button
          className={open ? "user-menu__btn strike" : "user-menu__btn"}
          onClick={() => setOpen(!open)}
        ></button>

        {open && (
          <div className="user-menu">
            <div className="rectangle"></div>
            <ul>
              {Menus.map((menu) => (
                <li
                  className="user-menu__item"
                  onClick={() => setOpen(false)}
                  key={menu}
                >
                  {menu}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
