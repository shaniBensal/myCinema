import React from 'react';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const handleInputChange = (event, onInputChange) => {
    onInputChange(event)
}

const submit = (onSubmit, event) => {
    event.preventDefault();
    onSubmit()
};


const NavBar = (props) => {
    return (
        <div className="header flex justify-space-between">
            <div>
                <h1 className="header-title">My Cinema</h1>
            </div>
            <div className="flex">
                <input type="text" placeholder="Search" onChange={event => handleInputChange(event, props.onInputChange)} />
                <label onClick={event => submit(props.onSubmit, event)}><FontAwesomeIcon icon="search" title="search" /></label>
            </div>

        </div>
    )
}
export default NavBar;
