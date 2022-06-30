import { gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useMeQuery, MeDocument } from '../generated/graphql';

const Login: React.FunctionComponent = (props) => {


    const navigate = useNavigate();
    const [fdata, setData] = useState({ username: "", password: "" })
    const { data, loading, error } = useMeQuery();
    useEffect(() => {
        console.log(data);
    }, [])
    const [Login] = useLoginMutation()
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const respo = await Login({
            variables: fdata,
            refetchQueries: [{
                query: MeDocument
            }]
        })
        if (respo.data?.login !== null) {
            console.log(data);
            navigate('/');
        }
    }

    return (
        <div>
            <h1>HI</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => (setData({ ...fdata, username: e.target.value }))} type="text" placeholder='username' value={fdata.username} />
                <input onChange={(e) => (setData({ ...fdata, password: e.target.value }))} type="password" placeholder='password' value={fdata.password} />
                <button> Submit</button>
            </form>

        </div >
    );
};

export default Login;
