import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import {
  ADD_CONTACT_WITH_PHONES,
  EDIT_CONTACT,
  EDIT_PHONE_NUMBER,
  ADD_NUMBER_TO_CONTACT,
} from "../../graphql/Mutations";
import { GET_CONTACT_LIST } from "../../graphql/Queries"

import NameFields from "./NameFields";
import NumberFields from "./NumberFields";
import AddNumberFields from "./AddNumberFields";

function ModifyContactPage({
  contactList,
  setEdittedSelection,
  setAddMode,
  editMode,
  setEditMode,
  selectedContact,
}) {
  // Variables for adding contact
  const [contactName, setContactName] = useState({first_name: "", last_name: "",});
  const [primaryNumber, setPrimaryNumber] = useState("");
  const [secondaryNumbers, setSecondaryNumbers] = useState([]);

  // Variables for editing contact
  const [edittedFirstName, setEdittedFirstName] = useState(selectedContact.first_name);
  const [edittedLastName, setEdittedLastName] = useState(selectedContact.last_name);
  const [showMultipleNumbers, setShowMultipleNumbers] = useState(false);
  const initialMainPhone = selectedContact.phones && selectedContact.phones[0] ? selectedContact.phones[0].number : "";
  const [edittedMainPhone, setEdittedMainPhone] = useState(initialMainPhone);
  const initialSecondaryPhone = selectedContact.phones && selectedContact.phones[1] ? selectedContact.phones.slice(1) : [];
  const [edittedSecondaryPhone, setEdittedSecondaryPhone] = useState(initialSecondaryPhone.map((e) => e.number)  );

  // Variables for validation
  const [validateFirstName, setValidateFirstName] = useState(true);
  const [validateSecondName, setValidateSecondName] = useState(true);
  const [uniqueName, setUniqueName] = useState(true);

  // GraphQL Mutations
  const [createUser] = useMutation(ADD_CONTACT_WITH_PHONES);
  const [editUser] = useMutation(EDIT_CONTACT);
  const [editNumber] = useMutation(EDIT_PHONE_NUMBER);
  const [addNumber] = useMutation(ADD_NUMBER_TO_CONTACT);

  // UseEffect to check if name is unique (Validation). 
  useEffect(() => {
    const listOfNames = contactList.map((contact) => contact.first_name + contact.last_name);
    let currentName = editMode ? edittedFirstName + edittedLastName : contactName.first_name + contactName.last_name;
    //If on edit mode, drop the current selected name from the list to check
    if (editMode) {
      const currentNameIndex = listOfNames.indexOf(selectedContact.first_name + selectedContact.last_name);
      if (currentNameIndex !== -1) {
        listOfNames.splice(currentNameIndex, 1);
      }
    }

    if (listOfNames.includes(currentName)) {
      setUniqueName(false);
    } else {
      setUniqueName(true);
    }
  }, [
    contactName,
    contactList,
    editMode,
    selectedContact,
    edittedFirstName,
    edittedLastName,
  ]);

  // Handle name inputs with validation
  // This handler is called whenever a user enters an input in the name fields
  const handleNameValidation = (e) => {
    const specialCharacter = /[^a-zA-Z]/g;
    const name = e.target.value;
    // Validate special characters for both editMode and addMode
    if (e.target.id === "first-name") {
      name.match(specialCharacter)
        ? setValidateFirstName(false)
        : setValidateFirstName(true);
    } else{
      name.match(specialCharacter)
        ? setValidateSecondName(false)
        : setValidateSecondName(true);
    }
    // Update contact name based on whether its editMode or addMode
    if (editMode) {
      if (e.target.id === "first-name") {
        setEdittedFirstName(e.target.value);
      } else {
        setEdittedLastName(e.target.value);
      }
    } else {
      setContactName({ ...contactName, [e.target.name]: e.target.value });
    }
  };


  // Handle ADD_CONTACT_WITH_PHONES
  // This mutation is sent when user tries to add a contact in add mode
  const handleAddSubmit = () => {
    const phones = [primaryNumber, ...secondaryNumbers];
    const newUser = {
      ...contactName,
      phones: phones.map((number) => ({ number })),
    };
    createUser({
      variables: newUser,
      refetchQueries: [GET_CONTACT_LIST],
      awaitRefetchQueries: true,
    });

    setAddMode(false);
    setEditMode(false);
  };

  // Handle EDIT_CONTACT, EDIT_PHONE_NUMBER, ADD_NUMBER_TO_CONTACT mutations
  // These mutations are sent when user tries to edit a contact in edit mode
  const handleEditSubmit = () => {
    // Change name
    const editName = async () => {
      const newEdittedName = {
        first_name: edittedFirstName,
        last_name: edittedLastName,
      };
      await editUser({
        variables: {
          id: selectedContact.id,
          _set: newEdittedName,
        },
      });
    };
    // Change phone (check primary)
    const editPrimaryPhone = async () => {
      const firstNumber = selectedContact.phones[0].number || "";
      await editNumber({
        variables: {
          pk_columns: {
            number: firstNumber,
            contact_id: selectedContact.id,
          },
          new_phone_number: edittedMainPhone,
        },
        refetchQueries: [GET_CONTACT_LIST],
        awaitRefetchQueries: true,
      });
    };
    // Change secondary phones
    const editSecondaryPhones = async () => {
      const secondaryNumbersSelected =
        selectedContact.phones.slice(1).map((e) => e.number) || [];

      for (let i = 0; i < secondaryNumbersSelected.length; i++) {
        await editNumber({
          variables: {
            pk_columns: {
              number: secondaryNumbersSelected[i],
              contact_id: selectedContact.id,
            },
            new_phone_number: edittedSecondaryPhone[i],
          },
          refetchQueries: [GET_CONTACT_LIST],
          awaitRefetchQueries: true,
        });
      }
    };

    // Add new phone
    const addNewPhones = async () => {
      for (let newNumber of secondaryNumbers) {
        if (newNumber !== "") {
          await addNumber({
            variables: {
              contact_id: selectedContact.id,
              phone_number: newNumber,
            },
            refetchQueries: [GET_CONTACT_LIST],
            awaitRefetchQueries: true,
          });
        }
      }
    };

    // Call chain of async events
    editName()
      .then(editPrimaryPhone)
      .then(editSecondaryPhones)
      .then(addNewPhones)
      .catch((error) => {
        console.error("Error", error);
      });

    setEdittedSelection(selectedContact.id);
    setAddMode(false);
    setEditMode(false);
  };

  return (
    <div className="row">
      <form
        className="col-md-8 add-contact d-flex flex-column offset-md-2 border rounded"
        onSubmit={editMode ? handleEditSubmit : handleAddSubmit}
      >
        <NameFields
          setAddMode={setAddMode}
          editMode={editMode}
          setEditMode={setEditMode}
          uniqueName={uniqueName}
          contactName={contactName}
          edittedFirstName={edittedFirstName}
          edittedLastName={edittedLastName}
          validateFirstName={validateFirstName}
          validateSecondName={validateSecondName}
          handleNameValidation={handleNameValidation}
        />
        <NumberFields
          editMode={editMode}
          selectedContact={selectedContact}
          primaryNumber={primaryNumber}
          setPrimaryNumber={setPrimaryNumber}
          showMultipleNumbers={showMultipleNumbers}
          setShowMultipleNumbers={setShowMultipleNumbers}
          edittedMainPhone={edittedMainPhone}
          setEdittedMainPhone={setEdittedMainPhone}
          edittedSecondaryPhone={edittedSecondaryPhone}
          setEdittedSecondaryPhone={setEdittedSecondaryPhone}
        />
        <AddNumberFields
          secondaryNumbers={secondaryNumbers}
          setSecondaryNumbers={setSecondaryNumbers}
          validateFirstName={validateFirstName}
          validateSecondName={validateSecondName}
          uniqueName={uniqueName}
        />
      </form>
    </div>
  );
}
export default ModifyContactPage;
