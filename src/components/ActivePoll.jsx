import { useEffect, useState } from "react";
import "./css/Poll.css";

function ActivePoll(props) {
    const [pollQuestion, setPollQuestion] = useState();
    const [pollOptions, setPollOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(-1);
  
    const loadPolls = async () => {
      await fetch("http://localhost:3003/poll", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Token: sessionStorage.getItem("user"),
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
      // console.log(selectedOption);
    };
    const handleOptionClick = (e) => {
      // console.log(e.target.id);
      setSelectedOption(parseInt(e.target.id));
    };
  
    useEffect(() => {
      setPollOptions([]);
      setPollQuestion();
      setLoading(true);
      loadPolls();
    }, [props]);
  
    return (
      <>
        <div className="activePollContainer">
          {loading ? (
            <p> Loading...</p>
          ) : (
            <>
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

  export {ActivePoll}