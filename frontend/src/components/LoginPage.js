import React from 'react'
import axios from 'axios'


function LoginPage() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    const [userToken, setUserToken] = React.useState('')
    const [user, setUser] = React.useState()
    const handleSubmit = (event) => {
        event.preventDefault();

        let user = {
            email: email,
            password: password
        };

        axios.post(`http://localhost:4000/user/login`, user)
            .then(res => {
                console.log(res);
                setUserToken(res?.data.token)
                setUser(res.data.user)
            })
    }

    return (
        <div>
            <h1>Login App</h1>
            {
                !userToken ? (
                    <>
                        <form >

                            <label for="email" >Enter your email</label>
                            <input id="email" name="email" type="email" placeholder='email...' onChange={(e) => setEmail(e.target.value)} />
                            <br></br>
                            <label for="password" >Enter your password</label>
                            <input id="password" name="password" type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />



                            <input type="submit" title="Login" onClick={handleSubmit} />

                        </form>

                    </>


                ) : (

                    <>
                        <h1>Your are logged in successfully!</h1>
                        <br>
                        </br>
                        <p>Your token is: {userToken}</p>
                        <p>Your credentials</p>
                        <p>Email: {user?.email}</p>
                        <p>Password: {user?.password}</p>
                    </>
                )

            }

        </div>
    )
}

export default LoginPage