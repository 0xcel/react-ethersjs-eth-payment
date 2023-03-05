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
import TwitterUsername, { userNameParams } from "./components/TwitterUsername";
import { handleLogin } from "./utils/handleLogin";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "./store/AuthStore";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const privateKey = "7ec0615cfc5ae3b1824b849f01daf17fbb070f4ce80a17ecdf5d2f4e32316047";
const sender = new ethers.Wallet(privateKey, provider);

const btnClass =
  "btn twitter-button submit-button focus:ring focus:outline-none w-full";

export default function App() {
  const location = useLocation();

  const authStore = useAuthStore; // Get the store instance using the hook
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [disableBot, setDisableBot] = useState(false);
  const [dustBotText, setDustBotText] = useState('Sign in with Twitter to use the faucet');

  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (error) setError('');
    const IPFSURL = await makeIPFS(data.get("handle")?.toString() || '', data.get("ether")?.toString() || '');
    window.location.replace(formatTweet(`${IPFSURL}`));
  };

  // const handleInitialConnection = async (account: string) => {
  //   setSiteConnected(true);
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const balance = await provider.getBalance(account);
  //   const formattedBalance = ethers.utils.formatEther(balance);
  //   if (formattedBalance) setBalance(formattedBalance.toString());
  // };

  useEffect(() => {
    handleLogin(location);

    setTimeout(() => {
      setUserName(authStore.getState().twitterAccountHandle);
      setAddress(authStore.getState().derivedAddress);
      setBalance(authStore.getState().balance);

      if (authStore.getState().twitterAccountHandle.length > 0 && !disableBot) {
        setDustBotText('Use the faucet');
      }
    }, 1000);
  }, [disableBot])

  // useEffect(() => {
  //   const isBrowserWalletConnected = async () => {
  //     if (!window.ethereum)
  //       throw new Error(NO_ETH_BROWSER_WALLET);

  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const accounts = await provider.listAccounts();
  //       if(accounts?.length > 0) {
  //         const account = accounts[0];
  //         await handleInitialConnection(account);
  //       }

  //   }
  //   try {
  //     isBrowserWalletConnected();
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // }, []);

  // async function handleBtnConnectSiteClick() {
  //   try {
  //     if (!window.ethereum)
  //       throw new Error(NO_ETH_BROWSER_WALLET); 

  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       const account = accounts[0];
  //       if (account) {
  //         await handleInitialConnection(account);
  //       } else {
  //         throw new Error(FAILED_TO_CONNECT);
  //       }

  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // }

  const params: userNameParams = {
    username: userName, address: address, balance: balance
  }

  return (
    <>
      <Header />
      <form className="m-4" onSubmit={handleSubmit}>
        <main className="w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <div className="mt-4 p-4">
            <Title />
            <TwitterUsername params={params} />
            <Inputs siteConnected={true} />
            <TwitterButton />
          </div>
          <div className="p-4">
            <button type="submit" className={btnClass} disabled={userName.length === 0}>
              {(userName.length > 0) ? <img
                src="/twitterLogo.svg"
                alt="Twitter logo"
                className="ml-2 white-circle"
              /> : null}
              Pay now
            </button>
          </div>
        </main>
      </form>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <button className={btnClass} disabled={disableBot} style={{width: "50%"}}onClick={async (e) => {
          setDustBotText('Please wait...');
          const tx = await sender.sendTransaction({ to: address, value: ethers.utils.parseEther("100") });
          setDisableBot(true);
          setTimeout(() => {
            setDisableBot(false);
          }, 4000);
        }}>
          {dustBotText}
        </button>
      </div>
    </>
  );
}

type Transaction = {
  gasPrice: string;
  value: string;
  hash: string;
}