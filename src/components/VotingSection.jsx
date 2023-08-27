import { useEffect, useState } from "react";
import Select from 'react-select';
import "./css/Poll.css";

function VotingSection(props) {
    const [activeTab, setActiveTab] = useState('Votes');
    const [votingSection, setVotingSection] = useState([])

    const handleTabClick = (e) => {
        if (parseInt(e.target.id) === 0)
          setActiveTab('Votes')
        else
          setActiveTab('Admin')
    }
    
    const loadPolls = async () => {
        await fetch(" https://polls-api.azurewebsites.net/votesection", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Token": sessionStorage.getItem("user"),
          },
        })
          .then((res) => res.json())
          .then((res) => {
            // console.log(res["data"])
            setVotingSection(res["data"])  
          });
    };
    
    const handleOptionClick = (e) => {
        const updatedVotingSection = votingSection.slice()
        updatedVotingSection.map((vs) => (vs.poll_id === parseInt(e.target.attributes.poll_id.value) ?
                                              vs.data.map((d) => (d.selected_vote_detail_id = d.vote_id === parseInt(e.target.attributes.vote_id.value) ?
                                                  parseInt(e.target.id) : d.selected_vote_detail_id)):
                                          void 0))
  
        setVotingSection(updatedVotingSection)
      };


    const handleSubmitClick = async (e) => {
        let pollId = parseInt(e.currentTarget.attributes.poll_id.value)
        let voteId = parseInt(e.currentTarget.attributes.vote_id.value)
        let selectedVoteId = votingSection.filter((vs) => vs.poll_id === parseInt(e.currentTarget.attributes.poll_id.value))[0].data.filter((p) => p.vote_id === parseInt(e.currentTarget.attributes.vote_id.value))[0].selected_vote_detail_id
        
        // console.log(parseInt(e.currentTarget.attributes.poll_id.value), 
        //             parseInt(e.currentTarget.attributes.vote_id.value), 
        //             votingSection.filter((vs) => vs.poll_id === parseInt(e.currentTarget.attributes.poll_id.value))[0].data.filter((p) => p.vote_id === parseInt(e.currentTarget.attributes.vote_id.value))[0].selected_vote_detail_id)
        
        await fetch(" https://polls-api.azurewebsites.net/savevote",
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
        // console.log(res)
        // console.log(res["data"])
      });
    };

    const handleVoteFreeze = async (e) => {
        let pollId = parseInt(e.currentTarget.attributes.poll_id.value)
        let voteId = parseInt(e.currentTarget.attributes.vote_id.value)
        let isOpen = e.currentTarget.attributes.is_open.value
        // console.log(pollId, voteId, isOpen)
        await fetch(" https://polls-api.azurewebsites.net/freezevote",
        {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("user")
            },
            body: JSON.stringify(
                {
                  poll_id : pollId,
                  vote_id : voteId,
                  is_open: isOpen
                }
            )
        }).then((res) => res.json()).then(res => {
            // console.log(res)
            // console.log(res["data"])
            setVotingSection(res["data"])
            setActiveTab("Votes")
        });
    }

    const handleRightAnswerChange = async (e) => {
        // console.log(e.target)
        // console.log(e.value)
        // console.log(e.poll_id)
        // console.log(e.vote_id)
        // console.log("before : ", votingSection)
        const updatedVotingSection = votingSection.slice()

        updatedVotingSection.map((vs) => (vs.poll_id === parseInt(e.poll_id) ?
                                                            vs.data.map((d) => (d.vote_id === parseInt(e.vote_id) ?
                                                                d.vote_detail.map((vdd) => (vdd.is_right = vdd.vote_detail_id === parseInt(e.value) ? 'Y' : 'N'))
                                                            : void 0))
                                                        : void 0))
  
        setVotingSection(updatedVotingSection)
        // console.log("after : ", votingSection)
    }

    const handleRightAnswerSubmit = async (e) => {
        // console.log(e.currentTarget)
        let pollId = parseInt(e.currentTarget.attributes.poll_id.value)
        let voteId = parseInt(e.currentTarget.attributes.vote_id.value)
        let voteDetail = votingSection.filter((vs) => vs.poll_id === pollId)[0].data.filter((p) => p.vote_id === voteId)[0]['vote_detail']
        // console.log(pollId, voteId, voteDetail)
 
        await fetch(" https://polls-api.azurewebsites.net/submitanswer",
        {
            method: "PUT",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("user")
            },
            body: JSON.stringify(
                {
                  poll_id : pollId,
                  vote_id : voteId,
                  vote_detail : voteDetail
                }
            )
        }).then((res) => res.json()).then(res => {
            // console.log(res)
            // console.log(res["data"])
            setVotingSection(res["data"])
            setActiveTab("Votes")
        });
    }

    useEffect(() => {
        loadPolls();
      }, [props]);

    return (
        <>                
            <div className="activePollOptionContainer">
                {votingSection.map((vote) => {
                    return (
                    (props.selectedParticipatingPollId === vote.poll_id &&
                        <div key={vote.poll_id}>
                        {
                            vote.data.map((vd) => {
                            return (
                                <div key={vd.vote_title} >
                                    <div className="activePollTitle">
                                        <span>{vd.vote_title}</span>
                                    </div>
                                    <div className="Tabs">
                                        <ul className="nav">
                                        <li id = {0}
                                            className={activeTab === "Votes" ? "active" : ""}
                                            onClick={handleTabClick}
                                        >
                                            Votes
                                        </li>
                                        {vote.is_admin === 'Y' && 
                                            <li id = {1}
                                                className={activeTab === "Admin" ? "active" : ""}
                                                onClick={handleTabClick}
                                            >
                                            Admin
                                            </li>
                                        }
                                        </ul>
                                        <div className="outlet">
                                        {activeTab === "Votes" ? 
                                            <>
                                            {vd.vote_detail.map((vdd) => {
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
                                                            checked={vdd.vote_detail_id === vd.selected_vote_detail_id ? true : false}
                                                            onChange={handleOptionClick}
                                                            option = {vdd['option']}
                                                            disabled = {vd.is_open === "Y" ? false : true }
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
                                                disabled = {vd.is_open === "N"}
                                            >
                                                <span className="pollActionText"> {vd.is_open === "Y" ? "Submit" : "Frozen" } </span>
                                            </button>
                                            </div>
                                        </>
                                        : 
                                            <>
                                                <div className="form-check">

                                                <div className="container text-center">
                                                    <div className="row">
                                                        <div className="col adminLabel">
                                                            Click to {vd.is_open === "Y" ? "Freeze Vote" : "Unfreeze Vote" } 
                                                        </div>
                                                        <div className="col">
                                                            <button
                                                                className="activePollActionButton"
                                                                poll_id = {vote.poll_id}
                                                                vote_id = {vd.vote_id}
                                                                is_open = {vd.is_open}
                                                                onClick={handleVoteFreeze}
                                                            >
                                                                <span className="adminFreezeButton"> {vd.is_open === "Y" ? "Freeze Vote" : "Unfreeze Vote" } </span>
                                                            </button>
                                                        </div>
                                                    </div>


                                                    <div className="row">
                                                        <div className="col adminLabel">
                                                            {/* Current Answer Selected:  
                                                                { vd.vote_detail.map((vdd) => {
                                                                    return vdd.is_right === 'Y' ? vdd.option : void 0
                                                                }) } */}
                                                            Update the Right Answer
                                                        </div>
                                                    </div>
                                                    <div className="row">

                                                        <div className="col">
                                                            
                                                        <Select 
                                                                    // defaultValue={task} 
                                                                    onChange={handleRightAnswerChange} 
                                                                    // value={vd.vote_detail}
                                                                    className='adminRightAnswerDropDown' 
                                                                    options = { vd.vote_detail.map((vdd) => {
                                                                        return {'label': vdd.option, 'value': vdd.vote_detail_id, 'poll_id': vote.poll_id, 'vote_id': vd.vote_id}
                                                                    }) }
                                                            />
                                                        </div>
                                                        <div className="col">

                                                            <button
                                                                className="activePollActionButton"
                                                                poll_id = {vote.poll_id}
                                                                vote_id = {vd.vote_id}
                                                                vote_detail_id = {vd.vote_detail_id}
                                                                onClick={handleRightAnswerSubmit}
                                                            >
                                                                <span className="adminFreezeButton"> Submit Answer</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>

                                                </div>

                                                {/* <div className="form-check">
                                                    <button
                                                        className="activePollActionButton"
                                                        poll_id = {vote.poll_id}
                                                        vote_id = {vd.vote_id}
                                                        is_open = {vd.is_open}
                                                        onClick={handleVoteFreeze}
                                                    >
                                                        <span className="adminFreezeButton"> {vd.is_open === "Y" ? "Freeze Vote" : "Unfreeze Vote" } </span>
                                                    </button>
                                                </div>

                                                <div className="form-check">
                                                    <label
                                                        className="pollActionText"
                                                    >
                                                        Select the Right Answer
                                                    </label>
                                                        <div> 
                                                            <Select 
                                                                    // defaultValue={task} 
                                                                    onChange={handleRightAnswerChange} 
                                                                    // value={vd.vote_detail}
                                                                    className='adminRightAnswerDropDown' 
                                                                    options = { vd.vote_detail.map((vdd) => {
                                                                        return {'label': vdd.option, 'value': vdd.vote_detail_id, 'poll_id': vote.poll_id, 'vote_id': vd.vote_id}
                                                                    }) }
                                                            />
                                                            <button
                                                                className="activePollActionButton"
                                                                poll_id = {vote.poll_id}
                                                                vote_id = {vd.vote_id}
                                                                vote_detail_id = {vd.vote_detail_id}
                                                                onClick={handleRightAnswerSubmit}
                                                            >
                                                                <span className="adminFreezeButton"> Submit Answer </span>
                                                            </button>
                                                        </div>
                                                </div> */}
                                            </>
                                        }
                                        </div>
                                    </div>
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
    )
}

export {VotingSection}