import { useState } from "react";

function EditNumbers({
  selectedContact,
  editMode
}) {
  const [multipleNumbers, setMultipleNumbers] = useState(false);

  return (
    <>
      {selectedContact.phones.map((phone, index) =>
        index === 0 || multipleNumbers ? (
          <>
            <div className="row input-form p-2 m-3 px-4">
              {/**Number */}
              <div className="col">
                <label className="mb-0 small-text" htmlFor="first-name">
                  Phone number {index + 1}
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first-name"
                  className={`input-form x-large-text stretch-form ${
                    editMode ? "form-disabled" : ""
                  }`}
                  required
                  value={phone.number}
                />
              </div>
            </div>
          </>
        ) : null
      )}
      {selectedContact.phones.length > 1 ? (
        <div className="row p-2 m-3 px-4">
          <div className="col d-flex justify-content-end">
            <button
              className="button-style"
              type="button"
              onClick={() => setMultipleNumbers((e) => !e)}
            >
              {multipleNumbers ? "Hide" : "Show"} secondary numbers
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default EditNumbers;
