import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TwitterUsername = () => {
    const [userName, setUserName] = useState('');
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const username = searchParams.get("username");
        if (username) {
        console.log(`The username is ${username}`);
        setUserName(username);
        // Do something with the username here
        }
    }, [location.search]);

    return (userName.length > 0) ? <span className="text-black">{userName}</span> : null;
};

export default TwitterUsername;
