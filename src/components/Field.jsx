import { useState, useEffect, useRef } from "react";

import "./Field.scss"

function Field(props) {

    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [label, setLabel] = useState(null);
    const fieldRef = useRef();

    useEffect(() => {
        setData(props.json);
        props.json.value = null;
    });

    useEffect(()=>{
        if (data.error) setError((<div className="field__error">{data.error}</div>));
        if (data.type == "file" && data.placeholder) setLabel((<label for={data.name} className="field__file-label">{data.placeholder}</label>));
    }, [data]);

    return (
        <div className="field">
        { label }
        <input ref={fieldRef} className="field__input" {...data}></input>
        { error }
        </div>
    );
}

export default Field;