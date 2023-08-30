import { useState, useEffect } from "react";
import "./css/VoteResults.css";

function VoteResults(props) {
    const [voteResults, setVoteResults] = useState([])
    const [selectedItem, setSelectedItem] = useState(-1);

    const loadPollResults = async () => {
        let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
        await fetch(`${url}/grouppoints`, {
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
            setVoteResults(res["data"])  
          });
    }

    useEffect(() => {
        loadPollResults();
      }, [props]);
    return (
        <>
            <div className="voteResultContainer">
                <div className="voteResultTitle">
                    Vote Results
                </div>


            <div className="outlet">
            {
                voteResults.map((vr) => {
                    return (
                        props.selectedParticipatingPollId === parseInt(vr.poll_id) &&
                            <div key = {vr.poll_id}>
                                <div className="pollHistoryContainer">
                                    <div className="container">
                                    <div className="row">
                                        <div className="col-2 pollHistoryListHeader">
                                        {vr.results.map((vrr) =>
                                            {
                                                return (
                                                    <div key= {vrr.group_id} className="voteResultsGroupOption">
                                                        <div className="form-check">
                                                        <div className="row">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                id={vrr.group_id}
                                                                checked={selectedItem === vrr.group_id ? true : false}
                                                                onChange={() => setSelectedItem(vrr.group_id)}
                                                                option = {vrr.group_name}
                                                            />
                                                            
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="flexRadioDefault1"
                                                            >
                                                                {vrr.group_name}
                                                            </label>
                                                        </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>
                                        <div className="col-6 pollHistory">
                                            Details
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                        {vr.results.map((vrr) =>
                                            {
                                                return (
                                                    <div key= {vrr.group_id} className="voteResultsGroupOption">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                id={vrr.group_id}
                                                                checked={selectedItem === vrr.group_id ? true : false}
                                                                onChange={() => setSelectedItem(vrr.group_id)}
                                                                option = {vrr.group_name}
                                                            />
                                                            
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="flexRadioDefault1"
                                                            >
                                                                {vrr.group_name}
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        </td>
                                        <td>
                                            <div className="voteResultsData">
                                            {vr.results.map((vrr) =>
                                                {
                                                    return (
                                                        <div key = {vrr.points_data}>
                                                            
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                
                                        {/* {vr.results.map((vrr) =>
                                            {
                                                return (
                                                    <div key= {vrr.group_id} className="voteResultsGroupOption">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                id={vrr.group_id}
                                                                checked={selectedItem === vrr.group_id ? true : false}
                                                                onChange={() => setSelectedItem(vrr.group_id)}
                                                                option = {vrr.group_name}
                                                            />
                                                            
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="flexRadioDefault1"
                                                            >
                                                                {vrr.group_name}
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        } */}
                                </div>
                    )
                })
            }
          </div>
            </div>

        </>
    )
}
export {VoteResults}