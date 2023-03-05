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

const storagedTxs: Transaction[] = JSON.parse(localStorage.getItem('txs') || '[]');

export default function App() {
  const [error, setError] = useState('');
  const [txs, setTxs] = useState<Transaction[]>(storagedTxs);
  const [siteConnected, setSiteConnected] = useState(false);
  const [balance, setBalance] = useState("");
  const [generateTweet, setGenerateTweet] = useState('');

  const handleNewTx = (tx: Transaction) => {
    const updatedTxs: Transaction[] = [...txs, tx];
    setTxs(updatedTxs);
    localStorage.setItem('txs', JSON.stringify(updatedTxs))
    setBalance(
      // @ts-ignore
      (Number(balance) - tx.gasPrice - tx.value).toString()
    );
  };

  const handleSubmit = async (e: any) => {
    console.log('happened');
    e.preventDefault();
    const data = new FormData(e.target);
    if (error) setError('');
    const IPFSURL = await makeIPFS(data.get("handle")?.toString() || '', data.get("ether")?.toString() || '');
    setGenerateTweet(IPFSURL);


    // await startPayment({
    //   setError,
    //   handleNewTx,
    //   ether: data.get("ether")?.toString() || '',
    //   addr: data.get("handle")?.toString() || '',
    // });
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
            <SubmitButton />
            <ErrorMessage message={error} />
            {siteConnected && <TxList txs={txs} />}
            {(generateTweet.length > 0) && <a href={formatTweet(`${generateTweet}`)} target="_blank" className='black-link'>Tweet this</a>}
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