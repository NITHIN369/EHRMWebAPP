import {ethers} from "ethers";
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import stateContext from "./stateContext";
import compiledContract from "./compiledcontract.json"
function ShowRecord(){
    const navigate=useNavigate();
    const { othersAddress, setothersAddress, account, contractAddress } =
      useContext(stateContext);
    const [docs,setDocs]=useState(null)
    async function getDocs(){
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        console.log("Signers from ethers");
        console.log(signer);
        console.log("Account from ethers");
        console.log(account);
        const contract = new ethers.Contract(
          contractAddress,
          compiledContract.abi,
          signer
        );
        if(othersAddress.length>1){
            var t = await contract.getOtherFiles(othersAddress);
        }else{
        var t=await contract.getFiles();}
        setDocs(t);
        console.log("Fetched files: ")
        console.log(docs)
    }
    useEffect(()=>{
        if(!account){
            navigate("/");
        }else{
            getDocs();
        }
    },[])
    return <>
        {docs&& docs.length==0 && <h2 className="noFile">Oops No files</h2> }
        {docs && <>
        {docs.map((d,i)=>{return (
          <div key={i}>
            <iframe className="iframe"
              src={`https://gateway.pinata.cloud/ipfs/${d}`}
              height="150"
              width="300"
            />
            <a className="viewbutton" href={`https://gateway.pinata.cloud/ipfs/${d}`}>View</a>
            <br />
          </div>
        );})}
        <button className="recButton" onClick={()=>{setothersAddress("");navigate("/newRecord");}}>Home Page</button>
        </>}
    </>
}
export default ShowRecord