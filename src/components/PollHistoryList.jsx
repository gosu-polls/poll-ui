import { useEffect, useState } from "react";
import "./css/Poll.css";

function PollHistoryList(props) {
  const [pollHistory, setPollHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(-1);

  const loadPollHistory = async () => {
    await fetch("http://localhost:3003/pollhistory", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Token": sessionStorage.getItem("user"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if ("history" in res["data"]) setPollHistory(res["data"]["history"]);
        // console.log(res["data"])
        setLoading(false);
      });
  };

  const handlePollHistoryItemClick = (e) => {
    console.log(e.target.id);
    setSelectedItem(parseInt(e.target.id));
  };

  useEffect(() => {
    setPollHistory([]);
    setLoading(true);
    loadPollHistory();
  }, [props]);

  return (
    <>
      {loading ? (
        <p> Loading...</p>
      ) : (
        <>
          Polls
          <ul className="list-group pollHistoryListDetailContainer">
            {pollHistory.map((poll, index) => {
              // console.log(selectedItem, poll.id)
              return (
                <div key={poll.id}>
                  {
                    <li
                      key={poll.id}
                      id={poll.id}
                      className={
                        selectedItem === poll.id
                          ? "list-group-item pollHistoryListDetail active"
                          : "list-group-item pollHistoryListDetail"
                      }
                      // onClick={handlePollHistoryItemClick}
                      onClick={() => setSelectedItem(poll.id)}
                    >
                      {poll.question}
                    </li>
                  }
                </div>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

export { PollHistoryList };
