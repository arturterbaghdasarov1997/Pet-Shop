import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchAnimalsThunk } from "../features/animalThunk";

const AnimalPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { animals, status, error } = useSelector((state: RootState) => state.animals);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAnimalsThunk());
        }
    }, [dispatch, status]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    console.log('Animals:', animals);

    return (
        <div>
            <h2>Pet List</h2>
            <ul>
                {animals.map(animal => (
                    <li key={animal.id}>
                        <img src={animal.imageUrl || ''} alt={animal.name} />
                        <p>Name: {animal.name}</p>
                        <p>Price: {animal.price} ₾</p>
                        <p>Description: {animal.description}</p>
                        <p>Category: {animal.category}</p>
                        <p>{animal.isPopular ? "Popular" : "Not Popular"}</p>
                        <p>Stock: {animal.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnimalPage;