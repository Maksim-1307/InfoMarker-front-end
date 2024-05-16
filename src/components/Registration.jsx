import { useContext, useState } from "react";
import Form from "./Form";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

function Registration(){

    const [json, setJson] = useState();
    const navigate = useNavigate();

    useState(()=>{
        fetch("https://api.info-marker.ru/api/user/register.php")
            .then((response) => response.json())
            .then((json) => setJson(json));
    });

    return (
        <section class="auth-section">
            <div class="container">
                <Form json={json} onSuccess={()=>{navigate("/login")}}/>
            </div>
        </section>
    );

}

export default Registration;