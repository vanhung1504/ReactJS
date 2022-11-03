# **Props Key, State, Hook và Handling Events trong ReactJS**

## **1. Props key là gì?**

Key là một thuộc tính chuỗi đặc biệt mà bạn cần đưa vào khi tạo danh sách các phần tử.

Key giúp React xác định những mục nào đã thay đổi, được thêm vào hoặc bị loại bỏ. Các key nên được cấp cho các phần tử bên trong mảng để cung cấp cho các phần tử một danh tính nhất định.

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));
```

Cách tốt nhất để chọn một key là sử dụng một chuỗi xác định duy nhất cho mỗi một mục trong danh sách. Thông thường, bạn sẽ sử dụng ID từ dữ liệu của mình làm key.

Khi bạn không có ID cho các mục được hiển thị, bạn có thể sử dụng chỉ mục (index) làm key như một phương sách cuối cùng:

```js
const todoItems = todos.map((todo, index) => (
  // Only do this if items have no stable IDs
  <li key={index}>{todo.text}</li>
));
```

Tuy nhiên, bạn không nên sử dụng chỉ mục (index) cho các khóa nếu thứ tự của các mục có thể thay đổi. Điều này có thể tác động tiêu cực đến hiệu suất và có thể gây ra sự cố với trạng thái thành phần.

Các key được sử dụng trong các mảng phải là duy nhất giữa các mục lục. Tuy nhiên, chúng không cần phải là duy nhất trên toàn trang web. Chúng ta có thể sử dụng các khóa giống nhau khi chúng ta tạo ra hai mảng khác nhau:

```js
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
  const content = props.posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  { id: 1, title: "Hello World", content: "Welcome to learning React!" },
  { id: 2, title: "Installation", content: "You can install React from npm." },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Blog posts={posts} />);
```

## **2. State**

State cũng tương tự như props, nhưng nó là của riêng một component và được quản lý bởi chính component đó.

Có thể xem state giống như nơi lưu trữ dữ liệu của một component trong React. Nó được dùng chủ yếu để cập nhật lại giao diện (UI) với các điều kiện nhất định.

Để sử dụng được state thì component của chúng ta phải là một class component (hoặc có thể sử dụng React Hooks trong phiên bản 16.8).

Class component thì được kế thừa từ lớp cơ sở của React là React.Component. Trong một component, state giá trị ban đầu là null, và được khai báo trong hàm khởi tạo (Constructor), và chúng ta có thể gán giá trị mặc định của state ở hàm này.

Ví dụ về State:

```js
class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "kai",
      lastName: "tran",
    };
  }

  changeName = () => {
    this.setState({ firstName: "sena" });
    this.setState({ lastName: "nguyen" });
  };
  render() {
    return (
      <div>
        <p>
          Hello: {this.state.firstName} {this.state.lastName}
        </p>
        <br />
        <button type="button" onClick={this.changeName}>
          change name
        </button>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");

ReactDOM.render(<Name />, rootElement);
```

```js
function App() {
  const users = [
    {
      id: "d8a7ecf2b2aeadbc8ebbdbcf",
      fullname: "Reginald Welch",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/634.jpg",
      job: "Product Usability Associate",
    },
    {
      id: "ddebaafecefb10bdef3e93af",
      fullname: "Greg Stark",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1109.jpg",
      job: "Product Data Director",
    },
  ];

  const [searchValue, setSearchValue] = React.useState("");
  const [usersFilter, setUsersFilter] = React.useState(users);

  React.useEffect(() => {
    setUsersFilter(() =>
      users.filter((user) =>
        user.fullname.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  return (
    <div className="wrapper">
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder="Name"
          name="name"
          id="name"
          required
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <label htmlFor="name" className="form__label">
          Search for name
        </label>
      </div>
      <UserList users={usersFilter} />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

## **3. Hook**

### **3.1. React hook là gì?**

Hooks là một bổ sung mới trong React 16.8.

Hooks là những hàm cho phép bạn “kết nối” React state và lifecycle vào các components sử dụng hàm.

Với Hooks bạn có thể sử dụng state và lifecycles mà không cần dùng ES6 Class.

Ví dụ:

```js
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [title]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### **3.2. Tại sao chúng ta cần React Hooks?**

- "Wrapper hell” các component được lồng (nested) vào nhau nhiều tạo ra một DOM tree phức tạp.

- Component quá lớn.

- Sự rắc rối của Lifecycles trong class

React Hooks được sinh ra với mong muốn giải quyết những vấn đề này.

### **3.3. Lợi ích của hook**

- Khiến các component trở nên gọn nhẹ hơn

- Giảm đáng kể số lượng code, dễ tiếp cận

- Cho phép chúng ta sử dụng state ngay trong function component

### **3.4. Lưu ý khi dùng hook**

- Trong cùng một component, bạn có thể sử dụng bao nhiêu useState và useEffect tùy ý nhưng các hook này phải gọi ở trên cùng của function, không được nằm trong vòng lặp, khu vực điều kiện, hay các function con

- Nó chỉ sử dụng trong functional component

- Khi sử dụng useEffect để lấy dữ liệu, cần kiểm tra dữ liệu đã tồn tại hay chưa. Nếu không thì hàm sẽ gửi request liên tục

## **4. Handling Events**

Việc xử lý các sự kiện với các phần tử React rất giống với việc xử lý các sự kiện trên các phần tử DOM.

Có một số khác biệt về cú pháp:

- Các sự kiện React được đặt tên bằng cách sử dụng camelCase, thay vì chữ thường.

- Với JSX, bạn chuyển một hàm làm trình xử lý sự kiện, thay vì một chuỗi.

Ví dụ với HTML:

```html
<button onclick="activateLasers()">Activate Lasers</button>
```

Còn với React:

```js
<button onClick={activateLasers}>Activate Lasers</button>
```

Một điểm khác biệt nữa là bạn không thể trả về false để ngăn hành vi mặc định trong React. Bạn phải gọi PreventDefault một cách rõ ràng.

Ví dụ: với HTML thuần túy, để ngăn hành vi gửi biểu mẫu mặc định, bạn có thể viết:

```js
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

Trong React, thay vào đó có thể là:

```js
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

Khi sử dụng React, bạn thường không cần gọi addEventListener để thêm trình nghe vào phần tử DOM sau khi nó được tạo. Thay vào đó, chỉ cung cấp trình lắng nghe khi phần tử được hiển thị ban đầu.

Ví dụ về truyền đối số cho người xử lý sự kiện:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
```
