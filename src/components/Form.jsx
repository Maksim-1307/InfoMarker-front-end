import React, { useContext, useEffect, useState } from "react";
import './Form.scss'
import Field from "./Field";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";

function Form(props) {

    const [data, setData] = useState();
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();

    const appContext = useContext(AppContext);
    const { redirect } = appContext;
    const { setRedirect } = appContext;

    console.log("APPCONTEXT", useContext(AppContext));

    useEffect(() => {
        if (data && data.success) {
            if (props.onSuccess){
                props.onSuccess();
            }
        } else {
            console.log("not data or not success");
        }
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
        return ("Ошибка загрузки формы");
    }

    // if (!data.fields){
        // console.log(data);
        // return("Ошибка загрузки формы");
    // }
    

    const handle = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        for (let pair of formData.entries()){
            console.log(pair[0], ' => ', pair[1]);
        }

        console.log(event.target);  

        function replacer(key, value) {
            if (typeof value === "function" || value instanceof Error) {
                return undefined; 
            }
            return value;
        }
        
        fetch(event.target.action, {
            method: 'POST',
            body: formData
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