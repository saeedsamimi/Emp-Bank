import "../Pages/dashboard.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function NavbarItem({ text, icon, highlighted, onClick }) {
  return (
    <a
      href=""
      className={highlighted ? "nav_link active" : "nav_link"}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      data-bs-toggle="tooltip"
      data-bs-placement="right"
      data-bs-title={text}
    >
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip>{text}</Tooltip>}
      >
        <i
          className={"nav_icon bi bi-" + icon + (highlighted ? "-fill" : "")}
        ></i>
      </OverlayTrigger>

      <span className="nav_name">{text}</span>
    </a>
  );
}

export default function Navbar({ items, expanded, selected, onItemClick }) {
  return (
    <div className={expanded ? "l-navbar show_nav" : "l-navbar"} id="nav-bar">
      <nav className="nav">
        <div>
          <div className="logo"></div>
          <div className="nav_list">
            {items.map((item, index) => (
              <NavbarItem
                key={index}
                icon={item.icon}
                text={item.text}
                highlighted={index === selected}
                onClick={() => onItemClick(index)}
              />
            ))}
          </div>
        </div>
        <a href="#" className="nav_link">
          <i className="bi bi-door-closed nav_icon"></i>
          <span className="nav_name">SignOut</span>
        </a>
      </nav>
    </div>
  );
}
