import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";
import Search from "../Search/Search";
import { NavItems } from "../../data/HeaderData";

export default function Header() {
  const [showMenu, SetShowMenu] = useState<boolean>(false);
  const path = useLocation();

  useEffect(() => {
    SetShowMenu(false);
  }, [path]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper">
          <Link to={"/"}>
            <img src={Logo} />
          </Link>
          <nav className="nav" style={{ display: "flex", gap: "25px" }}>
            <div className="hamburger" onClick={() => SetShowMenu(!showMenu)}>
              {showMenu ? (
                <FaTimes color="#fff" size={24} />
              ) : (
                <FaBars color="#fff" size={24} />
              )}
            </div>
            <ul className={showMenu ? "nav-list-active" : "nav-list"}>
              {NavItems.map((item) => {
                return (
                  <li className="nav-item" key={item.id}>
                    <Link to={`${item.pathLink}`} className="nav-link">
                      {item.pathName}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div style={{ display: "flex" }}>
              <Search />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
