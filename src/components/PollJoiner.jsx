import { useEffect, useState } from "react";
import "./css/Poll.css";

function PollJoiner(props) {
    const [availablePolls, setAvailablePolls] = useState([])
    const [loading, setLoading] = useState(true);
    const [selectedPoll, setSelectedPoll] = useState(-1);
    const [groupName, setGroupName] = useState('')
    const [groupCode, setGroupCode] = useState('')
    const [selectedActivePollId, setSelectedAvtivePollId] = useState(0)
    const [totalActivePolls, setTotalActivePolls] = useState(0)

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
            setLoading(false);
            setTotalActivePolls(res["data"].length)
          });
      };

      const handleAvailablePollClick = (e) => {
        setSelectedPoll(parseInt(e.target.id))
      }

      const handleGroupNameChange = (e) => {
        setGroupName(e.target.value)
      }

      const handleGroupCodeChange = (e) => {
        setGroupCode(e.target.value)
      }
       const handleCreateGroupClick = (e) => {
        console.log(selectedActivePollId)
        console.log(availablePolls[selectedActivePollId])
        // Call Post Method to store the group nme.

        fetch("http://localhost:3003/creategroup",
        {
            method: "POST",
            headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Token": sessionStorage.getItem("user"),
                      },
            body: JSON.stringify(
                {
                    available_poll : availablePolls[selectedActivePollId],
                    group_name : groupName
                    // "user_id" : user["value"],
                    // "task_id" : task["value"],
                    // "calendar_id" : taskcalendarList
                }
            ),
        }
        ).then((res) => res.json()).then(res => {console.log(res)});
        
      }

      const handlePollNavigate = (e) => {
        // console.log('pressed', parseInt(e.target.id))

        setSelectedAvtivePollId(selectedActivePollId => selectedActivePollId + parseInt(e.target.id))
      }

      useEffect(() => {
        setAvailablePolls([]);
        loadAvailablePolls();

      }, [props]);

      return (
        <>
            <div>
            {/* <div className="availablePollContainer"> */}
            {loading ? (
                            <p> Loading...</p>
                        ) : 
                        (
                          <>
                            <div className="container text-center">
                              <div className="row">
                                <div className="col pollJoiner availablePollContainer">
                                  <button className={selectedActivePollId >0 ? "pollJoinerCardNavBtn pollJoinerCardLeft" : "pollJoinerCardNavBtn pollJoinerCardLeft pollJoinerCardNavBtnDisabled"}
                                          id = '-1'
                                          disabled = {selectedActivePollId <= 0}
                                          onClick={handlePollNavigate}
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
                                          disabled = {selectedActivePollId >= totalActivePolls-1}
                                          onClick={handlePollNavigate}
                                  > 
                                    &gt;
                                  </button>
                                  
                                  {/* {availablePolls.map((poll, index) => {
                                    return(
                                        <div key={poll.id} className="availablePollRadio ">
                                            <div className="form-check ">
                                                <input className="form-check-input" 
                                                       type="radio" 
                                                       name="flexRadioDefault" 
                                                       id={poll.id}
                                                       checked={poll.id === selectedPoll}
                                                       onChange={handleAvailablePollClick} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    {poll.poll_name} {index}
                                                </label>
                                            </div>
                                        </div>
                                    )
                                  })} */}
                                </div>

                                <div className="col pollJoiner createGroup ">
                                  <input type="text" 
                                         className='pollJoinerControls pollJoinerTextBox createGroupControls' 
                                         placeholder="Group Name"
                                         onChange={handleGroupNameChange}
                                         text={groupName}
                                  />
                                  <span> </span>
                                  <button className= {groupName !== '' ? 'pollJoinerControls pollJoinerBtn createPollGroupBtn' : 'pollJoinerControls pollJoinerBtn createPollGroupBtn pollJoinerBtnDisabled'}
                                          disabled = {groupName === ''}
                                          onClick={handleCreateGroupClick}
                                  > 
                                    Create
                                  </button>
                                </div>

                                <div className="col pollJoiner joinGroup">
                                  <input type="text" 
                                        className='pollJoinerControls pollJoinerTextBox joinGroupControls' 
                                        placeholder="Code"
                                        onChange={handleGroupCodeChange}
                                        text={groupCode}
                                  />
                                  <span> </span>
                                  <button className= {groupCode !== '' ? 'pollJoinerControls pollJoinerBtn joinPollGroupBtn' : 'pollJoinerControls pollJoinerBtn joinPollGroupBtn pollJoinerBtnDisabled'}
                                          disabled = {groupCode === ''}
                                  >
                                    Join
                                  </button>
                                </div>

                                <div className="col pollJoiner myGroups">  
                                My Groups
                                </div>

                              </div>
                            </div>
                            
                          </>
                        )
            }
            </div>
        </>
      )
}

export {PollJoiner}