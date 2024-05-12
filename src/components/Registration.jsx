import { useState } from "react";
import Form from "./Form";

function Registration(){

    const [json, setJson] = useState();

    useState(()=>{
        fetch("https://api.info-marker.ru/api/user/register.php")
            .then((response) => response.json())
            .then((json) => setJson(json));
    });
    

    return (
        <section class="auth-section">
            <div class="container">
                <Form json={json} />
            </div>
        </section>
    );

}

export default Registration;