import React from 'react';
import './Event.css';

// EventName     Description    Action?
const EventHeader = (props) => {
    return (
    <div className = "EventHeader">
        <p>Name<span className="tab">Description</span></p>
    </div>

    );

}

export default EventHeader;