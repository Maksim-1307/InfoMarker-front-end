import React, { Fragment } from "react";
import infoIcon from '../img/icons/info-icon.svg'

function Note(props){

    return(
        <div class="note">
            <img class="note__icon" alt="" src={infoIcon}/>
            <div class="note-text">
                {(props.content)}
            </div>
        </div>
    );
}

export default Note;