import { useEffect, useState } from "react";
import "./css/Poll.css";
import { Carousel, ProgressBar } from "react-bootstrap";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";

function PollHistoryDetail(props) {
  const [pollHistoryDetail, setPollHistoryDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(-1);

  
  const loadPollHistoryDetail = async () => {
    fetch("data.json", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if ("history" in res["data"]) setPollHistoryDetail(res["data"]["history"]);
        console.log(res["data"])
        setLoading(false);
      });
  };
  

  const handlePollHistoryItemClick = (e) => {
    console.log(e.target.id);
    setSelectedItem(parseInt(e.target.id));
  };

  useEffect(() => {
    setPollHistoryDetail([]);
    setLoading(true);
    loadPollHistoryDetail();
  }, [props]);


 
return (
  <>
    {loading ? (
      <p> Loading...</p>
    ) : (
      <>
        Polls
        <div className="list-group pollHistoryListDetailContainer">
          {pollHistoryDetail.map((poll, index) => {
            // console.log(selectedItem, poll.id)
            return (
              <div>
                {
                  <div class="match">
                      <span >
                      Match {poll.id}</span>
                      <div class="pollHistoryStack">                        
                        <ProgressBar label={ poll.countries[0] + -  ((poll.options.option1.length * 100 ) / (poll.options.option1.length + poll.options.option2.length + poll.options.option3.length) ) }
                                     className="progress pollHistoryResults" 
                                     now = {(poll.options.option1.length * 100 ) / (poll.options.option1.length + poll.options.option2.length + poll.options.option3.length) }                                      
                                     animateOnRender = {true} />                                                      
                          <div className="pollHistoryResultProfile">
                            {Object.keys(poll.options.option1).map((innerAttr, index) => {
                                return (
                                    <span key={index} className="pollHistoryResultProfileImg">  
                                    {poll.options.option1[index].initials}                                    
                                    <br/>
                                    </span>
                                )})
                            }                          
                          </div>
                     </div>                      
                     <div class="pollHistoryStack">
                        <ProgressBar label={ poll.countries[1] + -  ((poll.options.option2.length * 100 ) / (poll.options.option1.length + poll.options.option2.length + poll.options.option3.length) ) }
                                     className="progress pollHistoryResults" now = {(poll.options.option2.length * 100 ) / (poll.options.option1.length + poll.options.option2.length + poll.options.option3.length) } animateOnRender = {true} />                                                      
                          <div className="pollHistoryResultProfile">
                            {Object.keys(poll.options.option2).map((innerAttr, index) => {
                                return (
                                    <span key={index} className="pollHistoryResultProfileImg">  
                                    {poll.options.option2[index].initials}                                    
                                    <br/>
                                    </span>
                                )})
                            }                          
                          </div>
                     </div>
                     <div class="pollHistoryStack">                     
                        <ProgressBar label={ poll.countries[2] + - 0 }
                                     className="progressbar pollHistoryResults" now = {(poll.options.option3.length * 100 ) / (poll.options.option1.length + poll.options.option2.length + poll.options.option3.length) } animateOnRender = {true} />                                                      
                          <div className="pollHistoryResultProfile">
                            {Object.keys(poll.options.option3).map((innerAttr, index) => {
                                return (
                                    <span key={index} className="pollHistoryResultProfileImg">  
                                    {poll.options.option3[index].initials}                                    
                                    <br/>
                                    </span>
                                )})
                            }                          
                          </div>
                     </div>
                    </div>
                  }
                </div>                              
              );
            })}
          </div>           
        </>
      )}
    </>
  );
}

export { PollHistoryDetail };
 /*return (
      <div
        className="progress pollHistoryResults"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        
        <span id={poll.id} className="pollHistoryResultText"> ENG </span>
        <div className= "progress-bar w-75"></div>
        <span className="pollHistoryResultTextPercentage">75%</span>

      
        {/* <span className="pollHistoryResultProfileImg">KG</span>
            <span className="pollHistoryResultProfileImg">KK</span>
            <span className="pollHistoryResultProfileImg">AG</span> *//*}
            
      <div className="pollHistoryResultProfile">
        <span className="pollHistoryResultProfileImg">KG</span>
        <span className="pollHistoryResultProfileImg">KK</span>
        <span className="pollHistoryResultProfileImg">AG</span>
      </div>
      <div
        className="progress pollHistoryResults"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span className="pollHistoryResultText"> NZL </span>
        <div className="progress-bar w-25"></div>
        <span className="pollHistoryResultTextPercentage">25%</span>

        {/* <span className="pollHistoryResultProfileImg">KG</span>
            <span className="pollHistoryResultProfileImg">KK</span>
            <span className="pollHistoryResultProfileImg">AG</span> *//*}
      </div>
      <div className="pollHistoryResultProfile">
        <span className="pollHistoryResultProfileImg">SM</span>
        <span className="pollHistoryResultProfileImg">SN</span>
      </div>

      <div
        className="progress pollHistoryResults"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span className="pollHistoryResultText"> NR / Tie </span>
        <div className="progress-bar w-0"></div>
        <span className="pollHistoryResultTextPercentage"> 0% </span>
      </div>

      <div className="pollHistoryResultProfile">
        <span className="pollHistoryResultProfileImg">AR</span>
        <span className="pollHistoryResultProfileImg">RP</span>
      </div>
    </>     
  );
}*/