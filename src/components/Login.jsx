import { useState } from "react";
import Form from "./Form";
import { useNavigate, useLocation } from "react-router-dom";
import { setLoggedIn, setIsAdmin } from "../AppContext.js"
import { useContext } from "react";
import { AppContext } from "../AppContext.js";

function Login() {

    const location = useLocation();

    const [json, setJson] = useState();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const {setLoggedIn} = useContext(AppContext);

    useState(() => {
        fetch("https://api.info-marker.ru/api/user/login.php")
            .then((response) => response.json())
            .then((json) => setJson(json));
    });

    return (
        <section class="auth-section">
            <div class="container">
                <h1>{(message)}</h1>
                <Form json={json} onSuccess={()=>{navigate("/");setLoggedIn(true)}}></Form>
            </div>
        </section>
    );
      
}

export default Login;