import { useEffect, useState } from "react";
import "./css/Poll.css";
import { PollHistoryDetail } from "./PollHistoryDetail";
import { Carousel, CarouselItem, ProgressBar } from "react-bootstrap";

function PollHistoryList(props) {
  const [pollHistory, setPollHistory] = useState([props]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState([props]);
    
 /*
  //disabling API code for time being
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
         console.log(res["data"])
        setLoading(false);
      });
  };
  */

  const loadPollHistory = async () => {
    fetch("data.json", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        //"Token": sessionStorage.getItem("user"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if ("history" in res["data"]) setPollHistory(res["data"]["history"]);
        console.log(res["data"])
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
          <Carousel controls fade interval={5000} >          
            {pollHistory.map((poll, index) => {
              // console.log(selectedItem, poll.id)
              return (                
                <CarouselItem itemID={poll.id} key={poll.id} >
                  {     
                    <div className ="match">Match - { poll.id +" "+ poll.question}                     
                    <br />
                       <label style={{color:"green"}}>Winner {poll.right} 🏴</label>
                      <div class="pollHistoryStack">                        
                        <ProgressBar label={ poll.countries[0] + " - " +  ((poll.options.option1.length * 100 ) / (poll.options.option1.length + poll.options.option2.length + poll.options.option3.length) )+ " %" }
                                     //className="progress pollHistoryResults" 
                                     className={
                                      poll.countries[0] === poll.right
                                        ? "progress-barW pollHistoryResults"
                                        : "progress pollHistoryResults"                                        
                                    }
                                     now = {25 + (poll.options.option1.length * 75 ) / (poll.options.option1.length + poll.options.option2.length + poll.options.option3.length) }                                      
                                     animateOnRender = {true}  />  
                                                                                         
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
                        <ProgressBar label={ poll.countries[1] + " - " +  ((poll.options.option2.length * 100 ) / (poll.options.option1.length + poll.options.option2.length + poll.options.option3.length) ) + " %" }
                                     className="progress pollHistoryResults" 
                                     now = {25 + (poll.options.option2.length * 75 ) / (poll.options.option1.length + poll.options.option2.length + poll.options.option3.length) } animateOnRender = {true} />                                                      
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
                        <ProgressBar label={ poll.countries[2] + " - " + (poll.options.option3.length * 100 ) / (poll.options.option1.length + poll.options.option2.length + poll.options.option3.length) + " %" }
                                     className="progressbar pollHistoryResults" 
                                     now = {25 +(poll.options.option3.length * 75 ) / (poll.options.option1.length + poll.options.option2.length + poll.options.option3.length) }                                      
                                     animateOnRender = {true} />                                                      
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
                </CarouselItem>                                                              
              );
            })}
          
          </Carousel>                     
        </>
      )}
    </>
  );

 
}



export { PollHistoryList };
