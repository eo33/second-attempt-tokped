function Navbar({ contactMode, setContactMode, setShowFavorite, setAddMode, setPage, setModifySelectedID }) {
  return (
    <>
      <div className="row mt-1">
        <h2 className="col display-5 d-flex align-items-center mt-2 text-bold">
          {contactMode}
        </h2>
        <div className="col d-flex justify-content-end align-items-center mx-0 px-0 mt-3">
          {contactMode === "Contacts" ? (
            <>
              <button
                className="d-flex flex-column align-items-center button-style px-2"
                onClick={() => {
                  setContactMode("Favorites");
                  setShowFavorite(true);
                  setModifySelectedID(null)
                  setPage(1)
                }}
              >
                <i class="fa-solid fa-star fa-2x"></i>
                <span>Fav</span>
              </button>

              <button
                className="d-flex flex-column align-items-center button-style px-2"
                onClick={() => {
                  setAddMode(true);
                }}
              >
                <i className="fa-solid fa-plus fa-2x"></i>
                <span>Add</span>
              </button>

              <button
                className="d-flex flex-column align-items-center button-style px-2"
                onClick={() => setContactMode("Delete")}
              >
                <i className="fa-solid fa-trash fa-2x"></i>
                <span>Delete</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="d-flex flex-column align-items-center button-style px-2"
                onClick={() => {
                  setContactMode("Contacts");
                  setShowFavorite(false);
                  setModifySelectedID(null)
                  setPage(1)
                }}
              >
                <i class="fa-solid fa-arrow-rotate-left fa-2x"></i>
                <span>Back</span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Navbar;
