import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Header from "./components/Header";
import Title from "./components/Title";
import CurrentBalance from "./components/CurrentBalance";
import ErrorMessage from "./components/ErrorMessage";
import TxList from "./components/TxList";
import Inputs from "./components/Inputs";
import ActionBtn from "./components/ActionBtn";
import startPayment from "./utils/startPayment";
import { NO_ETH_BROWSER_WALLET, FAILED_TO_CONNECT } from "./constants/error";
import "./App.css";
import { makeIPFS } from './utils/ipfs'
import SubmitButton from "./components/IPFSButton";
import { formatTweet } from "./utils/twitterFormatter";
import TwitterButton from "./components/TwitterLoginBtn";
import TwitterUsername from "./components/TwitterUsername";

const btnClass =
"btn btn-primary submit-button focus:ring focus:outline-none w-full";

export default function App() {
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (error) setError('');
    const IPFSURL = await makeIPFS(data.get("handle")?.toString() || '', data.get("ether")?.toString() || '');
    console.log(formatTweet(`${IPFSURL}`));
    window.location.replace(formatTweet(`${IPFSURL}`));
  };


  return (
    <>
      <Header />
      <form className="m-4" onSubmit={handleSubmit}>
        <main className="w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <div className="mt-4 p-4">
            <Title />
            <TwitterUsername />
            <Inputs siteConnected={true} />
            <TwitterButton />
          </div>
          <div className="p-4">
            <button type="submit" className={btnClass}>
              Pay now
            </button>)
            <ErrorMessage message={error} />
            {/* {(generateTweet.length > 0) && <a href={formatTweet(`${generateTweet}`)} target="_blank" className='black-link'>Tweet this</a>} */}
          </div>
        </main>
      </form>
    </>
  );
}

type Transaction = {
  gasPrice: string;
  value: string;
  hash: string;
}