const Search = ({ handleSearch }) => {
  return (
    <div className="input-group flex-nowrap">
      <input
        type="text"
        className="form-control"
        placeholder="Type here to search"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
