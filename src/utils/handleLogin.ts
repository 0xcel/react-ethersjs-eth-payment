import { useAuthStore } from "../store/AuthStore";
import { Location } from "react-router-dom";
import Web3 from "web3";

const web3 = new Web3('http://0.0.0.0:8545');

export const handleLogin = (location: Location) => {
        // const location = useLocation();

        const authStore = useAuthStore; // Get the store instance using the hook
        const setTwitterAccountHandle = authStore.getState().setTwitterAccountHandle; // Access the state using getState
        const setAddress = authStore.getState().setAddress; // Access the state using getState
        const setBalance = authStore.getState().setBalance; // Access the state using getState
  
        const searchParams = new URLSearchParams(location.search);
        const username = searchParams.get("username");
        const address = searchParams.get("address");
        if (username && address) {
            console.log(`The username is ${username}`);
            setTwitterAccountHandle(username);
            setAddress(address);
            const getBalance = async (address: string) => {
                const balance = await web3.eth.getBalance(address);
                setBalance(balance)
                return balance;
            }
    
            getBalance(address);
        }
};