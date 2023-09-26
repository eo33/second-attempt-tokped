function ListOfContacts({
  contactList,
  isFavorite,
  showFavorite,
  contactMode,
  hover,
  page,
  deleteUser,
  setHover,
  selectedContact,
  setSelectedContact,
  showDetail,
  setShowDetail,
  setShowList,
  setModifySelectedID,
  GET_CONTACT_LIST,
}) {
  return (
    <>
      {
        // Logic: filter when it is in favorite, or when it is in delete mode. Also, only print 12 contacts
        contactList
          .filter(
            (contact) =>
              isFavorite[contact.id] === showFavorite ||
              contactMode === "Delete"
          )
          .slice((page - 1) * 12, page * 12)
          .map((contact) => (
            <>
              <div
                className={`row contact-list mt-0 border-top pt-2 
                ${hover === contact.id ? "hovered" : ""}
                ${selectedContact.id === contact.id ? "hovered" : ""}
                `}
                onMouseEnter={() => setHover(contact.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => {
                  setSelectedContact(contact);
                  if (showDetail === false) {
                    setShowDetail(true);
                    setShowList(false);
                  }
                }}
              >
                <div className="col-2 col-lg-1">
                  {/*Profile picture*/}
                  <i class="fa-solid fa-user profile-pic p-2 fa-2x"></i>
                </div>
                <div className="col mx-lg-2">
                  <div className="row full-name">
                    {/*First name + last name*/}
                    <div className="col">
                      {contact.first_name + " " + contact.last_name}
                    </div>
                  </div>
                  <div className="row phone-number">
                    {/*Phone number*/}
                    <div className="col">
                      {contact.phones[0] !== undefined
                        ? contact.phones[0].number
                        : null}
                    </div>
                  </div>
                </div>
                <div className="col favorite d-flex justify-content-end align-items-center">
                  {/*When user click on button set isFav to true for that ID. Only show when it is not in delete mode*/}
                  {contactMode === "Delete" ? (
                    <button
                      className="button-style"
                      type="button"
                      onClick={() => {
                        // Delete from Apollo
                        deleteUser({
                          variables: {
                            id: contact.id,
                          },
                          refetchQueries: [GET_CONTACT_LIST],
                          awaitRefetchQueries: true,
                        });
                        // Reset selection
                        setModifySelectedID(null)
                      }}
                    >
                      <i className="button-style fa-solid fa-trash fa-2x"></i>
                    </button>
                  ) : null}
                </div>
              </div>
            </>
          ))
      }
    </>
  );
}
export default ListOfContacts;
