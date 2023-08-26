import { useEffect, useState } from "react";
import "./css/Poll.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUpFromBracket} from '@fortawesome/free-solid-svg-icons'
import {WhatsappShareButton, WhatsappIcon} from "react-share";

function GroupMain(props) {

  const [selectedPoll, setSelectedPoll] = useState(-1);
  const [groupName, setGroupName] = useState('')
  const [groupCode, setGroupCode] = useState('')
  
  const [availablePolls, setAvailablePolls] = useState([])
  const [totalActivePolls, setTotalActivePolls] = useState(0)
  const [loadingAvailableGroups, setLoadingAvailableGroups] = useState(true);
  const [selectedActivePollId, setSelectedActivePollId] = useState(0)


  const [myGroups, setMyGroups] = useState([])
  const [totalMyGroups, setTotalMyGroups] = useState(0)
  const [loadingMyGroups, setLoadingMyGroups] = useState(true);
  const [selectedMyGroupId, setSelectedMyGroupId] = useState(0)

  //  GET API Calls
  const loadAvailablePolls = async () => {
    await fetch(" https://polls-api.azurewebsites.net/availablepolls", {
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

  const loadMyGroups = async () => {
    await fetch(" https://polls-api.azurewebsites.net/mygroups", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Token: sessionStorage.getItem("user"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        
        setMyGroups(res["data"])
        setLoadingMyGroups(false);
        setTotalMyGroups(res["data"].length)
      });
  };

  // POST API Calls
  const handleCreateGroupClick = async (e) => {
    await fetch(" https://polls-api.azurewebsites.net/creategroup",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Token": sessionStorage.getItem("user")
        },
        body: JSON.stringify(
          {
            available_poll : availablePolls[selectedActivePollId],
            group_name : groupName
          }
        )
      }
    ).then((res) => res.json()).then(res => {
      // console.log(res)
      // console.log(res["data"])
      
      setMyGroups(res["data"])
      setLoadingMyGroups(false);
      setTotalMyGroups(res["data"].length)

      setGroupName('')
    });
    
  }

  const handleJoinGroupClick = async (e) => {
    await fetch(" https://polls-api.azurewebsites.net/joingroup",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Token": sessionStorage.getItem("user")
        },
        body: JSON.stringify(
          {
            group_code: groupCode
          }
        )
      }
    ).then((res) => res.json()).then(res => {
      // console.log(res)
      setGroupCode('')
    });
  }
  // Handlers
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value)
  }

  const handleGroupCodeChange = (e) => {
    setGroupCode(e.target.value)
  }

  const handleNavigate = (e) => {
    if (e.target.name === "availablepoll")
    {
      setSelectedActivePollId(selectedActivePollId => selectedActivePollId + parseInt(e.target.id))
    }
    else if (e.target.name === "mygroup")
    {
      setSelectedMyGroupId(selectedMyGroupId => selectedMyGroupId + parseInt(e.target.id))
    }
  }
 
  // Hooks
  useEffect(() => {
    setAvailablePolls([]);
    loadAvailablePolls();
    loadMyGroups();

  }, [props]);

  // Render
  return (
    <>
      <div className="container text-center">
        <div className="row">
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

          <div className="col pollJoiner createGroup ">
            <input type="text" 
                    className='pollJoinerControls pollJoinerTextBox createGroupControls' 
                    placeholder="Group Name"
                    onChange={handleGroupNameChange}
                    value={groupName}
            />
            <button className= {groupName !== '' ? 'pollJoinerControls pollJoinerBtn createPollGroupBtn' : 'pollJoinerControls pollJoinerBtn createPollGroupBtn pollJoinerBtnDisabled'}
                    disabled = {groupName === ''}
                    onClick={handleCreateGroupClick}
            > 
              Create
            </button>
          </div>



          
        </div>
        <div className="row">
          {loadingMyGroups ? 
              ( <p> Loading...</p> ) 
              : 
              (
                <div className="col pollJoiner myGroups">
                  <button className={selectedMyGroupId >0 ? "myGroupsCardNavBtn myGroupsCardLeft" : "myGroupsCardNavBtn myGroupsCardLeft myGroupsCardNavBtnDisabled"}
                    id = '-1'
                    name = "mygroup"
                    disabled = {selectedMyGroupId <= 0}
                    onClick={handleNavigate}
                  > 
                    &lt;
                  </button>
                  <span className="myGroupsCard">
                    {myGroups.map((group, index) => {
                      return(
                          (index === selectedMyGroupId && 
                            <span key={group.group_id}>
                              {group.group_name} 
                              <WhatsappShareButton
                                url={"polls.com/" + group.group_code}
                                title={"You are invited to participate in " + group.group_name}
                                separator=" : "
                                className='myGroupsCardShareButton'
                              >
                                <WhatsappIcon className='myGroupsCardShareButton' size={20} /> 
                              </WhatsappShareButton>
                            </span>
                          )
                      )
                    })}
                  </span>


                  <button className={selectedMyGroupId < totalMyGroups-1 ? "myGroupsCardNavBtn myGroupsCardRight" : "myGroupsCardNavBtn pollJoinerCardRight myGroupsCardNavBtnDisabled"}
                          id = '1'
                          name = "mygroup"
                          disabled = {selectedMyGroupId >= totalMyGroups-1}
                          onClick={handleNavigate}
                  > 
                    &gt;
                  </button>
                </div>
              )
            }

          <div className="col pollJoiner joinGroup">
            <input type="text" 
                  className='pollJoinerControls pollJoinerTextBox joinGroupControls' 
                  placeholder="Code"
                  onChange={handleGroupCodeChange}
                  value={groupCode}
            />
            <button className= {groupCode !== '' ? 'pollJoinerControls pollJoinerBtn joinPollGroupBtn' : 'pollJoinerControls pollJoinerBtn joinPollGroupBtn pollJoinerBtnDisabled'}
                    disabled = {groupCode === ''}
                    onClick={handleJoinGroupClick}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export {GroupMain}