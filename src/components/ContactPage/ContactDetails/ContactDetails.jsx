import "../../stylesheet.css";
import EditName from "./EditName";
import EditNumbers from "./EditNumbers";

function ContactDetails({
  selectedContact,
  editMode,
  setEditMode,
  isFavorite,
  setIsFavorite,
  showList,
  setShowList,
  setShowDetail,
}) {

  return (
    <div className="col-12 col-md-6 contact-details">
      <EditName
        showList={showList}
        setShowList={setShowList}
        setShowDetail={setShowDetail}
        setEditMode={setEditMode}
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
        selectedContact={selectedContact}
      />
      <EditNumbers
        selectedContact={selectedContact}
        editMode={editMode}
      />
    </div>
  );
}
export default ContactDetails;
