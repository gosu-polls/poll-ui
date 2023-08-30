import "./css/SuperUser.css";
import { useEffect, useState } from "react";
import Select from 'react-select';


function SuperUser(props) {
    const [polls, setPolls] = useState([])
    const [selectecPollId, setSelectedPollId] = useState(-1)
    const loadPolls = async () => {
        let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
        await fetch(`${url}/availablepolls`,
        {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("user")
            },
            body: JSON.stringify(
            )
        }).then((res) => res.json()).then(res => {
            // console.log(res["data"])
            setPolls(res["data"])
        });
    }
    useEffect(() => {
        loadPolls()
    }, [props])


    const handleResetCache = async () =>{
        let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
        await fetch(`${url}/suresetcache`,
        {
            method: "PUT",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("user")
            },
            body: JSON.stringify(
            )
        }).then((res) => res.json()).then(res => {
        });
    }

    const handleUsers = async () =>{
        let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
        await fetch(`${url}/sugetusers`,
        {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("user")
            },
            body: JSON.stringify(
            )
        }).then((res) => res.json()).then(res => {
            console.log(res["data"])
        });
    }

    const handleGroups = async () =>{
        let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
        await fetch(`${url}/sugetgroups`,
        {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("user")
            },
            body: JSON.stringify(
            )
        }).then((res) => res.json()).then(res => {
            console.log(res["data"])
        });
    }

    const handleGroupDetail = async () =>{
        let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
        await fetch(`${url}/sugetgroupdetail`,
        {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("user")
            },
            body: JSON.stringify(
            )
        }).then((res) => res.json()).then(res => {
            console.log(res["data"])
        });
    }

    const handlePollChange = async (e) => {
        // console.log(e)
        setSelectedPollId(e.poll_id)
    }

    const handleVote = async () => {
        if (selectecPollId !== -1){
            let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
            await fetch(`${url}/sugetvote/${selectecPollId}`,
            {
                method: "GET",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json",
                    "Token": sessionStorage.getItem("user")
                },
                body: JSON.stringify(
                )
            }).then((res) => res.json()).then(res => {
                console.log(res["data"])
            });
        }
    }

    const handleVoteDetail = async () => {
        if (selectecPollId !== -1){
            let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
            await fetch(`${url}/sugetvotedetail/${selectecPollId}`,
            {
                method: "GET",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json",
                    "Token": sessionStorage.getItem("user")
                },
                body: JSON.stringify(
                )
            }).then((res) => res.json()).then(res => {
                console.log(res["data"])
            });
        }
        
    }

    const handleBallot = async () => {
        if (selectecPollId !== -1){
            let url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_HOST : process.env.REACT_APP_DEV_API_HOST
            await fetch(`${url}/sugetballot/${selectecPollId}`,
            {
                method: "GET",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json",
                    "Token": sessionStorage.getItem("user")
                },
                body: JSON.stringify(
                )
            }).then((res) => res.json()).then(res => {
                console.log(res["data"])
            });
        }
        
    }
    return (
        <>
            <div className="superUserContainer">

                <div className="row">
                    <div className="col">
                        <button className="resetCacheBtn"
                                onClick={handleResetCache}
                        >
                            Reset Cache
                        </button>
                    </div>

                    <div className="col">
                        <button className="resetCacheBtn"
                            onClick={handleUsers}
                        >
                            Users
                        </button>
                    </div>
                    <div className="col">
                    
                        <button className="resetCacheBtn"
                                onClick={handleGroups}
                        >
                            Groups
                        </button>
                    </div>

                    <div className="col">

                        <button className="resetCacheBtn"
                                onClick={handleGroupDetail}
                        >
                            Group Detail
                        </button>
                    </div>
                
                </div>
                <div className="row">
                    <div className="col">
                    
                    <Select
                        className='superUserPollsDropDown' 
                        onChange = {handlePollChange}
                        options = {polls.map((p) => {
                            return {'label': p.poll_name, 'value': p.poll_id, 'poll_id': p.poll_id}
                        })}
                    />
                    </div>

                    <div className="col">
                        <button className="resetCacheBtn"
                                onClick={handleVote}
                        >
                            Vote
                        </button>
                    </div>

                    <div className="col">
                        <button className="resetCacheBtn"
                                onClick={handleVoteDetail}
                        >
                            Vote Detail
                        </button>
                    </div>

                    <div className="col">
                        <button className="resetCacheBtn"
                                onClick={handleBallot}
                        >
                            Ballot
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export {SuperUser}