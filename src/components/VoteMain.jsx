import { useEffect, useState } from "react";
import "./css/Poll.css";
import { VotingSection } from "./VotingSection";
import { VoteResults } from "./VoteResults";

function VoteMain(props) {
    
    const [participatingPolls, setParticipatingPolls] = useState([])
    const [selectedParticipatingPollIndexId, setSelectedParticipatingPollIndexId] = useState(0)
    const [selectedParticipatingPollId, setSelectedParticipatingPollId] = useState(-1)
    const [participatingPollsLoading, setParticipitingPollsLoading] = useState(true)
    const [totalParticipatingPolls, setTotalParticipatingPolls] = useState(0)

    // GET API Calls
    const loadParticipatingPolls = async () => {
      let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
      await fetch(`${url}/participatingpolls`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Token": sessionStorage.getItem("user")
          }
        }).then((res) => res.json())
          .then((res) => {
            // console.log(res)
            // console.log("participating polls ", res["data"])
            if (res["data"].length > 0)
            {
              // console.log("participating polls[0].poll_id ", res["data"][0]["poll_id"])
              setSelectedParticipatingPollId(res["data"][0]["poll_id"])
            }
            setParticipatingPolls(res["data"])
            setTotalParticipatingPolls(res["data"].length)
            setParticipitingPollsLoading(false)
          })
    }
  
    useEffect(() => {
      setParticipatingPolls([]);
      setParticipitingPollsLoading(true);
      loadParticipatingPolls()
    }, [props]);
  
    const handleNavigate = (e) => {
      if (e.target.name === 'participatingpoll')
      {
        setSelectedParticipatingPollIndexId(selectedParticipatingPollIndexId => selectedParticipatingPollIndexId + parseInt(e.target.id))
        setSelectedParticipatingPollId(participatingPolls[selectedParticipatingPollIndexId + parseInt(e.target.id)]['poll_id'])
      }
    }

    const handleCalcPoints = async (e) => {
      // console.log(e.target)
      let pollId = parseInt(e.target.attributes.poll_id.value)
      // console.log(pollId)
      let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
      await fetch(`${url}/calcpoints`,
      {
          method: "PUT",
          headers: {
              "Accept" : "application/json",
              "Content-Type": "application/json",
              "Token": sessionStorage.getItem("user")
          },
          body: JSON.stringify(
              {
                poll_id : pollId
              }
          )
      }).then((res) => res.json()).then(res => {
          // console.log(res)
          // // console.log(res["data"])
          // setVotingSection(res["data"])
          // setActiveTab("Votes")
      });
    }

    return (
      <>
        <div className="activePollContainer">
          {participatingPollsLoading ? (
             
            <p> Loading...</p>
          ) : (
            <>
              {/* Participating Poll Start */}
              <>
                <div className="participatingPollsContainer">
                  <span className="participatingPollsText">
                    My Polls
                  </span>
                  <span>
                    <button className={selectedParticipatingPollIndexId > 0 ? "participatingPollNavBtn participatingPollNavLeftBtn" : "participatingPollNavBtnDisabled participatingPollNavLeftBtn"}
                            id = '-1'
                            name = 'participatingpoll'
                            disabled = {selectedParticipatingPollIndexId <= 0}
                            onClick={handleNavigate}
                    > 
                      &lt;
                    </button>
                  </span>
                  <span>
                    {
                      participatingPolls.map((poll, index) => {
                        return(
                          (index === selectedParticipatingPollIndexId &&
                            <span key = {poll.poll_id}>
                              {poll.poll_name}
                            </span>
                          )
                        )
                      })
                    }
                  </span>
                  <span>
                  <button className={selectedParticipatingPollIndexId < totalParticipatingPolls-1? "participatingPollNavBtn participatingPollNavRightBtn" : "participatingPollNavBtnDisabled participatingPollNavRightBtn"}
                          id = '1'
                          name = 'participatingpoll'
                          disabled = {selectedParticipatingPollIndexId >= totalParticipatingPolls-1}
                          onClick={handleNavigate}
                  > 
                    &gt;
                  </button>
                  </span>
                  <span>
                    {
                      participatingPolls.map((poll) => {
                        return(
                          (poll.poll_id === selectedParticipatingPollId && poll.is_admin === 'Y' &&
                            <span key = {poll.poll_id}>
                              <button
                                className="adminCalculatePoints"
                                poll_id = {poll.poll_id}
                                onClick={handleCalcPoints}
                              >
                                +/-
                              </button>
                            </span>
                          )
                        )
                      })
                    }
                  </span>
                </div>
              </>
              {/* Participating Poll End */}

              {/* Voting Section Start */}
              <>
                <VotingSection selectedParticipatingPollId={selectedParticipatingPollId}/>
              </>
              {/* Voting Section End */}
              
              {/* Vote Results Start */}
              <>
                {/* <VoteResults selectedParticipatingPollId={selectedParticipatingPollId}/> */}
              </>
              {/* Vote Results End */}
            </>
          )}
        </div>
      </>
    );
  }

  export {VoteMain}

