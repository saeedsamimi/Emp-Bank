export default function ToolBox({ items, head }, index) {
  return (
    <div className="toolbox-container" key={index}>
      <div className="head">{head}</div>
      {items.map(({ onClick, text, icon }, i) => (
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          key={i}
        >
          <i className={"bi bi-" + icon}></i>
          {text}
        </a>
      ))}
    </div>
  );
}
