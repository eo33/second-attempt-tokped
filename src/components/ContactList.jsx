import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {GET_CONTACT_LIST} from '../graphql/Queries'
import {DELETE_CONTACT_PHONE} from '../graphql/Mutations'
import AddContact from './AddContact';
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

  // event handler functions
  const handleAddMode = (value) => {
    setAddMode(value)
  }
  
  // Load GraphQL query
  const {data,refetch} = useQuery(GET_CONTACT_LIST,{
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
        let favCount = Object.keys(isFavorite).length
       
        // Check if isFavorite is already populated. If not, initialize to false
        if( favCount === 0){
                let result = {}
                data.contact.forEach(contact=>{
                    result[contact.id] = false;
                })
                setIsFavorite(result)
            } 
        }
    },[data,addMode,isFavorite])

    // Update isFavorite to keep in sync with contactList
    useEffect(()=>{
        let favCount = Object.keys(isFavorite).length
        let contactCount = contactList.length
        if(contactCount > favCount){
            let newID = {...isFavorite};
            for(let contact of contactList){
                // If contact id not in newID, add it
                if(!(contact.id in newID)){
                    newID[contact.id] = false
                }
            }
            setIsFavorite(newID)
        } else {
            // Create a brand new fav list
            let newID = {}
            contactList.forEach(contact=>newID[contact.id] = false)
            // Update the new fav list based on previous favorite
            for(let id in isFavorite){
                if(id in newID){
                    newID[id] = isFavorite[id]
                }
            }
            setIsFavorite(newID)
        }
    }, [contactList])

  // Count how many contacts available, for pagination
  const availableContact = contactList.filter((contact) =>(isFavorite[contact.id] === showFavorite) || (contactMode === 'Delete')).length

  return (
    <>
        {addMode ? <AddContact contactList={contactList} addMode={addMode} refetch={refetch} handleAddMode={handleAddMode} /> :
            <div>
                <div className='col-12 contact-list'>
                <div className="row mt-1">
                    <h2 className="col display-4 d-flex align-items-center mt-2">
                    {contactMode}
                    </h2>                
                    <div className="col d-flex justify-content-end align-items-center mx-0 px-0 mt-3">
                        {contactMode === "Contacts" ? 
                            <>
                                <button 
                                    className='d-flex flex-column align-items-center button-style px-2' 
                                    onClick={()=>{
                                        setContactMode('Favorite')
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
                <div className="row mt-3">
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
                </div>
                {
                    // Filter when it is in favorite, or when it is in delete mode. Also, only print 10 contacts
                    //.filter(contact => (isFavorite[contact.id] === showFavorite) || (contactMode==="Delete"))
                    contactList
                        .filter(contact => (isFavorite[contact.id] === showFavorite) || (contactMode==="Delete"))
                        .slice((page-1)*10,page*10)
                        .map(contact=>(
                        <>
                            <div className="row contact-list mt-4">
                                <div className="col-2 col-md-1">
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
                                { contactMode !== "Delete" ? 
                                    <>
                                        <button 
                                            className='button-style' 
                                            type='button'
                                            onClick={()=>{
                                                setIsFavorite( (prevState) => ({
                                                    ...prevState,
                                                    [contact.id]: !prevState[contact.id]
                                                }))
                                            }}
                                        >
                                            <i className={`button-style fa-star fa-2x ${isFavorite[contact.id] ? "fa-solid" : "fa-regular"}`}></i>
                                        </button>
                                    </>:null
                                }
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
                        className={`button-style ${page === 1 ? "button-disabled": ""}`}
                        onClick={()=>{setPage(e=>e-1)}}
                        >
                        <i className="fa-solid fa-chevron-left mx-0 px-0"></i>
                    </button>
                    </div>
                    <div className="col-auto mx-0 px-0">{page}</div>
                    <div className="col-auto">
                    <button 
                        className={`button-style ${page === Math.ceil(availableContact/10) ? "button-disabled": ""}`}
                        onClick={()=>{setPage(e=>e+1)}}
                        >
                        <i className="fa-solid fa-chevron-right mx-0 px-0"></i>
                    </button>
                    </div>
                </div>
            </div>
        }
    </>
  )
}
export default ContactList