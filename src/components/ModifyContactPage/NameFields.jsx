function NameFields({
  setAddMode,
  editMode,
  setEditMode,
  uniqueName,
  contactName,
  edittedFirstName,
  edittedLastName,
  validateFirstName,
  validateSecondName,
  handleNameValidation,
}) {
  
  return (
    <>
      <div className="row mt-4">
        <div className="col-2 px-4">
          <button
            className="button-style large-text"
            type="button"
            onClick={() => {
              setAddMode(false);
              setEditMode(false);
            }}
          >
            Cancel
          </button>
        </div>
        <div className="col d-flex flex-column align-items-center">
          <p className="display-5">{editMode ? "Edit" : "New"} contact</p>
          <i className="fa-solid fa-user profile-pic p-5 fa-6x"></i>
          <p>Add photo</p>
        </div>
        <p className="col-2 px-4 d-flex"></p>
      </div>
      <div>
        <div className="row m-3">
          <div className="col">
            {!uniqueName ? (
              <p className="my-0 validation">This name has been taken!</p>
            ) : (
              <p className="dummy my-0"></p>
            )}
          </div>
        </div>
        <div className="row input-form p-2 m-3 px-4">
          <div className="col">
            <label className="mb-0 small-text" htmlFor="first-name">
              First name*
            </label>
            <input
              type="text"
              name="first_name"
              id="first-name"
              className="input-form x-large-text stretch-form"
              onChange={handleNameValidation}
              value={editMode ? edittedFirstName : contactName.first_name}
              required
            />
          </div>
          {!validateFirstName ? (
            <p className="validation">
              this field can't contain special character
            </p>
          ) : null}
        </div>
      </div>
      <div className="row input-form p-2 m-3 px-4">
        <div className="col">
          <label className="mb-0 small-text" htmlFor="last-name">
            Last name*
          </label>
          <input
            type="text"
            name="last_name"
            id="last-name"
            className="input-form x-large-text stretch-form"
            onChange={handleNameValidation}
            value={editMode ? edittedLastName : contactName.last_name}
            required
          />
        </div>
        {!validateSecondName ? (
          <p className="validation">
            this field can't contain special character
          </p>
        ) : null}
      </div>
    </>
  );
}
export default NameFields;
