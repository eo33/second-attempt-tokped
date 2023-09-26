import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CONTACT_LIST } from "../../graphql/Queries";
import { DELETE_CONTACT_PHONE } from "../../graphql/Mutations";

import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Pagination from "./Pagination";
import ListOfContacts from "./ListOfContacts";
import ModifyContactPage from "../ModifyContactPage/ModifyContactPage";
import ContactDetails from "./ContactDetails/ContactDetails";

import "bootstrap/dist/css/bootstrap.css";
import "../stylesheet.css";

function ContactPage() {
  // init variables for main contact page
  const [contactMode, setContactMode] = useState("Contacts");
  const [contactList, setContactList] = useState([]);
  const [availableContact, setAvailableContact] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFavorite, setIsFavorite] = useState({});
  const [showFavorite, setShowFavorite] = useState(false);
  const [page, setPage] = useState(1);
  const [addMode, setAddMode] = useState(false);

  // init variables for contact details
  const [hover, setHover] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [edittedSelection, setEdittedSelection] = useState(null);
  const [showList, setShowList] = useState(true);
  const [showDetail, setShowDetail] = useState(true);

  // Load GraphQL query and mutations
  const { data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      where: {
        first_name: { _like: `%${searchQuery}%` },
      },
    },
  });
  const [deleteUser] = useMutation(DELETE_CONTACT_PHONE);

  // useEffect to adjust what is shwon on different screen (Responsive design)
  useEffect(() => {
    setShowDetail(window.innerWidth >= 768);
    window.addEventListener("resize", () =>
      setShowDetail(window.innerWidth >= 768)
    );
  }, []);

  // useEffect to update GraphQL data, and to remember selected contact after editting
  useEffect(() => {
    if (data) {
      setContactList(data.contact);
      if (!edittedSelection) {
        setSelectedContact(data.contact[0]);
      } else {
        const newSelectedContactIndex = data.contact.findIndex(
          (contactObj) => contactObj.id === edittedSelection
        );
        setSelectedContact(data.contact[newSelectedContactIndex]);
      }
    }
  }, [data, edittedSelection]);

  // useEffect to update favorite contact and pagination
  useEffect(() => {
    let newIsFavorite = { ...isFavorite };

    contactList.forEach((contact) => {
      if (!(contact.id in newIsFavorite)) {
        newIsFavorite[contact.id] = false;
      }
    });

    if (JSON.stringify(newIsFavorite) !== JSON.stringify(isFavorite)) {
      setIsFavorite(newIsFavorite);
    }
    // For pagination
    setAvailableContact(
      contactList.filter(
        (contact) =>
          isFavorite[contact.id] === showFavorite || contactMode === "Delete"
      ).length
    );
  }, [contactList, isFavorite, contactMode, showFavorite]);

  return (
    <>
      {addMode || editMode ? (
        <ModifyContactPage
          contactList={contactList}
          setEdittedSelection={setEdittedSelection}
          setAddMode={setAddMode}
          editMode={editMode}
          setEditMode={setEditMode}
          selectedContact={editMode ? selectedContact : {}}
        />
      ) : (
        <div className="row">
          <>
            {showList ? (
              <div className="col-12 col-md-6 contact-list">
                <Navbar
                  contactMode={contactMode}
                  setContactMode={setContactMode}
                  setShowFavorite={setShowFavorite}
                  setAddMode={setAddMode}
                  setPage={setPage}
                />
                <Searchbar setSearchQuery={setSearchQuery} setPage={setPage} />
                <ListOfContacts
                  contactList={contactList}
                  isFavorite={isFavorite}
                  showFavorite={showFavorite}
                  contactMode={contactMode}
                  hover={hover}
                  page={page}
                  deleteUser={deleteUser}
                  setHover={setHover}
                  selectedContact={selectedContact}
                  setSelectedContact={setSelectedContact}
                  showDetail={showDetail}
                  setShowDetail={setShowDetail}
                  setShowList={setShowList}
                  GET_CONTACT_LIST={GET_CONTACT_LIST}
                />
                <Pagination
                  page={page}
                  setPage={setPage}
                  availableContact={availableContact}
                />
              </div>
            ) : null}
          </>
          {selectedContact && showDetail ? (
            <ContactDetails
              selectedContact={selectedContact}
              contactList={contactList}
              setEditMode={setEditMode}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
              showList={showList}
              setShowList={setShowList}
              setShowDetail={setShowDetail}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export default ContactPage;