import { useEffect } from "react";
import { Collapsible } from './utils/Collapsible';
import { GroupMain } from "./GroupMain";
import { VoteMain } from "./VoteMain";
// import { VoteMainTest } from "./VoteMainTest";
import { PollHistoryList } from "./PollHistoryList";
import "./css/Poll.css";
import PollHistoryDashboard from "./PollHistoryDashboard";


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
            <div className="col pollHistoryListHeader">              
                <PollHistoryList />                
            </div>
            <div className="col pollHistoryDashboard">
            {/* <PollHistoryDetail  />*/}
            <PollHistoryDashboard />
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
