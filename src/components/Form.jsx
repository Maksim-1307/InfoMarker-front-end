import React, { useEffect, useState } from "react";
import './Form.scss'
import axios from "axios";
import Field from "./Field";
import { json } from "react-router-dom";

function Form(props) {

    const [data, setData] = useState();
    const [fields, setFields] = useState([]);


    useEffect(() => {
        if (data && data.fields){
            console.log("Current data is: ", data);
            let newFields = [];
            data.fields.forEach(field => {
                newFields.push((<Field json={field} />));
            });
            setFields(newFields);
        }
    }, [data]); 

    useEffect(()=>{
        if (!data) setData(props.json);
    });
    
    if (!data) {
        console.log(typeof props.json);
        return ("Ошибка загрузки формы");
    }
    
    if (!data.fields){
        console.log(data);
        return("Ошибка загрузки формы");
    }
    

    const handle = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });


        console.log("HANDLE CALLED");
        console.log("FROMDATA", formDataObject);
        console.log(JSON.stringify(formDataObject));
        
        fetch(event.target.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
        .then((response) => response.json())
        .then((json) => setData(json));
        
    }

    return (
        <form onSubmit={handle} method={data.method} action={data.action} encType={data.enctype}>
            {fields}
            <button type="submit">Отправить</button>
        </form>
    );
}

export default Form;