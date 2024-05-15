import { useState } from "react";
import Form from "./Form";
import { useLocation } from "react-router-dom";

function Login() {

    const location = useLocation();
    console.log(location);

    return (
        <section class="auth-section">
            <div class="container">
                <h1>{(location["state"].message)}</h1>
            </div>
        </section>
    );
      
}

export default Login;