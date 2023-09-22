function Searchbar({ setSearchQuery, setPage }) {
  return (
    <div className="row mt-2 py-2 px-3">
      <div className="col search-bar d-flex align-items-center gap-2">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(event) => {
            event.preventDefault();
            setSearchQuery(event.target.value);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
export default Searchbar;
