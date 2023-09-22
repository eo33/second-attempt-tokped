function NumberFields({
  editMode,
  selectedContact,
  primaryNumber,
  setPrimaryNumber,
  showMultipleNumbers,
  setShowMultipleNumbers,
  edittedMainPhone,
  setEdittedMainPhone,
  edittedSecondaryPhone,
  setEdittedSecondaryPhone,
}) {
  return (
    <>
      {editMode ? (
        <>
          {selectedContact.phones.map((phone, index) =>
            index === 0 || showMultipleNumbers ? (
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
                      value={
                        index === 0
                          ? edittedMainPhone
                          : edittedSecondaryPhone[index - 1]
                      }
                      onChange={
                        index === 0
                          ? (e) => setEdittedMainPhone(e.target.value)
                          : (e) =>
                              setEdittedSecondaryPhone((prevState) => {
                                const updatedNumbers = [...prevState];
                                updatedNumbers[index - 1] = e.target.value;
                                return updatedNumbers;
                              })
                      }
                    />
                  </div>
                </div>
              </>
            ) : null
          )}

          {editMode && selectedContact.phones.length > 1 ? (
            <div className="row p-2 m-3 px-4">
              <div className="col d-flex justify-content-end">
                <button
                  className="button-style"
                  type="button"
                  onClick={() => setShowMultipleNumbers((e) => !e)}
                >
                  {showMultipleNumbers ? "Hide" : "Show"} secondary numbers
                </button>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="row input-form p-2 m-3 px-4">
          <div className="col">
            <label className="mb-0 small-text" htmlFor="phone-number">
              Phone number*
            </label>
            <input
              type="tel"
              name="phones[number]"
              id="phone-number"
              className="input-form x-large-text stretch-form"
              onChange={(e) => setPrimaryNumber(e.target.value)}
              value={primaryNumber}
              required
            />
          </div>
        </div>
      )}
    </>
  );
}
export default NumberFields;
