import { useEffect, useState } from "react";
import { Collapsible } from './utils/Collapsible';
import { GroupMain } from "./GroupMain";
import { VoteMain } from "./VoteMain";
// import { VoteMainTest } from "./VoteMainTest";
// import { Report } from "./Report";
// import { Dashboard } from "./Chartjs";
import { PollHistoryList } from "./PollHistoryList";
import { PollHistoryDetail } from "./PollHistoryDetail";
import { SuperUser } from "./SuperUser";
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

  const [isSuperUser, setIsSuperUser] = useState(0)
  
  const loadSuperUserStatus = async () => {
    let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
    await fetch(`${url}/superuser`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Token: sessionStorage.getItem("user"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res["data"])
        setIsSuperUser(parseInt(res["data"]))
        // setIsSuperUser(res["data"]["is_super_user"])
      });
  };

  useEffect(() => {
    loadSuperUserStatus()
  });

  return (
    <>
      {isSuperUser === 1 && <>
      <Collapsible label="Super User" tag="superuser" >
        <SuperUser />
      </Collapsible> 
      </>
      } 
      <Collapsible label="Groups" tag="groups">
        
        <GroupMain />
      </Collapsible>
      
      <VoteMain />
      {/* <Dashboard /> */}
      {/* <Report /> */}
      {/* <VoteMainTest /> */}
      {/* <PollHistory /> */}
    </>
  );
}
export { PollsMain };
