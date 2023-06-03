import axios from 'axios'
import React from 'react'

function LoginPage() {
    axios.post(`http://localhost:4000/user/profile`)
        .then(res => {
            console.log(res);

        })
    return (
        <div>
            <h1>You're Logged in Successfully!</h1>

            <h3>Welcom to jwt app</h3>



        </div>
    )
}

export default LoginPage