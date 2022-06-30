import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AllItemsDocument, MeDocument, MeQuery, useAllItemsQuery, useLogoutMutation, useMeQuery } from '../generated/graphql';

interface Navbarprops {
    data1: MeQuery
}

const Navbar: React.FunctionComponent<Navbarprops> = ({ data1 }) => {
    const navigate = useNavigate();

    const [Logout] = useLogoutMutation();
    const onLogout = async () => {
        const res = await Logout({
            refetchQueries: [{
                query: MeDocument
            }
            ]
        });

    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">E-Commerce</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >

                        {data1?.me !== null
                            ? (<>
                                <Link to="/" className='me-4 btn' style={{ backgroundColor: "#ADD8E6" }}>Home Page</Link>
                                <Link to="/createitem" className='me-4 btn' style={{ backgroundColor: "#ADD8E6" }}>Create Item</Link>
                            </>

                            )
                            : (
                                <div></div>

                            )}
                    </ul>
                    {data1?.me !== null
                        ? (
                            <div className='d-flex'>
                                <p className='me-4'>{data1?.me?.username}</p>
                                <button
                                    onClick={onLogout}

                                >
                                    Log out
                                </button>
                            </div>
                        )
                        : (
                            <div className='d-flex'>
                                <Link to="/login" className='me-4' style={{ color: "white" }}>Login</Link>
                                <Link to="/register" style={{ color: "white" }}>Register</Link>
                            </div>

                        )
                    }


                </div>
            </div>
        </nav >
    );
};

export default Navbar;
