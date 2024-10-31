import { useEffect } from "react";

export const App = () => {
    useEffect(() => {
        const callApi = async () => {
            const result = await fetch("http://localhost:3000/test");
            const data = await result.json();
            console.log(data);
        };
        callApi();
    }, []);

    return <div></div>;
};
