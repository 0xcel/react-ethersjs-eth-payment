import { useAuthStore } from "../store/AuthStore";
import { Location } from "react-router-dom";

export const handleLogin = (location: Location) => {
        // const location = useLocation();

        const authStore = useAuthStore; // Get the store instance using the hook
        const setTwitterAccountHandle = authStore.getState().setTwitterAccountHandle; // Access the state using getState
        const setAddress = authStore.getState().setAddress; // Access the state using getState
  
        const searchParams = new URLSearchParams(location.search);
        const username = searchParams.get("username");
        const address = searchParams.get("address");
        if (username && address) {
            console.log(`The username is ${username}`);
            setTwitterAccountHandle(username);
            setAddress(address);
        }
};