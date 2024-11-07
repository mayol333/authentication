import client from "../http/client";

export const Protected = () => {
    const handleGetData = async () => {
        const { data } = await client.get("/api/data");
        console.log(data);
    };
    return (
        <>
            <div>Protected Route</div>
            <button onClick={handleGetData}>Get data</button>
        </>
    );
};
