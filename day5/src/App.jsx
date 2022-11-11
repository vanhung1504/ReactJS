import { useEffect, useState } from "react";
import Search from "./components/search/Search";
import HitList from "./components/hit-list/HitList";
import { useGetNews } from "./hooks/useGetNews";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const { hits, page, totalPage, nextPage, prevPage, loading } =
    useGetNews(searchValue);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center text-primary">Search Hacker News</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12 text-center">
          <button type="button" className="btn btn-info" onClick={prevPage}>
            Prev
          </button>
          <span className="mx-3">
            {page + 1} of {totalPage}
          </span>

          <button type="button" className="btn btn-info" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>

      <div className="row my-3">
        {loading ? (
          <div className="col-12 mt-5 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        ) : (
          <HitList hits={hits} />
        )}
      </div>
    </div>
  );
}

export default App;
