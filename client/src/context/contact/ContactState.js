import React, { useReducer } from 'react';
import uuid from 'uuid';
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

        ]
      
    };
    const [state,dispatch] = useReducer(contactReducer,initialState);

    // Add contact

    // Delete contact

    // Set current Contact

    // clear current contact

    // Update contact

    // Filter contacts

    // Clear filter

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts
        }}
        >
            { props.children }
        </ContactContext.Provider>
    )
}
export default ContactState;