import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./signpages.css";

export default function SignInPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const handleClick = () => setIsTeacher(!isTeacher);

  // const handleSignIn = (e) => {
  //   e.preventDefault();
  //   fetch("http://127.0.0.1:5000/api/auth", {
  //     method: "POST",
  //     mode: "cors",
  //     cache: "no-cache",
  //     headers: {
  //       contentType: "application/json",
  //     },
  //     body: JSON.stringify({
  //       Username: userName,
  //       Password: password,
  //       isTeacher: isTeacher,
  //     }),
  //   }).then((err) => console.log(err));
  // };
  const handleSignIn = (e) => {
    e.preventDefault() ;
    let url = "http://0.0.0.0:5000/sign-in"
    let formData  = new FormData();
    formData.append('userName', userName);
    formData.append('password', password);
    formData.append('isTeacher', isTeacher);

    fetch(url, {
      method: 'POST',
      body: formData
    }).then( res => res.json())
    .then(data=>{
      localStorage.setItem('access_token', data.access_token);
      
      localStorage.setItem('username', data.username);

      if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
        window.location.replace("/")
      }else{
          alert(data.error);
      }
    }).catch(err => console.log(err));
  }

  return (
    <>
      <Navbar />
      <div className="signin centered">
        <h1>Sign Up</h1>
        <form>
          <input
            type="username"
            placeholder="Username"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label class="container">
            Are you a teacher?
            <input
              type="checkbox"
              onClick={(e) => handleClick(e)}
              checked={isTeacher}
            />
            <span class="checkmark" />
          </label>
          <div>
            <button onClick={handleSignIn}>Sign In</button>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
}
