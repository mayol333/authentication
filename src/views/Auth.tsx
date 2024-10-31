import { ChangeEventHandler, FormEventHandler, useState } from "react";

export const Auth = () => {
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
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log(login, password);
        fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify({ login, password }),
        });
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
