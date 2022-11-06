## **1. Các lỗi thường gặp khi sử dụng state/hooks**

- Sử dụng hooks với class component.
- Khai báo hooks nằm ngoài phạm vi Functions component.
- Không khai báo hooks ở cấp cao nhất của hàm (thân hàm).
- Không sử dụng callback làm giá trị khởi tạo cho useState khi giá trị khởi tạo là một logic xử lý phức tạp.

## **2. One-way data binding và Two-way data binding**

Trước tiên chúng ta cùng tìm hiểu về thuật ngữ <mark>data binding</mark>. <mark>data binding</mark> là quá trình thiết lập kết nối giữa giao diện ứng dụng (application UI) và các chức năng ở tầng logic của ứng dụng (business logic). Sự kết nối này đảm bảo rằng mỗi thay đổi bên phía giao diện (application UI) sẽ tạo ra thay đổi đối với các dữ liệu, dựa theo logic của hệ thống (business logic). Một ví dụ đơn giản là nếu chúng ta thay đổi nội dung nhập vào cho một khung tìm kiếm, các kết quả trả về sẽ được thay đổi dựa theo giá trị mà chúng ta nhập vào.

- One way data binding: là dữ liệu chỉ được truyền 1 chiều. Có thể từ view sang component hoặc ngược lại từ component sang view.
- Two way data binding: Binding 2 chiều có nghĩa là chúng ta thay đổi dữ liệu từ component qua view và ngược lại từ view chúng ta thay đổi dữ liệu.

Trong React luồng dữ liệu là <mark>one-way data binding</mark>. Trong liên kết dữ liệu một chiều, một trong các điều kiện sau có thể được tuân theo:

- Component to View: Mọi thay đổi trong dữ liệu Component sẽ được phản ánh trong View
- View to Component: Mọi thay đổi trong View sẽ được phản ánh trong dữ liệu của Component.

## **3. Chia sẻ trạng thái chung giữa nhiều Component**

Chia sẻ state giữa các component là bài toán phổ biến trong React. Đặc biệt là trong một số trường hợp truyền props xuống quá nhiều cấp component gây ra rất nhiều khó khăn và tốn nhiều thời gian.

Để tránh được vấn đề này, bạn có thể tạo một context để thêm những shared state và sau đó component nào cần thì bạn gọi context đó ra xài, không cần phải truyền từ cha xuống con nữa. Nó cũng giống như biến global được chia sẻ và sử dụng ở nhiều nơi, nhưng context được quản lí tốt hơn để maintain code dễ hơn.

Ví dụ sử dụng context:

```js
import React from "react";

const ExampleContext = React.createContext();

const App = () => {
  return (
    <ExampleContext.Provider value={{ color: "red" }}>
      <div className="App">
        <ChildComponent />
      </div>
    </ExampleContext.Provider>
  );
};

const ChildComponent = () => {
  const { color } = React.useContext(ExampleContext);

  return <p style={{ color }}>This text is {color}</p>;
};

export default App;
```

Đầu tiên chúng ta sẽ định nghĩa 1 context:

```js
const ExampleContext = React.createContext();
```

Sau đó bao bọc toàn bộ thành phần DOM của component bằng thẻ Provider, đồng thời truyền giá trị mà mình muốn chia sẻ đến các component khác

```js
<ExampleContext.Provider value={{ color: "red" }}>
  <div className="App">
    <ChildComponent />
  </div>
</ExampleContext.Provider>
```

Như vậy là chúng ta đã có thể sử dụng context đó trong các component con thông qua useContext:

```js
const ChildComponent = () => {
  const { color } = React.useContext(ExampleContext);

  return <p style={{ color }}>This text is {color}</p>;
};
```

## **4. Controlled Form vs Uncontrolled Form**

Trong hầu hết các trường hợp chúng ta thường cài đặt các component trong react dưới dạng controlled components. Có thể hiểu controlled components là các dữ liệu trong form đều được React quản lí thường dưới dạng state hoặc store. Còn uncontrolled components thì khác, dữ liệu được lấy trực tiếp từ DOM. Để hiểu chi tiết ta sẽ đi sâu hơn vào 2 lại component này.

### **4.1. Controlled component**

Đầu tiên tôi sẽ lấy một ví dụ về controlled component. Có thể bạn thấy ví dụ này sẽ rất quen thuộc bởi vì hầu hết đa số các trường hợp ta đều dùng controlled component

```js
class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    );
  }
}
```

Trong ví dụ trên bạn có thể thấy dữ liệu của form được lữu trữ/quản lí bởi state của component. Mỗi khi bạn thay đổi input thì handleNameChange được gọi và nó sẽ cập nhật giá trị mới cho state. Sau khi state thay đổi thì nó sẽ render lại form với giá trị tương ứng với giá trị của state.

### **4.2. Uncontrolled component**

