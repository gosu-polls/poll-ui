import { useEffect, useState } from "react";
import "./css/Poll.css";

function VoteMain(props) {
    
    const [participatingPolls, setParticipatingPolls] = useState([])
    const [selectedParticipatingPollIndexId, setSelectedParticipatingPollIndexId] = useState(0)
    const [selectedParticipatingPollId, setSelectedParticipatingPollId] = useState(-1)
    const [participatingPollsLoading, setParticipitingPollsLoading] = useState(true)
    const [totalParticipatingPolls, setTotalParticipatingPolls] = useState(0)

    const [votingSection, setVotingSection] = useState([])
    const [pollQuestion, setPollQuestion] = useState();
    const [pollOptions, setPollOptions] = useState([]);
    const [pollCount, setPollCount] = useState(0)
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(-1);

    // GET API Calls
    const loadParticipatingPolls = async () => {
      await fetch("http://localhost:3003/participatingpolls", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Token": sessionStorage.getItem("user")
          }
        }).then((res) => res.json())
          .then((res) => {
            // console.log(res)
            console.log("participating polls ", res["data"])
            if (res["data"].length > 0)
            {
              console.log("participating polls[0].poll_id ", res["data"][0]["poll_id"])
              setSelectedParticipatingPollId(res["data"][0]["poll_id"])
            }
            setParticipatingPolls(res["data"])
            setTotalParticipatingPolls(res["data"].length)
            setParticipitingPollsLoading(false)
          })
    }

    const loadPolls = async () => {
      await fetch("http://localhost:3003/votesection", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Token": sessionStorage.getItem("user"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("vote section: ", res["data"])
          setPollCount(res["data"].length)
          setVotingSection(res["data"])
          setLoading(false);
        });
    };
    const handleCancelClick = (e) => {
      setSelectedOption(-1);
    };
    const handleSubmitClick = (e) => {
      console.log(selectedOption);
    };

    const handleOptionClick = (e) => {
      console.log("handleOptionClick ", e)
      console.log("handleOptionClick vote_detail_id", e.target.id);
      setSelectedOption(parseInt(e.target.id));
    };
  
    useEffect(() => {
      setParticipatingPolls([]);
      setParticipitingPollsLoading(true);
      loadParticipatingPolls()
      setPollOptions([]);
      setPollQuestion();
      setLoading(true);
      loadPolls();
    }, [props]);
  
    const handleNavigate = (e) => {
      if (e.target.name === 'participatingpoll')
      {
        setSelectedParticipatingPollIndexId(selectedParticipatingPollIndexId => selectedParticipatingPollIndexId + parseInt(e.target.id))
        // console.log('Selected Participating Poll: ', participatingPolls[selectedParticipatingPollIndexId + parseInt(e.target.id)])
        // console.log('Selected Participating Poll Poll_id: ', participatingPolls[selectedParticipatingPollIndexId + parseInt(e.target.id)]['poll_id'])
        setSelectedParticipatingPollId(participatingPolls[selectedParticipatingPollIndexId + parseInt(e.target.id)]['poll_id'])
        // setSelectedParticipatingPollId(participatingPolls[selectedParticipatingPollId + parseInt(e.target.id)]['poll_id'])
        // console.log(participatingPolls[selectedParticipatingPollIndexId + parseInt(e.target.id)]['poll_id'])
        // console.log(participatingPolls[selectedParticipatingPollIndexId + parseInt(e.target.id)]['poll_name'])
        // selectedParticipatingPollId(participatingPolls[selectedParticipatingPollId + parseInt(e.target.id)]['poll_id'])
        // console.log(selectedParticipatingPollIndexId + parseInt(e.target.id))
      }
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
                    Participating Polls
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
                </div>
              </>
              {/* Participating Poll End */}

              {/* Voting Section Start */}
              <>                
                <div className="activePollOptionContainer">
                  {votingSection.map((vote) => {
                      return (
                        (selectedParticipatingPollId === vote.poll_id &&
                          <div key={vote.poll_id}>
                            {
                              vote.data.map((vd) => {
                                return (
                                  <div key={vd.vote_title} >
                                    <div className="activePollTitle">{vd.vote_title}</div>
                                    {vd.vote_detail.map((vdd) => {
                                      return(
                                          <div key={vdd.vote_detail_id} className="activePollOptions">
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name={vd.vote_title}
                                                value={vdd.option}
                                                id={vdd.vote_detail_id}
                                                checked={vdd.vote_detail_id === selectedOption}
                                                onChange={handleOptionClick}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="flexRadioDefault1"
                                              >
                                                {vdd.option}
                                              </label>
                                            </div>
                                          </div>
                                      )}
                                      )
                                    }
                                    <div className="activePollActionsContainer">
                                      <button
                                        className="activePollActionButton"
                                        onClick={handleSubmitClick}
                                        disabled={pollCount === 0}
                                      >
                                        <span className="pollActionText"> Submit </span>
                                      </button>
                                      <button
                                        className="activePollActionButton"
                                        onClick={handleCancelClick}
                                        disabled={pollCount === 0}
                                      >
                                        <span className="pollActionText"> Cancel </span>
                                      </button>
                                    </div>
                                  </div>
                                )
                              })
                            }
                        </div>
                        )
                      )
                    })
                  }
                </div>
              </>
              {/* Voting Section End */}
            </>
          )}
        </div>
      </>
    );
  }

  export {VoteMain}