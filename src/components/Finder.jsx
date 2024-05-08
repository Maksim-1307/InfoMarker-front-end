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
    const [distanceFromTop, setDistanceFromTop] = useState(1000);
    const [shouldFixed, setShouldFixed] = useState(false);
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

    useEffect(()=>{
        if (selectedName && selectedName in props.data) {
            setColor(props.data[selectedName].color);
            setCount(props.data[selectedName].count);
        } 
        elements = get_elements();
        
    }, [selectedName]);


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

    // useEffect(() => { 
    //     console.log("effect");
    //     if (finderRef.current && fillerRef.current){
    //         const height = parseInt(finderRef.current.offsetHeight);
    //         const spaceFiller = fillerRef.current;
    //         spaceFiller.style.height = height + "px";
    //         console.log("height changed");
    //     } else {
    //         if (finderRef.current){
    //             console.log("finder ref only");
    //         }
    //     }
    // });

    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach((entry) => {
    //             const distance = entry.boundingClientRect.top;
    //             if (distance <= 0){
    //                 setShouldFixed(true);
    //             } else {
    //                 setShouldFixed(false);
    //             }
    //             setDistanceFromTop(distance);
    //         });
    //     }, 
    //     {
    //         rootMargin: '-10px 0px 0px 0px' 
    //     }
    // );
 
    //     if (fillerRef.current) {
    //         observer.observe(fillerRef.current);
    //         return () => {
    //             observer.unobserve(fillerRef.current);
    //         };
    //     }

    // });

    window.onscroll = () => {
        const finder = document.getElementsByClassName("finder")[0];
        const spaceFiller = document.getElementsByClassName("finder__space-filler")[0]; 
        if (finder && spaceFiller){ 
            const topRect = parseInt(spaceFiller.getBoundingClientRect().top);
            const wasFixed = parseFloat(finder.getAttribute("finder-is-fixed"));
            console.log(topRect);
            if (topRect >= 0) {
                if (wasFixed) {
                    finder.style.position = "relative";
                    finder.style.width = "100%";
                }
                finder.setAttribute("finder-is-fixed", "0");
            } else {
                if (!wasFixed) {
                    const width = finder.offsetWidth;
                    finder.style.maxWidth = width + "px";
                    finder.style.position = "fixed";
                }
                finder.setAttribute("finder-is-fixed", "1");
            }
        } 
    }

    useEffect(()=>{
        const finder = finderRef.current;
        const spaceFiller = fillerRef.current;
        if (finder && spaceFiller) {
            if (shouldFixed) {
                finder.style.position = "fixed";
                const height = parseInt(finder.offsetHeight); 
                spaceFiller.style.height = height + "px";
            } else {
                finder.style.position = "relative";
                spaceFiller.style.height = 0 + "px";
            }
        }
    }, [shouldFixed]);

    let counter = {
        id: id,
        count: count
    };
    if (count) counter.id += 1;

    if (selectedName) {
        return (
            <>
                <div ref={finderRef} className="finder" finder-is-fixed="0" style={{ "background-color": "#" + color }}>
                    <div className="finder__text">{selectedName}</div>
                    <div className="finder__bottom">
                        <button className="finder__back" onClick={() => { move(-1) }}><img src={arrow} alt="" /></button>
                        <div className="finder__number">{counter.id}/{counter.count}</div>
                        <button className="finder__next" onClick={() => { move(1) }}><img src={arrow} alt="" /></button>
                    </div>
                </div>
                <div ref={fillerRef} className="finder__space-filler"></div>
            </>
        );
    } 

}

export default Finder;



/*


import React, { useEffect, useRef, useState } from 'react';

const ComponentWithScrollTracking = () => {
  const componentRef = useRef(null);
  const [distanceFromTop, setDistanceFromTop] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { 
      entries.forEach((entry) => {
        const distance = entry.boundingClientRect.y;
        setDistanceFromTop(distance);
      });
    }, {
      rootMargin: '-10px 0px 0px 0px' // отступ сверху: -10px
    });

    observer.observe(componentRef.current);

    return () => {
      observer.unobserve(componentRef.current);
    };
  }, []);

  return (
    <div ref={componentRef} style={{ marginTop: '50px' }}>
      <p>Distance from top: {distanceFromTop}px</p>
    </div>
  );
};

export default ComponentWithScrollTracking;


*/