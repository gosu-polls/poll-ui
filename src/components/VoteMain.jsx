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
          // console.log("vote section: ", res["data"])
          setPollCount(res["data"].length)
          
          setVotingSection(res["data"])
          setLoading(false);

        });
    };
    const handleCancelClick = (e) => {
      setSelectedOption(-1);
    };
    const handleSubmitClick = async (e) => {
      // console.log()
      // const selectedVotingSection = votingSection.slice()
      let pollId = parseInt(e.currentTarget.attributes.poll_id.value)
      let voteId = parseInt(e.currentTarget.attributes.vote_id.value)
      let selectedVoteId = votingSection.filter((vs) => vs.poll_id === parseInt(e.currentTarget.attributes.poll_id.value))[0].data.filter((p) => p.vote_id === parseInt(e.currentTarget.attributes.vote_id.value))[0].selected_vote_detail_id
      
      console.log(parseInt(e.currentTarget.attributes.poll_id.value), 
                  parseInt(e.currentTarget.attributes.vote_id.value), 
                  votingSection.filter((vs) => vs.poll_id === parseInt(e.currentTarget.attributes.poll_id.value))[0].data.filter((p) => p.vote_id === parseInt(e.currentTarget.attributes.vote_id.value))[0].selected_vote_detail_id)
      
      await fetch("http://localhost:3003/savevote",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Token": sessionStorage.getItem("user")
        },
        body: JSON.stringify(
          {
            poll_id : pollId,
            vote_id : voteId,
            selected_vote_id : selectedVoteId
          }
        )
      }
    ).then((res) => res.json()).then(res => {
      console.log(res)
      console.log(res["data"])
      
      // setMyGroups(res["data"])
      // setLoadingMyGroups(false);
      // setTotalMyGroups(res["data"].length)

      // setGroupName('')
    });
      // .filter((p) => p.vote_id === parseInt(e.currentTarget.attributes.vote_id.value))
      // console.log(selectedVotingSection.filter((vs) => vs.poll_id = parseInt(e.currentTarget.attributes.poll_id.value)))
      // console.log(e.target.id)
      // console.log("handleSubmitMe: poll_id / vote_id: ", e.target.attributes.poll_id.value + " / " + e.target.attributes.vote_id.value)
      // console.log("submit:", votingResults.filter(vr => vr.poll_id ===  parseInt(e.target.attributes.poll_id.value) && vr.vote_id === parseInt(e.target.attributes.vote_id.value))[0].vote_detail_id)
    };

    // const handleSubmitForm = (e) => {
    //   e.preventDefault()
    //   console.clear()
    //   console.log("handle Submit Click Form Start")
    //   console.log("e: ", e)
    //   console.log("e.target: ", e.target)
    //   console.log("e.target: ", e.targetform)
    //   // console.log(inputs)
    //   console.log("handle Submit Click Form End")
    // }

    const handleOptionClick = (e) => {
      const updatedVotingSection = votingSection.slice()
      // console.log("votingSection before :", votingSection)
      updatedVotingSection.map((vs) => {vs.poll_id === parseInt(e.target.attributes.poll_id.value) ?
                                            vs.data.map((d) => {d.selected_vote_detail_id = d.vote_id === parseInt(e.target.attributes.vote_id.value) ?
                                                parseInt(e.target.id) : d.selected_vote_detail_id}):
                                        void 0})

      setVotingSection(updatedVotingSection)
      // console.log("votingSection after :", votingSection)
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
        setSelectedParticipatingPollId(participatingPolls[selectedParticipatingPollIndexId + parseInt(e.target.id)]['poll_id'])
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
                                    {/* <form tag = {vd.vote_title} onSubmit={handleSubmitForm}> */}
                                    <div className="activePollTitle">{vd.vote_title}</div>
                                    {vd.vote_detail.map((vdd) => {
                                      // console.log(vote.poll_id, vd.vote_id)
                                      // console.log(votingResults)
                                      // console.log(votingResults.filter(vr => vr.poll_id === vote.poll_id))
                                      
                                      // console.log(votingResults.filter(vr => vr.poll_id === vote.poll_id && vr.vote_id === vd.vote_id)[0].vote_detail_id === vdd.vote_detail_id ? true : false)
                                      // console.log(votingResults.filter(vr => vr.poll_id === vote.poll_id && vr.vote_id === vd.vote_id))
                                      return(
                                          <div key={vdd.vote_detail_id} className="activePollOptions">
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="radio"
                                                name={vd.vote_title}
                                                value={vdd.option}
                                                id={vdd.vote_detail_id}
                                                poll_id = {vote.poll_id}
                                                vote_id = {vd.vote_id}
                                                // checked={vdd.vote_detail_id === selectedOption}
                                                // checked={votingResults.filter(vr => vr.poll_id === vote.poll_id && vr.vote_id === vd.vote_id)[0].vote_detail_id === vdd.vote_detail_id ? true : false}
                                                checked={vdd.vote_detail_id === vd.selected_vote_detail_id ? true : false}
                                                onChange={handleOptionClick}
                                                option = {vdd['option']}
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
                                        name = {vd.vote_id.toString()}
                                        id = {vd.vote_id.toString()} 
                                        poll_id = {vote.poll_id}
                                        vote_id = {vd.vote_id}
                                        value = {vd.vote_id}
                                        className="activePollActionButton"
                                        onClick={handleSubmitClick}
                                        type="submit"
                                      >
                                        <span className="pollActionText"> Submit </span>
                                        {/* Submit */}
                                      </button>
                                      {/* <button 
                                        name = {vd.vote_id.toString()}
                                        id = {vd.vote_id.toString()} 
                                        poll_id = {vote.poll_id}
                                        vote_id = {vd.vote_id}
                                        value = {vd.vote_id}
                                        className="activePollActionButton"
                                        onClick={handleSubmitClick}
                                        type="submit"
                                      >
                                        Submit 2
                                      </button> */}
                                      
                                      {/* <button
                                        className="activePollActionButton"
                                        onClick={handleCancelClick}
                                        disabled={pollCount === 0}
                                      >
                                        <span className="pollActionText"> Cancel </span>
                                      </button> */}

                                      {/* <input type="submit" value = "submit form"/> */}
                                    
                                    </div>
                                    
                                    {/* </form> */}
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