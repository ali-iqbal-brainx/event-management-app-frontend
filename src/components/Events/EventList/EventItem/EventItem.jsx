import React from 'react';
import './EventItem.css';

const EventItem = (props) => {
    return (
        <li key={props.eventId} className="events__list-item">
            <div>
                <h1>{props.title}</h1>
                <h2>
                    ${props.price} - {new Date(props.date).toLocaleDateString()}
                </h2>
            </div>
            <div>
                {props.userId === props.creatorId ? (
                    <p>You are the owner of this event.</p>
                ) : (
                    <button className="btn" onClick={() => props.onDetail(props.eventId)}>
                        View Details
                    </button>
                )}
            </div>
        </li>
    );
};

export default EventItem;
