function Pagination({ setPage, page, availableContact }) {
  return (
    <div className="row d-flex justify-content-center align-items-center button-style mt-4">
      <div className="col-auto">
        <button
          className={`button-style ${page === 1 ? "button-disabled" : ""}`}
          onClick={() => {
            setPage((e) => e - 1);
          }}
        >
          <i className="fa-solid fa-chevron-left mx-0 px-0"></i>
        </button>
      </div>
      <div className="col-auto mx-0 px-0">{page}</div>
      <div className="col-auto">
        <button
          className={`button-style ${
            page === Math.ceil(availableContact / 12) || availableContact <= 12
              ? "button-disabled"
              : ""
          }`}
          onClick={() => {
            setPage((e) => e + 1);
          }}
        >
          <i className="fa-solid fa-chevron-right mx-0 px-0"></i>
        </button>
      </div>
    </div>
  );
}
export default Pagination;
