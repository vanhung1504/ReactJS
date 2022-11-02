# **Functional Components và Class Components trong ReactJS**

## **1. Component là gì**

Một component là một block code độc lập, có thể tái sử dụng, nó chia UI thành nhiều phần nhỏ. Mặt khác, có thể nghĩ đơn giản các components như một khối các blocks LEGO. Tương tự, cấu trúc LEGO được tạo từ nhiều blocks LEGO nhỏ, như tạo một web page hoặc UI từ nhiều block code (components).

## **2. Functional Components**

Các Function component chỉ đơn giản là một hàm Javascript (hoặc ES6) trả về 1 phần tử/1 element React.

**Cú pháp**

```js
import React, { useState } from "react";

const FunctionalComponent = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ margin: "50px" }}>
      <h1>Welcome to Geeks for Geeks</h1>
      <h3>Counter App using Functional Component: </h3>
      <h2>{count}</h2>
      <button onClick={increase}>Add</button>
    </div>
  );
};

export default FunctionalComponent;
```

Trước đây Functional components cũng được nói với một cái tên là stateless components bởi vì chúng ta không thể làm nhiều thứ phức tạp như quản lý React State (data) hoặc phương thức life-cycle trong functional components.

Tuy nhiên, React giới thiệu React Hooks trong versions 16.8, giờ nó cho phép chúng ta sử dụng state và những features khác trong functional components.

## **3. Class Components**

Các Class components là những class ES6. Chúng phức tạp hơn functional components ở chỗ nó còn có: phương thức khởi tạo, life-cycle, hàm render() và quản lý state (data).

**Cú pháp**

```js
import React, { Component } from "react";

class ClassComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    this.increase = this.increase.bind(this);
  }

  increase() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div style={{ margin: "50px" }}>
        <h1>Welcome to Geeks for Geeks </h1>
        <h3>Counter App using Class Component : </h3>
        <h2> {this.state.count}</h2>
        <button onClick={this.increase}> Add</button>
      </div>
    );
  }
}

export default ClassComponent;
```

Bạn có thể thấy, class ExampleComponent kế thừa Component, vì vậy React hiểu class này là một component, và nó renders (returns) một React Element.

## **4. So sánh Functional Components và Class Components**

| Functional Components                                                                                                 | Class Components                                                         |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Chỉ đơn thuần là một hàm Javascript có thể nhận các props như là các đối số và trả về một phần tử React element (JSX) | Là những class ES6 và bắt buộc phải kế thừa (extend) từ React Component. |
| Không cần sử dụng hàm render() để trả về một React element                                                            | Phải sử dụng hàm render() để trả về một React element                    |
| Không sử dụng Constructors. Để quản lý các state có thể sử dụng các hooks (từ sau phiên bản 16.8)                     | Phải sử dụng Constructors nếu muốn quản lý các state                     |
