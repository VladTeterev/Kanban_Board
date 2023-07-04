import { useState } from "react";
import "./index.css";
const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const Menus = ["Profile", "Log Out"];
  return (
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
  );
};

export default UserMenu;
