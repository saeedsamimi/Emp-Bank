import "../Pages/dashboard.css";

export default function Navbar({ items, expanded, selected, onItemClick }) {
  return (
    <div className={expanded ? "l-navbar show" : "l-navbar"} id="nav-bar">
      <nav className="nav">
        <div>
          <div className="logo"></div>
          <div className="nav_list">
            {items.map((item, index) => (
              <a
                key={index}
                href=""
                className={index === selected ? "nav_link active" : "nav_link"}
                onClick={(e) => {
                  e.preventDefault();
                  onItemClick(index);
                }}
              >
                <i
                  className={
                    "nav_icon bi bi-" +
                    item.icon +
                    (index === selected ? "-fill" : "")
                  }
                ></i>
                <span className="nav_name">{item.text}</span>
              </a>
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
