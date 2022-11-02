const div = (
  <div className="wrapper">
    <h1 className="heading" onClick={() => console.log("Clicked")}>
      Hello React
    </h1>
    <img
      src="https://vcdn1-dulich.vnecdn.net/2021/07/16/8-1626444967.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GfgGn4dNuKZexy1BGkAUNA"
      alt="Ảnh"
    />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(div);
