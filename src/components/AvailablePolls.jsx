import { useEffect, useState } from "react";
import "./css/Poll.css";
function AvailablePolls(props) {
    const [availablePolls, setAvailablePolls] = useState([])
    const [totalActivePolls, setTotalActivePolls] = useState(0)
    const [loadingAvailableGroups, setLoadingAvailableGroups] = useState(true);
    const [selectedActivePollId, setSelectedActivePollId] = useState(0)

    //  GET API Calls
    const loadAvailablePolls = async () => {
        await fetch("http://localhost:3003/availablepolls", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Token: sessionStorage.getItem("user"),
        },
        })
        .then((res) => res.json())
        .then((res) => {
            
            setAvailablePolls(res["data"])
            setLoadingAvailableGroups(false);
            setTotalActivePolls(res["data"].length)
        });
    };
    const handleNavigate = (e) => {
        if (e.target.name === "availablepoll")
        {
          setSelectedActivePollId(selectedActivePollId => selectedActivePollId + parseInt(e.target.id))
        }
        // else if (e.target.name === "mygroup")
        // {
        //   setSelectedMyGroupId(selectedMyGroupId => selectedMyGroupId + parseInt(e.target.id))
        // }
      }

    useEffect(() => {
        setAvailablePolls([]);
        loadAvailablePolls();
      }, [props]);

    return (
        <>
            {loadingAvailableGroups ? 
                ( <p> Loading...</p> ) 
                : 
                (
                <div className="col pollJoiner availablePollContainer">
                    <button className={selectedActivePollId >0 ? "pollJoinerCardNavBtn pollJoinerCardLeft" : "pollJoinerCardNavBtn pollJoinerCardLeft pollJoinerCardNavBtnDisabled"}
                            id = '-1'
                            name = "availablepoll"
                            disabled = {selectedActivePollId <= 0}
                            onClick={handleNavigate}
                    > 
                    &lt;
                    </button>
                    <span className="pollJoinerCard">
                    {availablePolls.map((poll, index) => {
                    return(
                        (index === selectedActivePollId && 
                        <span key={poll.poll_id}>
                            {poll.poll_name} 
                        </span>
                        )
                    )
                    })}
                    </span>
                    <button className={selectedActivePollId < totalActivePolls-1 ? "pollJoinerCardNavBtn pollJoinerCardRight" : "pollJoinerCardNavBtn pollJoinerCardRight pollJoinerCardNavBtnDisabled"}
                            id = '1'
                            name = "availablepoll"
                            disabled = {selectedActivePollId >= totalActivePolls-1}
                            onClick={handleNavigate}
                    > 
                    &gt;
                    </button>
                </div>
                )
            }
        </>
    )
}

export {AvailablePolls}