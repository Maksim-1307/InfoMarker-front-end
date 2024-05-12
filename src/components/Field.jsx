import { useState, useEffect, useRef } from "react";

import "./Field.scss"

function Field(props) {

    const [data, setData] = useState({});
    const [error, setError] = useState();
    const fieldRef = useRef();

    useEffect(() => {
        setData(props.json);
    });

    useEffect(()=>{
        setError((<div className="field__error">{data.error}</div>));
    }, [data]);

    return (
        <div className="field">
        <input ref={fieldRef} className="field__input" {...data}></input>
        { error }
        </div>
    );
}

export default Field;