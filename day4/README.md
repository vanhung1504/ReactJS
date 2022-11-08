## **1. Optimistic Vs Pessimistic update**

Trong react, chúng ta thường phải đối mặt với các hoạt động CRUD trên state của chúng ta và state trên máy chủ.

```js
const [posts, setPosts] = useState([
  { post1 },
  { post2 },
  { post3 },
  { post4 },
]);
const handleDelete = async (postObj) => {
  await axios.delete(apiEndpoint + "/" + postObj.id);

  const Filteredposts = posts.filter((post) => post.id !== postObj.id);
  setPosts(filteredPosts);
};
```

Trong đoạn mã trên, trước tiên chúng ta xóa khỏi máy chủ sau đó cập nhật trạng thái của chúng ta, nếu xảy ra lỗi khi chúng ta xóa khỏi máy chủ, phần còn lại của hàm sẽ không được thực thi, đây là những gì chúng ta gọi là cập nhật bi quan (Pessimistic update).

Tuy nhiên, cập nhật lạc quan (Optimistic update) thì ngược lại ở đây sẽ đồng ý rằng một lệnh gọi đến máy chủ sẽ luôn hoạt động vì vậy chúng ta cập nhật trạng thái của mình trước rồi mới gọi máy chủ. Mặc dù cuộc gọi đến máy chủ cần có thời gian Optimistic update khiến người dùng ảo tưởng về một ứng dụng nhanh vì chúng ta cập nhật trạng thái đầu tiên sau đó mới gọi máy chủ.

**Điều gì xảy ra nếu có sự cố?**

Đây là lúc chúng ta sử dụng khối try catch của mình, chúng ta lưu trữ giá trị ban đầu của trạng thái trong biến sau đó cố gắng gọi máy chủ, nếu nó vượt qua trạng thái cập nhật là phù hợp. Còn nếu không (catch) chúng ta sẽ đưa trạng thái trở lại giá trị ban đầu.

```js
//THIS IS HOW WE IMPLEMENT OPTIMISTIC UPDATE
const handleDelete = async (postObj) => {
  const OrginalPosts = posts; //from the state
  const Filteredposts = posts.filter((post) => post.id !== postObj.id);
  setPosts(filteredPosts);
  try {
    await axios.delete(apiEndpoint + "/" + postObj.id);
  } catch (ex) {
    setPosts(OrginalPosts);
  }
};
```

## **2. Context là gì?**

Context cung cấp một cách để truyền dữ liệu qua các component mà không cần phải chuyển các props xuống.

Trong một ứng dụng React điển hình, dữ liệu được truyền từ trên xuống (từ mẹ đến con) thông qua các props, nhưng việc sử dụng như vậy có thể phức tạp đối với một số loại props nhất định. Context cung cấp một cách để chia sẻ các giá trị như thế này giữa các component mà không cần phải chuyển props qua các component.

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

## **3. Tìm nạp dữ liệu với useEffect**

Chưa hiểu đề @@

## **4. Custom Hook là gì ?**

Custom hooks là việc các bạn tự tạo ra một hook mới với chức năng riêng biệt của nó. Việc này giúp tách phần code logic ra khỏi UI giúp code tường minh, dễ quản lý hơn, tránh lặp lại code và tái sử dụng.

Ví dụ khi bạn không dùng custom hook:

```js
import { useState, useEffect } from "react";
import Sidebar from "components/Sidebar";

const App = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handler = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return <>{width >= 1024 && <Sidebar />}</>;
};
```

và bây giờ nếu bạn muốn dùng window width ở component khác thì phải lặp lại phần code trên. Đây là lúc custom hooks phát huy tác dụng.

Cùng tạo tạo ra hook useWindowSize để giải quyết vấn đề trên nào.

```js
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return windowSize;
};
```

Và đây là thành quả của chúng ta, bạn có thể sử dụng hook useWindowSize ở bất kì component nào.

```js
import { useWindowSize } from "hooks";

const App = () => {
  const { width, height } = useWindowSize();

  return <>{width >= 1024 && <Sidebar />}</>;
};
```
