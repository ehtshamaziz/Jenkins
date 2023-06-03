import React from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const [user, setUser] = React.useState()
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("helloo");

    let user = {
      email: email,
      password: password,
    };
    axios.post(`http://localhost:4000/user/register`, user).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
        <label htmlFor="SignUp">Signup</label>
        <label for="email">Enter your email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <label for="password">Enter your password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
        {/* <input type="submit" title="Login" onClick={handleSubmit} /> */}
      </form>
    </div>
  );
}

export default Signup;
