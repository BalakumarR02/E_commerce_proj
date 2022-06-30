import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';


const Register: React.FunctionComponent = (props) => {
    const [data, setData] = useState({ username: "", password: "" })
    const [Register, { error }] = useRegisterMutation()
    const handleSubmit = async () => {
        const res = await Register({
            variables:
            {
                username: data.username,
                password: data.password
            }

        })
        if (error) {
            console.log(error);

        }
    }

    return (
        <div>

            <input onChange={(e) => (setData({ ...data, username: e.target.value }))} type="text" placeholder='username' value={data.username} />
            <input onChange={(e) => (setData({ ...data, password: e.target.value }))} type="password" placeholder='password' value={data.password} />
            <button onClick={handleSubmit}> Submit</button>
        </div >
    );
};

export default Register;
