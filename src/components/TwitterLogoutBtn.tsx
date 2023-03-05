import { useState } from "react";
import { useAuthStore } from "../store/AuthStore";

const btnClass =
  "btn btn-primary submit-button focus:ring focus:outline-none w-full twitter-button";

const redirectUrl = "http://localhost:8000/revoke";

const TwitterLogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Replace `YOUR_REDIRECT_URL` with the URL you want to redirect to
    setTimeout(() => {
      setIsLoading(false);
      window.location.replace(redirectUrl);
    }, 2000);
  };
  const LogoutButton = (): JSX.Element => {
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
        {isLoading ? "Loading..." : "Log out"}
      </button>
    );
  };
  

  return LogoutButton()
};

export default TwitterLogoutButton;
