import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TwitterUsername = () => {
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const username = searchParams.get("username");
        const address = searchParams.get("address");
        if (username && address) {
            console.log(`The username is ${username}`);
            setUsername(username);
            setAddress(address);
        }
    }, [location.search]);

    return (username.length > 0) ? <h2 className="text-l font-semibold text-gray-700 text-center">
        Hello @{username} ({address})
    </h2> : null;
};

export default TwitterUsername;
