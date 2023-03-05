const btnClass =
"btn twitter-button submit-button focus:ring focus:outline-none w-full";

const SubmitButton = () => {
    return(
    <button type="submit" className={btnClass}>
        <img
          src="/twitterLogo.svg"
          alt="Twitter logo"
          className="ml-2 white-circle"
        />
      Pay now
    </button>)
}

export default SubmitButton;