import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

export interface userNameParams {
    username: string,
    address: string,
}
const TwitterUsername = ({params}: {params: userNameParams}) => {
    const {username, address} = params;
  
    return (username.length > 0) ? <h2 className="text-l font-semibold text-gray-700 text-center">
        Hello @{username} ({address})
    </h2> : null;
};

export default TwitterUsername;
