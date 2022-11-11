# **React Router**

## **1. React-Router là gì?**

React-Router là một thư viện định tuyến (routing) tiêu chuẩn trong React. Nó giữ cho giao diện của ứng dụng đồng bộ với URL trên trình duyệt. React-Router cho phép bạn định tuyến "luồng dữ liệu" (data flow) trong ứng dụng của bạn một cách rõ ràng. Nó tương đương với sự khẳng định, nếu bạn có URL này, nó sẽ tương đương với Route này, và giao diện tương ứng.

## **2. Cài đặt React-Router**

```js
npm install react-router-dom
```

## **3. Một số thành phần cơ bản của React-Router**

### **3.1. BrowserRouter vs HashRouter**

- `React-Router` cung cấp cho chúng 2 thành phần hay sử dụng đó là `BrowserRouter` & `HashRouter`. Hai thành phần này khác nhau ở kiểu URL mà chúng sẽ tạo ra và đồng bộ.

- `BrowserRouter`: Được sử dụng phổ biến hơn, nó sử dụng History API có trong HTML5 để theo dõi lịch sử bộ định tuyến của bạn.

- `HashRouter`: Sử dụng hash của URL (window.location.hash) để ghi nhớ mọi thứ.

```js
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
```

### **3.2. Routes và Route**

`<Route>`: Định nghĩa một ánh xạ (mapping) giữa một URL và một Component. Điều đó có nghĩa là khi người dùng truy cập theo một URL trên trình duyệt, `<Routes>` sẽ xem xét tất cả các `<Route>` con của nó để tìm kết quả phù hợp nhất và hiển thị Component tương ứng ra giao diện người dùng.

Các phần tử `<Route>` có thể được lồng vào nhau để biểu thị giao diện người dùng lồng nhau, cũng tương ứng với các đường dẫn URL lồng nhau.

```js
<Routes>
  <Route path="/" element={<Dashboard />}>
    <Route path="messages" element={<DashboardMessages />} />
    <Route path="tasks" element={<DashboardTasks />} />
  </Route>
  <Route path="about" element={<AboutPage />} />
</Routes>
```

Trong đó:

- `path`: Là đường dẫn trên URL.
- `element`: Là component sẽ đươc load ra tương ứng với Route đó.

### **3.3. Link**

Trong HTML thì cặp thẻ để chuyển hướng đó là thẻ `<a></a>` thì trong react chúng ta sẽ dử dụng cặp thẻ `<Link></Link>` được import từ React-Router.

```js
<Link to="/about">About</Link>
```

trong đó `to:` giống như thuộc tính `href` trong thẻ `a`.

### **3.4. NavLink**

`NavLink` thì rất giống với `Link` về cách sử dụng, nhưng `NavLink` tốt hơn vì nó hỗ trợ thêm một số thuộc tính như là `activeClassName` và `activeStyle`. Hai thuộc tính này giúp cho khi mà nó trùng khớp thì nó sẽ được active lên và chúng ta có thể style cho nó.

```js
<NavLink
  exact
  activeStyle={{
    backgroundColor: "white",
    color: "red",
  }}
  to="/"
  className="my-link"
>
  Trang Chu
</NavLink>
```

### **3.5. Custom Link**

Ở trên ta có thẻ `NavLink` giúp chúng ta có thêm một thuộc tính nhưng giả sử khi bạn không muốn `activeClassName` hoặc `activeStyle` tại thẻ `NavLink` mà nó lại nằm ở một thẻ bao nó ví dụ như thẻ `div` hay thẻ `li` thì sao? sau đây mình sẽ custom lại để có thể sử dụng các `class` hoặc `style` ở thẻ bao ngoài của nó.

```js
const MenuLink = ({
  label, // nội dung trong thẻ
  to, // giống như href trong thẻ a
  activeOnlyWhenExact,
}) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        //match la doi tuong xac dinh su trung khop cua URL
        var active = match ? "active abc" : "";

        return (
          <li className={`my-li ${active}`}>
            <Link to={to} className="my-link">
              {label}
            </Link>
          </li>
        );
      }}
    />
  );
};
```

### **3.6. Navigate**

Dùng để chuyển trang khi vị trí hiện tại không được hiển thị.

```js
import * as React from "react";
import { Navigate } from "react-router-dom";

class LoginForm extends React.Component {
  state = { user: null, error: null };

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let user = await login(event.target);
      this.setState({ user });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    let { user, error } = this.state;
    return (
      <div>
        {error && <p>{error.message}</p>}
        {user && <Navigate to="/dashboard" replace={true} />}
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input type="text" name="username" />
          <input type="password" name="password" />
        </form>
      </div>
    );
  }
}
```

## **4. Cách sử dụng cơ bản**

Để tạo một ứng dụng có nhiều trang, trước tiên hãy bắt đầu với cấu trúc tệp.

Trong thư mục src, chúng ta sẽ tạo một thư mục có tên các trang với một số tệp (mỗi tệp là một React component):

- Layout.js
- Home.js
- Blogs.js
- Contact.js
- NoPage.js

Bây giờ chúng ta sẽ sử dụng React Router để định tuyến đến các trang dựa trên URL bằng cách sửa file index.js như sau:

```js
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

**_Giải thích về cấu trúc code trên_**

Chúng ta bọc toàn bộ nội dung trang web của mình trước tiên với `<BrowserRouter>`.

Sau đó, chúng ta xác định `<Routes>` của chúng ta. Một ứng dụng có thể có nhiều `<Routes>`. Ví dụ cơ bản của chúng ta chỉ sử dụng một.

Các `<Route>` có thể được lồng vào nhau. `<Route>` đầu tiên có một đường dẫn `/` và hiển thị component `Layout`.

Các `<Route>` lồng nhau kế thừa và thêm vào tuyến mẹ. Vì vậy, đường dẫn `blog` được kết hợp với đường dẫn gốc và trở thành `/blog`.

Đường dẫn component `Home` không có đường dẫn nhưng có thuộc tính `index`. Điều đó chỉ định tuyến đường này là tuyến mặc định cho tuyến mẹ, là `/`.

Đặt đường dẫn đến `*` sẽ hoạt động như một phương thức truy cập cho mọi URL không xác định. Điều này là tuyệt vời cho một trang lỗi 404.

**_Pages / Components_**

Component `Layout` có các phần tử `<Outlet>` và `<Link>`.

`<Outlet>` hiển thị tuyến đường hiện tại đã chọn.

`<Link>` được sử dụng để đặt URL và theo dõi lịch sử duyệt web.

Bất cứ khi nào chúng ta liên kết đến một đường dẫn nội bộ, chúng ta sẽ sử dụng `<Link>` thay vì `<a href="">`.

"Lộ trình bố cục" là một thành phần được chia sẻ chèn nội dung chung trên tất cả các trang, chẳng hạn như menu điều hướng.

**Layout.js:**

```js
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
```

**Home.js:**

```js
const Home = () => {
  return <h1>Home</h1>;
};

export default Home;
```

**Blogs.js:**

```js
const Blogs = () => {
  return <h1>Blog Articles</h1>;
};

export default Blogs;
```

**Contact.js:**

```js
const Contact = () => {
  return <h1>Contact Me</h1>;
};

export default Contact;
```

**NoPage.js:**

```js
const NoPage = () => {
  return <h1>404</h1>;
};

export default NoPage;
```
