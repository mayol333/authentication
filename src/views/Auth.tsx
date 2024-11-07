import { ChangeEventHandler, FormEventHandler, useState } from "react";
import client from "../http/client";
import { useNavigate } from "@tanstack/react-router";

export const Auth = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setLogin(event.currentTarget.value);
    };
    const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setPassword(event.currentTarget.value);
    };
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        console.log(login, password);
        try {
            await client.post("/api/login", {
                body: JSON.stringify({ login, password }),
            });
            navigate({ to: "/protected", replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-styles">
                <h1 className="title">Login</h1>
                <input type="text" value={login} onChange={handleLoginChange} />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button>login</button>
            </form>
        </div>
    );
};
