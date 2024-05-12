import { useState } from "react";
import Form from "./Form";

function Registration(){

    const [json, setJson] = useState();

    useState(()=>{
        fetch("https://api.info-marker.ru/api/user/register.php")
            .then((response) => response.json())
            .then((json) => setJson(json));
    });
    

    return (<Form json={json} />);

}

export default Registration;