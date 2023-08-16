import { useEffect } from "react";
import { Collapsible } from './utils/Collapsible';
import { GroupMain } from "./GroupMain";
import { VoteMain } from "./VoteMain";
// import { VoteMainTest } from "./VoteMainTest";
import { PollHistoryList } from "./PollHistoryList";
import { PollHistoryDetail } from "./PollHistoryDetail";
import "./css/Poll.css";


function PollHistory(props) {
  useEffect(() => {}, [props]);

  return (
    <>
      <div className="pollHistoryTitle">
        Poll History
      </div>
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

function PollsMain(props) {
  useEffect(() => {});

  return (
    <>
      <Collapsible label="Groups" >
        <GroupMain />
      </Collapsible>
      
      <VoteMain />
      {/* <VoteMainTest /> */}
      <PollHistory />
    </>
  );
}
export { PollsMain };
