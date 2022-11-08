import react from "react"
import {useContext} from "react"
import stateContext from "./stateContext"
import {useNavigate} from "react-router-dom"
function ShowOthers(){
    var {othersAddress, setothersAddress}=useContext(stateContext)
    const navigate=useNavigate()
    return (
      <>
        {" "}
        <div className="shoothers">
          <input
            placeholder="Enter file owners address"
            onChange={(e) => setothersAddress(e.target.value)}
            type="text"
          />
          <button
            onClick={() => {
              navigate("/showRecords");
            }}
          >
            View
          </button>
        </div>
        <button
          className="recButton"
          onClick={() => {
            setothersAddress("");
            navigate("/newRecord");
          }}
        >
          Home Page
        </button>
      </>
    );
}
export default ShowOthers;