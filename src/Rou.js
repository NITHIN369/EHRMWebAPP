import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from "./App";
import { useState } from "react";
import StateContext from "./stateContext";
import NewRecord from "./NewRecord";
import ShowOthers from "./ShowOthers";
import ShowRecords from "./ShowRecord";
function Rou() {
  const [account, setAccount] = useState("");
  const contractAddress = "0x236c59361A0F3E5D589CC74C0b1fe45CE8a80CF1";
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [othersAddress, setothersAddress] = useState("");
  return (
    <StateContext.Provider
      value={{
        othersAddress,
        setothersAddress,
        account,
        contractAddress,
        setAccount,
        isWalletConnected,
        setWalletConnected,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/newRecord" exact element={<NewRecord />} />
          <Route
            path="/showRecords"
            exact
            element={<ShowRecords />}
          />
          <Route path="/showOtherRecords" exact element={<ShowOthers />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </StateContext.Provider>
  );
}
export default Rou;
