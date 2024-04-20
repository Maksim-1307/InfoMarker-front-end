import React, { Fragment } from "react";
import infoIcon from '../img/icons/info-icon.svg'

function Note(props){

    return(
        <div className="note">
            <img class="note__icon" alt="" src={infoIcon}/>
            <div className="note__text">
                {(props.content)}
            </div>
        </div>
    );
}

export default Note;