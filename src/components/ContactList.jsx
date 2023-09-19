import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {GET_CONTACT_LIST} from '../graphql/Queries'
import {DELETE_CONTACT_PHONE} from '../graphql/Mutations'
import AddContact from './AddContact';
import ContactDetails from './ContactDetails';
import 'bootstrap/dist/css/bootstrap.css';
import "./stylesheet.css"

function ContactList() {
  // init variables
  const [contactMode, setContactMode] = useState('Contacts');
  const [contactList, setContactList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFavorite, setIsFavorite] = useState({});
  const [showFavorite, setShowFavorite] = useState(false);
  const [page,setPage] = useState(1);
  const [addMode, setAddMode] = useState(false);
  // Variables for contact details
  const [hover,setHover] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)
  const [editMode, setEditMode] = useState(false);

  // event handler functions
  const handleAddMode = (value) => {
    setAddMode(value)
  }

  const handleEditMode = (value) => {
    setEditMode(value)
  }
  
  // Load GraphQL query
  const {data} = useQuery(GET_CONTACT_LIST,{
    variables: {
        "where":{
            first_name: {"_like": `%${searchQuery}%`}
        }
    },
    skip: false,
  })

  // Load GraphQL mutations
  const [deleteUser] = useMutation(DELETE_CONTACT_PHONE);

  // Store and fetch data whenever theres an update 
  useEffect(()=>{
    if(data){
        setContactList(data.contact)
        setSelectedContact(data.contact[0])
    }
    },[data])

    // Update isFavorite to keep in sync with contactList
    useEffect(() => {
        // Calculate the new isFavorite object without modifying the existing one
        let newIsFavorite = { ...isFavorite };
      
        // Iterate through contactList and update isFavorite if necessary
        contactList.forEach((contact) => {
          if (!(contact.id in newIsFavorite)) {
            newIsFavorite[contact.id] = false;
          }
        });
      
        // Update isFavorite only if it has changed
        if (JSON.stringify(newIsFavorite) !== JSON.stringify(isFavorite)) {
          setIsFavorite(newIsFavorite);
        }
        
      }, [contactList, isFavorite]);      

  // Count how many contacts available, for pagination
  const availableContact = contactList.filter((contact) =>(isFavorite[contact.id] === showFavorite) || (contactMode === 'Delete')).length

  return (
    <>
        {addMode || editMode ? <AddContact contactList={contactList} setSelectedContact={setSelectedContact} handleAddMode={handleAddMode} editMode={editMode} handleEditMode={handleEditMode} selectedContact={editMode ? selectedContact : {}}/> :
            <div className='row'>
                <div className='col-12 col-md-6 contact-list'>
                    <div>
                        {/**CONTACTS NAVBAR */}
                        <div className="row mt-1">
                            <h2 className="col display-5 d-flex align-items-center mt-2 text-bold">
                                {contactMode}
                            </h2>                
                            <div className="col d-flex justify-content-end align-items-center mx-0 px-0 mt-3">
                                {contactMode === "Contacts" ? 
                                    <>
                                        <button 
                                            className='d-flex flex-column align-items-center button-style px-2' 
                                            onClick={()=>{
                                                setContactMode('Favorites')
                                                setShowFavorite(true)
                                            }}>
                                            <i class="fa-solid fa-star fa-2x"></i>
                                            <span>Fav</span>
                                        </button>

                                        <button 
                                            className='d-flex flex-column align-items-center button-style px-2'
                                            onClick={()=>{setAddMode(true)}}
                                        >
                                            <i className="fa-solid fa-plus fa-2x"></i>
                                            <span>Add</span>
                                        </button>

                                        <button 
                                            className='d-flex flex-column align-items-center button-style px-2' 
                                            onClick={()=>setContactMode('Delete')}
                                        >
                                            <i className="fa-solid fa-trash fa-2x"></i>
                                            <span>Delete</span>
                                        </button> 
                                    </>: 
                                    <>
                                        <button 
                                            className='d-flex flex-column align-items-center button-style px-2'
                                            onClick={()=>{
                                                setContactMode('Contacts')
                                                setShowFavorite(false)
                                            }}
                                        >
                                            <i class="fa-solid fa-arrow-rotate-left fa-2x"></i>
                                            <span>Back</span>
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                        {/**SEARCHBAR */}
                        <div className="row mt-2 py-2 px-3">
                            <div className="col search-bar d-flex align-items-center gap-2">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input 
                                type="text" 
                                placeholder="Search" 
                                aria-label="Search"
                                onChange={event=>{
                                    event.preventDefault();
                                    setSearchQuery(event.target.value)
                                    setPage(1)
                                }}
                            />
                            </div>      
                        </div>
                        {/**CONTACTLIST */}
                        {
                            // Logic: filter when it is in favorite, or when it is in delete mode. Also, only print 10 contacts
                            contactList
                                .filter(contact => (isFavorite[contact.id] === showFavorite) || (contactMode==="Delete"))
                                .slice((page-1)*12,page*12)
                                .map(contact=>(
                                <>
                                    <div 
                                        className= {`row contact-list mt-0 border-top pt-2 ${hover === contact.id ? "hovered" : ""}`}
                                        onMouseEnter={()=>setHover(contact.id)}
                                        onMouseLeave={()=>setHover(null)}
                                        onClick={()=>setSelectedContact(contact)}
                                    >
                                        <div className="col-2 col-lg-1">
                                            {/*Profile picture*/}
                                            <i class="fa-solid fa-user profile-pic p-2 fa-2x"></i>
                                        </div>
                                        <div className="col mx-lg-2">
                                            <div className="row full-name">
                                                {/*First name + last name*/}
                                                <div className="col">
                                                {contact.first_name+' '+contact.last_name}
                                                </div>
                                            </div>
                                            <div className="row phone-number">
                                                {/*Phone number*/}
                                                <div className="col">
                                                {contact.phones[0] !== undefined ? contact.phones[0].number : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col favorite d-flex justify-content-end align-items-center">
                                        {/*When user click on button set isFav to true for that ID. Only show when it is not in delete mode*/}

                                        {
                                            contactMode === 'Delete' ? 
                                                <button 
                                                    className='button-style' 
                                                    type='button'
                                                    onClick={()=>{
                                                        // Delete from Apollo
                                                        deleteUser({
                                                            variables: {
                                                                "id": contact.id
                                                            },
                                                            refetchQueries: [GET_CONTACT_LIST],
                                                            awaitRefetchQueries:true,
                                                        })
                                                    }}
                                                >
                                                    <i className="button-style fa-solid fa-trash fa-2x"></i>
                                                </button> : null
                                            }
                                        </div>
                                    </div> 
                                </>
                            ))
                        }
                        {/**Pagination*/}
                        <div className="row d-flex justify-content-center align-items-center button-style mt-4">
                            <div className="col-auto">
                            <button 
                                className={`button-style ${page === 1? "button-disabled": ""}`}
                                onClick={()=>{setPage(e=>e-1)}}
                                >
                                <i className="fa-solid fa-chevron-left mx-0 px-0"></i>
                            </button>
                            </div>
                            <div className="col-auto mx-0 px-0">{page}</div>
                            <div className="col-auto">
                            <button 
                                className={`button-style ${page === Math.ceil(availableContact/12) ? "button-disabled": ""}`}
                                onClick={()=>{setPage(e=>e+1)}}
                                >
                                <i className="fa-solid fa-chevron-right mx-0 px-0"></i>
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                {selectedContact ? 
                    <ContactDetails 
                        selectedContact={selectedContact} 
                        contactList={contactList} 
                        handleEditMode={handleEditMode} 
                        isFavorite={isFavorite}
                        setIsFavorite={setIsFavorite}
                    /> : null}
            </div>
        }
    </>
  )
}
export default ContactList