import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AllItemsDocument, useCreateItemMutation, useMeQuery } from '../generated/graphql';

interface ICreateItemProps {
}

const CreateItem: React.FunctionComponent<ICreateItemProps> = (props) => {
    const { data, loading } = useMeQuery();
    const [CreateItem, { error }] = useCreateItemMutation();
    const [fdata, setData] = React.useState({
        title: "", description: "", imageUrl: "", price: "", quantity: ""
    });
    const navigate = useNavigate();
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const res = await CreateItem({
            variables: { ...fdata, price: parseFloat(fdata.price), quantity: parseFloat(fdata.quantity) },
            refetchQueries: [{
                query: AllItemsDocument
            }]

        })
        if (error) {
            console.log(error);
        }
        if (res.data?.createItem) {
            navigate('/');
        }
    }
    let body;
    if (loading) {
        body = null;
    } else if (!data?.me) {
        navigate('/');
    }
    else {
        body = (
            <div>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => (setData({ ...fdata, title: e.target.value }))} type="text" placeholder='title' value={fdata.title} />
                    <input onChange={(e) => (setData({ ...fdata, description: e.target.value }))} placeholder='description' value={fdata.description} />
                    <input onChange={(e) => (setData({ ...fdata, imageUrl: e.target.value }))} type="text" placeholder='imageUrl' value={fdata.imageUrl} />
                    <input onChange={(e) => (setData({ ...fdata, quantity: (e.target.value) }))} type="text" placeholder='quantity' value={fdata.quantity} />
                    <input onChange={(e) => (setData({ ...fdata, price: (e.target.value) }))} type="text" placeholder='price' value={fdata.price} />
                    <button> Submit</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            {body}
        </div>
    );
};

export default CreateItem;
