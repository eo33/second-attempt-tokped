import { useState } from "react";
import "../../stylesheet.css";
import EditName from "./EditName";
import EditNumbers from "./EditNumbers";

function ContactDetails({
  selectedContact,
  contactList,
  editMode,
  setEditMode,
  isFavorite,
  setIsFavorite,
  showList,
  setShowList,
  setShowDetail,
}) {
  const [multipleNumbers, setMultipleNumbers] = useState(false);
  //const [editMode, setEditMode] = useState(false);

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
        multipleNumbers={multipleNumbers}
        setMultipleNumbers={setMultipleNumbers}
        editMode={editMode}
      />
    </div>
  );
}
export default ContactDetails;
