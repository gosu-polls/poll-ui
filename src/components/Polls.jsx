import { useEffect, useState } from "react";
import { PollJoiner } from "./PollJoiner";
import { ActivePoll } from "./ActivePoll";
import { PollHistoryList } from "./PollHistoryList";
import { PollHistoryDetail } from "./PollHistoryDetail";
import "./css/Poll.css";


function PollHistory(props) {
  useEffect(() => {}, [props]);

  return (
    <>
      <div className="pollHistoryTitle">Poll History</div>
      <div className="pollHistoryContainer">
        <div className="container">
          <div className="row">
            <div className="col-4 pollHistoryListHeader">
              <PollHistoryList />
            </div>
            <div className="col pollHistory">
              <PollHistoryDetail />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Polls(props) {
  useEffect(() => {});

  return (
    <>
      <PollJoiner />
      <ActivePoll />
      <PollHistory />
    </>
  );
}
export { Polls };
