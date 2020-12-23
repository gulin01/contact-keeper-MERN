import React, { useReducer } from 'react';
import {v4 as uuid} from "uuid"; 

import ContactContext from './contactContext';
import contactReducer from './contactReducer';


import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CLEAR_FILTER
} from '../types';

const ContactState = props =>{
    const initialState = {
        contacts: [
            {
                id:1,
                name: 'Gulshanoy',
                email: "gulshan@gmail.com",
                phone: "+998-94-095-960",
                type: "personal"
            },
            {
                id:2,
                name: 'Gulchiroy',
                email: "gulchiroy@gmail.com",
                phone: "+998-94-097-992",
                type: "professional"
            },
            {
                id:3,
                name: 'Gulasal',
                email: "gulasal@gmail.com",
                phone: "+998-94-020-222",
                type: "personal"
            }

        ],
        current:null
      
    };
    const [state,dispatch] = useReducer(contactReducer,initialState);

    // Add contact

    const addContact = contact =>{
        // gives a random id
        contact.id = uuid();
        dispatch({type:ADD_CONTACT,payload: contact });

    }

    // Delete contact
    const deleteContact = id =>{
        dispatch({ type:DELETE_CONTACT, payload: id });

    }

 
    // Set current Contact
    const setCurrent = contact =>{
        dispatch({ type: SET_CURRENT, payload: contact });

    }


    // clear current contact
    const clearCurrent = () =>{
        dispatch({ type :CLEAR_CURRENT });

    }

    // Update contact
    const updateContact = contact =>{
        dispatch({ type: UPDATE_CONTACT, payload: contact });

    }

    // Filter contacts

    // Clear filter

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current:state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact
            
        }}
        >
            { props.children }
        </ContactContext.Provider>
    )
}
export default ContactState;