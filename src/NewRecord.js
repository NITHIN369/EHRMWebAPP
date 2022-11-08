import {useState,useContext,useEffect} from "react"
import axios from "axios";
import {ethers} from "ethers";
import stateContext from "./stateContext";
import { useNavigate } from "react-router-dom";
import compiledContract from "./compiledcontract.json"
function NewRecord(){
    const navigate=useNavigate()
    const {setothersAddress,
      account,
      contractAddress,
    } = useContext(stateContext);

    const [fileImg,setFileImge]=useState(null)
    function ChangeHandler(e){
        setFileImge(e.target.files[0])
        console.log("Changed")
        console.log(fileImg)
        console.log(e.target.files[0])
    }
    const sendFileToIPFS = async (e) => {
        e.preventDefault()
        console.log("Submitted")
      if (fileImg) {
        try {
          const formData = new FormData();
          formData.append("file", fileImg);

          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: process.env.KEY,
              pinata_secret_api_key: process.env.SECRET,
              "Content-Type": "multipart/form-data",
            },
          });
          const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
          console.log(ImgHash);
          const { ethereum } = window;
          const provider = new ethers.providers.Web3Provider(ethereum, "any");
          const signer = provider.getSigner();
          console.log("Signers from ethers")
          console.log(signer)
          console.log("Account from ethers")
          console.log(account)
          const contract = new ethers.Contract(
            contractAddress,
            compiledContract.abi,
            signer
          );
          await contract.addFile(resFile.data.IpfsHash);
          alert("File uploaded successfully");
          //Take a look at your Pinata Pinned section, you will see a new file added to you list.
        } catch (error) {
          console.log("Error sending File to IPFS: ");
          console.log(error);
        }
      }else{
        console.log("Empty")
      }
    };
    async function giveAccess(){
      const t=document.getElementById("accessAddress").value;
      console.log("Access address: ")
      console.log(t);
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        compiledContract.abi,
        signer
      );
      await contract.addaccess(t);
      alert(`Successfully given access to ${t}`)
      
    }
    useEffect(()=>{
        if(!account){
            navigate("/")
        }
setothersAddress("");
    })
    return (
      <div id="HomePage">
      <div id="extraBox">
        <div id="uploadBox">
          <form onSubmit={sendFileToIPFS}>
            <input type="file" onChange={ChangeHandler} />
            <br></br>
            <button type="submit" id="uploadBoxButton">Upload</button>
          </form>
        </div>
        <div id="buttonsBox">
          <button onClick={() => navigate("/showRecords")}>
            View My Records
          </button>
          <button onClick={() => navigate("/showOtherRecords")}>
            View Others Records
          </button>
        </div>
        <div id="AccessGrant">
          <input
            placeholder="want to give access to others? then enter their address"
            id="accessAddress"
            size={50}
            type="text"
          />
          <button onClick={giveAccess}>Give Access</button>
        </div>
        </div>
      </div>
    );
}
export default NewRecord;
