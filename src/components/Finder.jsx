import "./Finder.scss"
import Sticky from "sticky-js";
import arrow from "../img/icons/top.svg"
import {fileContext} from "./FileContext";
import { useContext } from "react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import hex2rgb from 'hex-rgb'

function Finder (props) {

    const [id, setId] = useState(0);
    const [color, setColor] = useState();
    const [count, setCount] = useState(0);
    const { selectedName, setName} = useContext(fileContext);
    const finderRef = useRef(null)
    const fillerRef = useRef(null)

    let elements = get_elements();

    function get_elements(){
        let buff = [];
        let elementsArr = Array.from(document.querySelectorAll("span[style]"));
        if (elementsArr.length) {
            for (let i = 0; i < elementsArr.length; i++) {
                if (elementsArr[i].style.backgroundColor && color) {
                    let clr = hex2rgb(color);
                    clr = "rgb(" + clr.red + ", " + clr.green + ", " + clr.blue + ")";
                    // console.log(clr);
                    // console.log(elements[i].style.backgroundColor)
                    if (elementsArr[i].style.backgroundColor != clr) {
                        //elements[i]  = undefined;
                        //console.log(elements[i].textContent);
                        elementsArr.splice(i, 1);
                        

                        i--;
                    } else {
                        buff.push(elementsArr[i]);
                    } 
                }
            }
        }
        return buff;
    }

    function move(val) {
        if (!elements.length) return;
        let newId = id + val;
        if (newId < 0){ 
            newId += elements.length;
        }
        newId = newId % elements.length;
        setId(newId);
    }

    function focus(){

        if (!elements[id]) return;

        elements[id].scrollIntoView({
            behavior: 'smooth',
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
            duration: 1000,
        });
    }

    useEffect(()=>{
        if (selectedName && selectedName in props.data) {
            setColor(props.data[selectedName].color);
            setCount(props.data[selectedName].count);
        } 
        elements = get_elements();

        move(-1);
        
    }, [selectedName]);


    useEffect(() => {
        focus();
    }, [id]);

    
    window.onscroll = () => {
        const finder = document.getElementsByClassName("finder")[0];
        const spaceFiller = document.getElementsByClassName("finder__space-filler")[0]; 
        if (finder && spaceFiller){ 
            const topRect = parseInt(spaceFiller.getBoundingClientRect().top);
            const wasFixed = parseFloat(finder.getAttribute("finder-is-fixed"));
            if (topRect >= 20) {
                if (wasFixed) {
                    finder.style.position = "static";
                    finder.style.width = "100%";
                    spaceFiller.style.height = "0px";
                }
                finder.setAttribute("finder-is-fixed", "0");
            } else {
                if (!wasFixed) {
                    const width = finder.offsetWidth;
                    const height = finder.offsetHeight;
                    finder.style.maxWidth = width + "px";
                    finder.style.position = "fixed";
                    spaceFiller.style.height = height + "px";
                    console.log(height);
                }
                finder.setAttribute("finder-is-fixed", "1");
            }
        } 
    }

    let counter = {
        id: id,
        count: count
    };
    if (count) counter.id += 1;

    if (selectedName) {
        return (
            <div className="finder__wrapper">
                <div ref={fillerRef} className="finder__space-filler"></div>
                <div ref={finderRef} className="finder" finder-is-fixed="0" style={{ "background-color": "#" + color }}>
                    <div className="finder__text">{selectedName}</div>
                    <div className="finder__bottom">
                        <button className="finder__back" onClick={() => { move(-1) }}><img src={arrow} alt="" /></button>
                        <div className="finder__number">{counter.id}/{counter.count}</div>
                        <button className="finder__next" onClick={() => { move(1) }}><img src={arrow} alt="" /></button>
                    </div>
                </div>
            </div>
        );
    } 

}

export default Finder;

