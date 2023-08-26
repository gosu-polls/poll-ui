import "./css/Profile.css";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// import axios from 'axios';

function GoogleAuth(props) {
  const [user, setUser] = useState([]);
  const [userSessionCookie, setUserSessionCookie] = useState();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      fetch(" https://polls-api.azurewebsites.net/login", {
        method: "POST",
        mode: 'cors',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: codeResponse,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          
          sessionStorage.setItem("user", JSON.stringify(res["data"]));
          setUserSessionCookie(JSON.parse(sessionStorage.getItem("user")));
          setUser(res["data"]);
          props.handleLogin({ email: res["data"]["email"], isLoggedIn: true });
        });
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      props.handleLogin({ email: null, isLoggedIn: false });
    },
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    sessionStorage.removeItem("user");
    setUserSessionCookie(null);
    props.handleLogin({ email: null, isLoggedIn: false });
  };

  useEffect(() => {
    setUserSessionCookie(JSON.parse(sessionStorage.getItem("user")));
  }, [user]);

  return (
    <div>
      {userSessionCookie ? (
        <>
          <div className="profileContainer">
            <span>
              <img
                className="profileImg"
                src={userSessionCookie.picture}
                referrerPolicy="no-referrer"
                alt="user image"
              />
            </span>
            <span>
              <button
                type="button"
                className="profileLogout"
                onClick={() => logOut()}
              >
                X
              </button>
            </span>
          </div>
        </>
      ) : (
        <button className="googleLogin" onClick={() => login()}>
          Sign in{" "}
        </button>
      )}
    </div>
  );
}
export { GoogleAuth };
