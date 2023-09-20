import {useState} from 'react';
import "./stylesheet.css"

function ContactDetails({selectedContact,contactList, handleEditMode, isFavorite, setIsFavorite, showList,setShowList,setShowDetail}) {
  const [multipleNumbers, setMultipleNumbers] = useState(false)
  const [editMode, setEditMode] = useState(false)
  
  return (
    <div className='col-12 col-md-6 contact-details'>
        <div className="row m-lg-4 ">
            {/*Profile picture + name + edit and favorite*/}
            <div className="col p-5 pb-1 pt-3">
                <div className="row">
                    <div className="col-2">
                        {showList === false ?
                            <button 
                                className="button-style large-text" 
                                type="button" 
                                onClick={()=>{
                                    setShowList(true);
                                    setShowDetail(false);
                                }}
                            >
                                Back
                            </button> : null
                        }
                    </div>
                    <div className="col-8 d-flex justify-content-center align-items-center">
                        <i class="fa-solid fa-user fa-10x contact-details-pic p-5"></i>
                    </div>
                    <div className="col-2 d-flex flex-column align-items-right justify-content-between button-style">
                        <button 
                            className="row button-style"
                            onClick={()=>{
                                setEditMode(e=>!e)
                                handleEditMode(true)
                            }}
                        >
                            <div className="col d-flex justify-content-center">
                                <i class="fa-solid fa-pen fa-2x"></i>
                            </div>
                            <div className={"col d-flex justify-content-center"}>
                                Edit
                            </div>
                        </button>
                        
                        <button 
                            className="row button-style" 
                            onClick={()=>{
                                setIsFavorite( (prevState) => ({
                                    ...prevState,
                                    [selectedContact.id]: !prevState[selectedContact.id]
                                }))
                            }}
                        >
                            <div className="col d-flex justify-content-center">
                                <i class={`${isFavorite[selectedContact.id] ? "fa-solid" : "fa-regular"} fa-star fa-2x`}></i>
                            </div>
                            <div className="col d-flex justify-content-center">
                                Favorites
                            </div>
                        </button>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center mt-4">
                        <p className="display-5 text-bold">
                            {selectedContact.first_name + " " +selectedContact.last_name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        {
            selectedContact.phones.map((phone,index)=>(
                (index === 0 || multipleNumbers) ?
                    <>
                        <div className="row input-form p-2 m-3 px-4">
                            {/**Number */}
                            <div className="col">
                                <label className="mb-0 small-text" htmlFor="first-name">
                                    Phone number {index+1}
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first-name"
                                    className= {`input-form x-large-text stretch-form ${editMode ? "form-disabled" : ""}`}
                                    required
                                    value={phone.number}
                                />
                            </div>
                        </div>
                         
                    </> : null
                ))
        }
        {selectedContact.phones.length > 1 ?
            <div className="row p-2 m-3 px-4">
                <div className="col d-flex justify-content-end">
                    <button className="button-style" type="button" onClick={()=>setMultipleNumbers(e => !e)}>
                        {multipleNumbers ? "Hide" : "Show"} secondary numbers
                    </button>
                </div>
            </div>: null
        }
    </div>
  )
}
export default ContactDetails