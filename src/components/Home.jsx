// import './css/home.css';
import './css/App.css'
import './css/Header.css';
import './css/Body.css'
import './css/Footer.css';
import React, {useEffect, useState} from "react";
import {GoogleAuth} from './GoogleProfile';
import {Polls} from './Polls';

function Header(props)
{
    useEffect(() => {
    }, [props])

    const handleLogin = ((e) => {
        props.handleLogin(e)
    })

    return (
        <>
            <div className='headerContainer'>
                <div className="header">
                    <span className="headerTitle">
                        <h1>Polls</h1>
                    </span>
                    <span className="headerProfile">
                        <GoogleAuth props={props} handleLogin={handleLogin}/>
                    </span>
                </div>
            </div>
        </>
    )
}

function Body(props, userProfile)
{
    useEffect(() => {
        // console.log('Body ' + props)
        // console.log(props)
        // console.log('Body ' + userProfile)
        // console.log(userProfile)
    }, [props])

    return (
        <>
            {/* {console.log("Body render")} */}
            <div className='bodyContainer'>
                <div className="body">
                    <Polls props={props} />
                </div>
            </div>
        </>
    )
}

function Footer(props)
{
    useEffect(() => {

    }, [props])
    return (
        <>
            <div className='footerContainer'>
                <div className='footer'>
                    <div className='footerText'>
                        <span> CWC - 2023 &#169; </span>
                    </div>
                </div>
            </div>
        </>
    )
}


function Home(props)
{
    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
    }, [props])

    const handleLogin= ((e) => {
        // console.log("Home -> handleLogin")
        // console.log("Home " + e)
        // console.log(e)
        // props = e
        setUserProfile(e)
    })

    return (
        <>
        {/* {console.log("Home render")} */}
            <div className="split">
                <Header props={props} handleLogin={handleLogin}/>
                <Body props={props} userProfile={userProfile}/>
                <Footer />
            </div>
        </>
    )
}
// export {Header, Footer, Body}
export {Home}