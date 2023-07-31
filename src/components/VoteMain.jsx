import { useEffect, useState } from "react";
import "./css/Poll.css";

function VoteMain(props) {
    
    const [participatingPolls, setParticipatingPolls] = useState([])
    const [selectedParticipatingPollId, setSelectedParticipatingPollId] = useState(0)
    const [participatingPollsLoading, setParticipitingPollsLoading] = useState(true)
    const [totalParticipatingPolls, setTotalParticipatingPolls] = useState(0)

    const [pollQuestion, setPollQuestion] = useState();
    const [pollOptions, setPollOptions] = useState([]);
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
            // console.log(res["data"])
            setParticipatingPolls(res["data"])
            setTotalParticipatingPolls(res["data"].length)
            setParticipitingPollsLoading(false)
          })
    }

    const loadPolls = async () => {
      await fetch("http://localhost:3003/poll", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Token": sessionStorage.getItem("user"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if ("question" in res["data"]) setPollQuestion(res["data"]["question"]);
          if ("options" in res["data"]) setPollOptions(res["data"]["options"]);
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
      console.log(e.target.id);
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
      if (e.target.name == 'participatingpoll')
      {
        setSelectedParticipatingPollId(selectedParticipatingPollId => selectedParticipatingPollId + parseInt(e.target.id))
      }
    }

    return (
      <>
        <div className="activePollContainer">
          {participatingPollsLoading ? (
            <p> Loading...</p>
          ) : (
            <>
              <div className="participatingPollsContainer">
                <span className="participatingPollsText">
                  Participating Polls
                </span>
                <span>
                  <button className={selectedParticipatingPollId > 0 ? "participatingPollNavBtn participatingPollNavLeftBtn" : "participatingPollNavBtnDisabled participatingPollNavLeftBtn"}
                          id = '-1'
                          name = 'participatingpoll'
                          disabled = {selectedParticipatingPollId <= 0}
                          onClick={handleNavigate}
                  > 
                    &lt;
                  </button>
                </span>
                <span>
                  {
                    participatingPolls.map((poll, index) => {
                      return(
                        (index === selectedParticipatingPollId &&
                          <span key = {poll.poll_id}>
                            {poll.poll_name}
                          </span>
                        )
                      )
                    })
                  }
                </span>
                <span>
                
                <button className={selectedParticipatingPollId < totalParticipatingPolls-1? "participatingPollNavBtn participatingPollNavRightBtn" : "participatingPollNavBtnDisabled participatingPollNavRightBtn"}
                          id = '1'
                          name = 'participatingpoll'
                          disabled = {selectedParticipatingPollId >= totalParticipatingPolls-1}
                          onClick={handleNavigate}
                > 
                  &gt;
                </button>
                </span>
              </div>

              <div className="activePollQuestion">{pollQuestion}</div>
              <div className="activePollOptionContainer">
                {pollOptions.map((poll) => {
                  return (
                    <div key={poll.id} className="activePollOptions">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="pollOption"
                          value={poll.opt}
                          id={poll.id}
                          checked={poll.id === selectedOption}
                          onChange={handleOptionClick}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          {poll.opt}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="activePollActionsContainer">
                <button
                  className="activePollActionButton"
                  onClick={handleSubmitClick}
                >
                  {" "}
                  <span className="pollActionText"> Submit </span>
                </button>
                <button
                  className="activePollActionButton"
                  onClick={handleCancelClick}
                >
                  {" "}
                  <span className="pollActionText"> Cancel </span>
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );
  }

  export {VoteMain}