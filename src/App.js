import { useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import stateContext from './stateContext';

function App() {
  const { account, setAccount, isWalletConnected, setWalletConnected } =
    useContext(stateContext);
  const navigate = useNavigate();
  async function connectToWallet() {
    const { ethereum } = window;
    if (!ethereum) {
      alert("please install metamask first to use our website");
    } else {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      alert("Successfully connected to wallet");
      setWalletConnected(true);
      console.log("account: " + accounts[0]);
      navigate("/newRecord");
    }
  }
  useEffect(()=>{
    if(isWalletConnected){
      navigate("/newRecord")
    }else{
      console.log(account)
      console.log("not connected")
    }
  },[])
  return (
    <div id="ConnectionPage">
      <div id="introMsg">
        Want to Store Record in Dapp?
        <br />
        Then Start by clicking connect below
      </div>
      <button class="button-64" role="button" onClick={connectToWallet}>
        <span class="text">Connect</span>
      </button>
    </div>
  );
}

export default App;
