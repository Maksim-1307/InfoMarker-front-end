import "./Finder.scss"
import Sticky from "sticky-js";
import arrow from "../img/icons/top.svg"
import {fileContext} from "./FileContext";
import { useContext } from "react";
import React, { useEffect } from "react";
import { useState } from "react";
import hex2rgb from 'hex-rgb'

function Finder (props) {

    console.log(props);

    var sticky = new Sticky('.finder');

    const [id, setId] = useState(0);
    const [color, setColor] = useState();
    const [count, setCount] = useState(0);
    //const [elements, setElements] = useState([]);

    const { selectedName, setName} = useContext(fileContext);

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
                        console.log( elementsArr);
                        buff.push(elementsArr[i]);
                        console.log(elementsArr[i].style.backgroundColor + " != " + clr);
                    } 
                }
            }
        }
        console.log(buff);
        return buff;
    }

    function move(val) {
        console.log(elements);
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

    useEffect(()=>{
        if (selectedName && selectedName in props.data) {
            setColor(props.data[selectedName].color);
            setCount(props.data[selectedName].count);
        } 
        elements = get_elements();
        
    }, [selectedName]);

    // useEffect(() => {
    //     elements = get_elements();
    //     //elements = set_elements();

    // }, [id]);

    useEffect(() => {

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
    }, [id]);

    let counter = {
        id: id,
        count: count
    };
    if (count) counter.id += 1;

    return (
        <>
        <div className="finder" data-margin-top="20px" style={{ "background-color": "#" + color }}>
            <div className="finder__text">{selectedName}</div>
            <div className="finder__bottom">
                <button className="finder__back" onClick={() => {move(-1)}}><img src={arrow} alt="" /></button>
                <div className="finder__number">{counter.id}/{counter.count}</div>
                <button className="finder__next" onClick={() => { move(1) }}><img  src={arrow} alt="" /></button>
            </div>
        </div>
            <button onClick={() => { setName("Поколение")}}>set name</button></>
    );
}

export default Finder;