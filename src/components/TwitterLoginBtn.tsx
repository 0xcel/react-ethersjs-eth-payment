import { useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import TwitterLogoutButton from './TwitterLogoutBtn'
const btnClass =
  "btn btn-primary submit-button focus:ring focus:outline-none w-full twitter-button";

const redirectUrl = "http://cryptotwitter.xyz:8000/login";

const TwitterButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authStore = useAuthStore; // Get the store instance using the hook
  const twitterAccountHandle = authStore.getState().twitterAccountHandle; // Access the state using getState
  const isLoggedIn: boolean = twitterAccountHandle.length > 0;

  const handleClick = () => {
    setIsLoading(true);
    // Replace `YOUR_REDIRECT_URL` with the URL you want to redirect to
    setTimeout(() => {
      setIsLoading(false);
      window.location.replace(redirectUrl);
    }, 2000);
  };
  const LoginButton = (): JSX.Element => {
    return (
      <button
        type="submit"
        className={btnClass}
        onClick={handleClick}
        disabled={isLoading}
      >
        <img
          src="/twitterLogo.svg"
          alt="Twitter logo"
          className="ml-2 white-circle"
        />
        {isLoading ? "Loading..." : "Connect your Twitter Account"}
      </button>
    );
  };
  

  return !isLoggedIn ? LoginButton() : <TwitterLogoutButton />;
};

export default TwitterButton;
