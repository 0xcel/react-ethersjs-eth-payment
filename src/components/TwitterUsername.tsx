import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Web3 from "web3";

const web3 = new Web3('http://0.0.0.0:8545');

const TwitterUsername = () => {
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const username = searchParams.get("username");
        const address = searchParams.get("address");
        if (username && address) {
            setUsername(username);
            setAddress(address);

            
            const getBalance = async (address: string) => {
                const balance = await web3.eth.getBalance(address);
                setBalance(balance)
                return balance;
            }
    
            getBalance(address);
        }



    }, [location.search]);

    if (!username || !address) return null;

    return (
        <>
            <h2 className="text-l font-semibold text-gray-700 text-center">
                @{username} ({address})
            </h2>
            <h2 className="text-l font-semibold text-gray-700 text-center">
                Current Balance: {balance} ETH
            </h2>
        </>
    );
};

export default TwitterUsername;
