import { useState } from "react";

const btnClass =
  "btn btn-primary submit-button focus:ring focus:outline-none w-full";

const redirectUrl = "http://localhost:8000/login";

const TwitterButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Replace `YOUR_REDIRECT_URL` with the URL you want to redirect to
    setTimeout(() => {
      setIsLoading(false);
      window.location.replace(redirectUrl);
    }, 2000);
  };

  return (
    <button
      type="submit"
      className={btnClass}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Connect your Twitter Account"}
    </button>
  );
};

export default TwitterButton;
