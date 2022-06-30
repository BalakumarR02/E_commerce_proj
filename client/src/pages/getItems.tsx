import React, { useEffect, useState } from 'react';

import { useQuery, gql } from '@apollo/client'
import { AllItemsDocument, MeQuery, useAllItemsQuery, useDeleteItemMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';
interface getitemProps {
    data1: MeQuery

}

const GetItem: React.FunctionComponent<getitemProps> = ({ data1 }) => {
    const { data, error } = useAllItemsQuery();
    const [item, setItem] = useState<any[]>([])
    const [DeleteItem] = useDeleteItemMutation();
    useEffect(() => {
        if (data) {
            setItem(data.allItems);
        }
        console.log(data)
    }, [data])

    const navigate = useNavigate();

    return (
        <div className='container-fluid'>
            <div className='row'>
                {data1?.me !== null && item.map((val) => (

                    <div key={val.id} className="text-center card col-lg-4 col-sm-6 col-12">
                        <img className="card-img-top" src={val.imageUrl} alt="" />
                        <div className="text-align-center card-body">
                            <h3 className="card-title">{val.title}</h3>
                            <h5 className="card-text">{val.description}</h5>
                            <p>Quantity: {val.quantity}<span className='ms-5'>Price: </span>{val.price}<span className='d-block ms-2 mt-3' style={{ fontSize: "1.2em" }}>Total: <span style={{ fontWeight: "bold" }}>{val.price * val.quantity}</span></span></p>
                            <div className='d-flex justify-content-between'>
                                <button className='btn btn-warning' onClick={() => {
                                    navigate('/updateitem', { state: { val: val } });
                                }}>Update Item</button>
                                <button className='btn btn-danger' onClick={async () => {
                                    const res = await DeleteItem({
                                        variables: {
                                            id: parseFloat(val.id)
                                        },
                                        refetchQueries: [{
                                            query: AllItemsDocument
                                        }]

                                    })
                                }}>Delete Item</button>
                            </div>

                        </div>
                    </div>

                ))
                }
            </div>

        </div >
    );
};

export default GetItem;
