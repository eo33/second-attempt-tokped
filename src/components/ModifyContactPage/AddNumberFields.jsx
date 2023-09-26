function AddNumberFields({
  secondaryNumbers,
  setSecondaryNumbers,
  validateFirstName,
  validateSecondName,
  uniqueName,
}) {

  const updateSecondaryNumber = (index, value) => {
    const updatedSecondaryNumbers = [...secondaryNumbers];
    updatedSecondaryNumbers[index] = value;
    setSecondaryNumbers(updatedSecondaryNumbers);
  };

  return (
    <>
      {/* Secondary numbers */}
      {secondaryNumbers.map((number, index) => (
        <div className="row input-form p-2 m-3 px-4" key={index}>
          <div className="col">
            <label
              className="mb-0 small-text"
              htmlFor={`secondary-number-${index}`}
            >
              Secondary Phone number {index + 1}*
            </label>
            <input
              type="tel"
              name={`secondary_phones[${index}]`}
              id={`secondary-number-${index}`}
              className="input-form x-large-text stretch-form"
              required
              onChange={(e) => updateSecondaryNumber(index, e.target.value)}
            />
          </div>
          <div className="col-1 d-flex align-items-center justify-content-center">
            <button
              className="button-style"
              type="button"
              onClick={() =>
                setSecondaryNumbers((prev) =>
                  prev.filter((_, i) => i !== index)
                )
              }
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      ))}

      <div className="row p-2 m-3 px-4">
        <div className="col d-flex justify-content-end">
          <button
            className="button-style"
            type="button"
            onClick={() => setSecondaryNumbers([...secondaryNumbers, ""])}
          >
            Add a new number
          </button>
        </div>
      </div>

      <div className="row px-4 mt-auto">
        <div className="col d-flex flex-column align-items-end justify-content-end">
          <button
            type="submit"
            className={`button-style ${
              !validateFirstName || !validateSecondName || !uniqueName
                ? "not-valid"
                : ""
            }`}
          >
            <i className="fa-solid fa-paper-plane fa-2x"></i>
            <p>submit</p>
          </button>
        </div>
      </div>
    </>
  );
}
export default AddNumberFields;
