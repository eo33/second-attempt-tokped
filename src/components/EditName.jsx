function EditName({
  showList,
  setShowList,
  setShowDetail,
  setEditMode,
  isFavorite,
  setIsFavorite,
  selectedContact,
}) {
  return (
    <div className="row m-lg-4 ">
      {/*Profile picture + name + edit and favorite*/}
      <div className="col p-5 pb-1 pt-3">
        <div className="row">
          <div className="col-2">
            {showList === false ? (
              <button
                className="button-style large-text"
                type="button"
                onClick={() => {
                  setShowList(true);
                  setShowDetail(false);
                }}
              >
                Back
              </button>
            ) : null}
          </div>
          <div className="col-8 d-flex justify-content-center align-items-center">
            <i class="fa-solid fa-user fa-10x contact-details-pic p-5"></i>
          </div>
          <div className="col-2 d-flex flex-column align-items-right justify-content-between button-style">
            <button
              className="row button-style"
              onClick={() => {
                setEditMode((true));
              }}
            >
              <div className="col d-flex justify-content-center">
                <i class="fa-solid fa-pen fa-2x"></i>
              </div>
              <div className={"col d-flex justify-content-center"}>Edit</div>
            </button>

            <button
              className="row button-style"
              onClick={() => {
                setIsFavorite((prevState) => ({
                  ...prevState,
                  [selectedContact.id]: !prevState[selectedContact.id],
                }));
              }}
            >
              <div className="col d-flex justify-content-center">
                <i
                  class={`${
                    isFavorite[selectedContact.id] ? "fa-solid" : "fa-regular"
                  } fa-star fa-2x`}
                ></i>
              </div>
              <div className="col d-flex justify-content-center">Favorites</div>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center mt-4">
            <p className="display-5 text-bold">
              {selectedContact.first_name + " " + selectedContact.last_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditName;
