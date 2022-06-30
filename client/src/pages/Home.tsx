import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useMeQuery } from '../generated/graphql';
import GetItem from './getItems';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const { data } = useMeQuery();

    return (
        <div>
            {
                data !== undefined
                    ? (
                        <>
                            <Navbar data1={data} />
                            <GetItem data1={data} />
                        </>
                    )
                    : (null)

            }



        </div>
    );
};

export default Home;
