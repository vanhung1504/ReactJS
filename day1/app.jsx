function Header() {
  return <h1 className="header">Our Reviews</h1>;
}

function Avatar({ user: { img, name } }) {
  return (
    <div className="avatar-box">
      <img className="user-avatar" src={img} alt={name} />
    </div>
  );
}

function Info({ user: { name, job } }) {
  return (
    <div className="info-box">
      <h2 className="user-name">{name}</h2>
      <h3 className="user-job"> {job}</h3>
    </div>
  );
}

function Author({ children }) {
  return <div className="author">{children}</div>;
}

function Content({ user: { content } }) {
  return <p className="content">{content}</p>;
}

function Review({ children }) {
  return <div className="review">{children}</div>;
}

function Controls() {
  return (
    <div className="controls">
      <div className="controls-prev">
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <div className="controls-next">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
}

function ReviewCard({ children }) {
  return <div className="review-card">{children}</div>;
}

function App() {
  const user = {
    name: "Susan Smith",
    job: "Web developer",
    img: "https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg",
    content:
      "You can add icons to your web projects with a little bit of code - it's easy once you have a few of the basics under your belt. There are a variety of styling options you can use with your Font Awesome icons on the web. Use one or combine them like Voltron.",
  };

  return (
    <div className="wrapper">
      <Header />
      <ReviewCard>
        <Review>
          <Author>
            <Avatar user={user} />
            <Info user={user} />
          </Author>
          <Content user={user} />
        </Review>
        <Controls />
      </ReviewCard>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