Tiếp theo ta sẽ đến với uncontrolled component. Để viết một uncontrolled component khá đơn giản là bạn sẽ ko viết các event bắt sự kiện thay đổi input trong form mà bạn sẽ sử dụng một tham chiếu trực tiếp đến DOM. Dưới đây là một ví dụ đơn giản

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (event) => {
    alert("A name was submitted: " + this.input.value);
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => (this.input = input)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Trong ví dụ trên, ta đặt một biến tham chiếu là input tham chiếu đến DOM object. Khi cần lấy giá trị ta sẽ truy xuất giá trị thông qua tham chiếu này.

## **5. useEffect vs Life cycle**

### **5.1. Life cycle**

Life cycle của component trong reactjs là quá trình từ khi tạo ra, thay đổi và hủy bỏ component. Gồm 3 giai đoạn:

- Tạo ra (Mounting)
- Thay đổi (Updating)
- Hủy bỏ (UnMounting)

Trước đây chỉ có các class component mới có thể sử dụng được các life cycle của React như:

- componentWillMount
- componentDidMount
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- componentDidUpdate
- componentWillUnmount

### **5.2. useEffect**

useEffect Hook được dùng mục đích để quản lý vòng đời của một component. Chúng ta sử dụng hook này trong các function component thay thế các lifecycle trong class component (cơ bản là giống nhau).

Cú pháp của useEffect() cơ bản như sau:

```js
useEffect(effectFunction, arrayDependencies);
```

Trong đó:

- effectFunction: gọi là side-effect function, được dùng để thực hiện logic chương trình khi useEffect được gọi.
- arrayDependencies: mảng phụ thuộc, cơ bản là để bạn xác định khi nào thì hàm side-effect được gọi.

> React useEffect Hook: luôn luôn gọi

Hãy cùng xem xét ví dụ đầu tiên về cách sử dụng useEffect Hook của React. Trong đó, chúng ta truyền vào useEffect một hàm – hay gọi là side-effect function.

```js
const Toggler = ({ toggle, onToggle }) => {
  React.useEffect(() => {
    console.log("I run on every render: mount + update.");
  });

  return (
    <div>
      <button type="button" onClick={onToggle}>
        Toggle
      </button>

      {toggle && <div>Hello React</div>}
    </div>
  );
};
```

Đây là cách sử dụng đơn giản nhất. Trong đó, chúng ta chỉ truyền một đối số – là một hàm số. Hàm này sẽ được gọi mọi lúc – bất cứ khi nào component được render để hiển thị (bao gồm cả lúc update hoặc tạo mới component).

> React useEffect Hook: chỉ gọi lúc component được mount xong

Nếu bạn chỉ muốn chạy useEffect Hook duy nhất lúc component được mount (lần đầu tiên component hiển thị), bạn chỉ cần truyền vào mảng rỗng vào đối số thứ 2 của useEffect

```js
const Toggler = ({ toggle, onToggle }) => {
  React.useEffect(() => {
    console.log("I run only on the first render: mount.");
  }, []);

  return (
    <div>
      <button type="button" onClick={onToggle}>
        Toggle
      </button>

      {toggle && <div>Hello React</div>}
    </div>
  );
};
```

Tham số thứ hai – ở đây chúng ta truyền vào là mảng rỗng – gọi là dependency array. Nếu dependency array là rỗng, thì hàm side-effect trong đối số thứ nhất không có dependencies. Điều này có nghĩa là nó chỉ chạy duy nhất lần đầu tiên khi component hiển thị.

> React useEffect Hook: gọi khi update giá trị điều kiện

Trong trường hợp dependency array không phải là mảng rỗng thì sao?

Nếu mảng này có phần tử, mỗi khi giá trị của phần tử thay đổi, hàm side-effect sẽ được gọi.

```js
const Toggler = ({ toggle, onToggle }) => {
  React.useEffect(() => {
    console.log("I run only if toggle changes (and on mount).");
  }, [toggle]);

  return (
    <div>
      <button type="button" onClick={onToggle}>
        Toggle
      </button>

      {toggle && <div>Hello React</div>}
    </div>
  );
};
```

Như ví dụ trên, hàm side-effect để in ra màn hình console.log("...") sẽ được gọi khi biến toggle thay đổi giá trị. Tuy nhiên, bạn cũng cần phải lưu ý rằng, hàm side-effect cũng được gọi khi lần đầu tiên component hiển thị (khi component mount).

Ngoài ra, một điểm cũng cần lưu tâm, dependency array dù sao cũng là một mảng nên nó có thể chứa nhiều hơn một phần tử. Do vậy, bạn có thể thêm nhiều biến hơn vào mảng này, tùy vào mục đích của bạn.

```js
const Toggler = ({ toggle, onToggle }) => {
  const [title, setTitle] = React.useState("Hello React");

  React.useEffect(() => {
    console.log("I run if toggle or title change (and on mount).");
  }, [toggle, title]);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <input type="text" value={title} onChange={handleChange} />

      <button type="button" onClick={onToggle}>
        Toggle
      </button>

      {toggle && <div>{title}</div>}
    </div>
  );
};
```

> React useEffect Hook: UnMount
> Bạn đã biết cách sử dụng useEffect() khi một component mount xong. Vậy khi component chuẩn bị remove khỏi DOM thì sao?

Cùng xem ví dụ sau nhé:

```js
import * as React from "react";

const App = () => {
  const [timer, setTimer] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(
      () => setTimer((currentTimer) => currentTimer + 1),
      1000
    );

    return () => clearInterval(interval);
  }, []);

  return <div>{timer}</div>;
};

export default App;
```

Thực tế thì useEffect cho phép chúng ta return một function, function này sẽ thực thi trước khi mà component đó được unmounted.
