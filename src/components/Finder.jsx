import "./Finder.scss"
import Sticky from "sticky-js";
import arrow from "../img/icons/top.svg"
import {fileContext} from "./FileContext";
import { useContext } from "react";

import React, { useEffect } from "react";
import { useState } from "react";

function Finder () {
    var sticky = new Sticky('.finder');
    let elements = Array.from(document.querySelectorAll("span[style]"));

    if (elements.length){
        for (let i = 0; i < elements.length; i++) {
            if (!elements[i].style.backgroundColor){
                //elements[i]  = undefined;
                elements.splice(i, 1); 
                i--;
            } 
        }
    }

    const [id, setId] = useState(0);

    const { selectedName, setName} = useContext(fileContext);
    setName(122);

    function move(val) {
        if (!elements.length) return;
        let newId = id + val;
        if (newId < 0){
            newId += elements.length;
        }
        newId = newId % elements.length;
        setId(newId);
        console.log(selectedName);
        console.log(id);
    }

    useEffect(() => {

        if (!elements[id]) return;
        
        elements[id].scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
        elements[id].animate([
            {
                position: 'relative',
                top: '0'
            },
            { 
                position: 'relative',
                top: '-5px'
            },
            {
                position: 'relative',
                top: '0'
            },
            {
                position: 'relative',
                top: '5px'
            },
            {
                position: 'relative',
                top: '0'
            }
        ],
        {
            duration: 500,
        });
    }, [id]);

    return (
        <div className="finder" data-margin-top="20px" style={{ "background-color": "#FCFF56"}}>
            <div className="finder__text">Иванов Иван Иванович</div>
            <div className="finder__bottom">
                <button className="finder__back" onClick={() => {move(-1)}}><img src={arrow} alt="" /></button>
                <div className="finder__number">{id + 1}/{elements.length}</div>
                <button className="finder__next" onClick={() => { move(1) }}><img  src={arrow} alt="" /></button>
            </div>
        </div>
    );
}

export default Finder;