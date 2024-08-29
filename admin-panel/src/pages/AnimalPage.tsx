import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchAnimalsThunk, setAnimalsFromLocalStorage } from "../features/animalsSlice";
import './AnimalPage.css';

const AnimalPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { animals, status, error } = useSelector((state: RootState) => state.animals);

    useEffect(() => {
        const storedAnimals = localStorage.getItem('animals');
        if (storedAnimals) {
            dispatch(setAnimalsFromLocalStorage(JSON.parse(storedAnimals)));
        } else if (status === 'idle') {
            dispatch(fetchAnimalsThunk());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (animals.length > 0) {
            localStorage.setItem('animals', JSON.stringify(animals));
        }
    }, [animals]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <div className="animal-list-container">
            <h2>Pet List</h2>
            <ul>
                {animals.length > 0 ? (
                    animals.map((animal) => (
                        <div key={animal.id} className="animal-card">
                            <img src="/assets/pets.png" alt="pets" />
                            <div>
                                <p>Name: {animal.name}</p>
                                <p>Price: {animal.price} ₾</p>
                                <p>Description: {animal.description}</p>
                                <p>Category: {animal.category}</p>
                                <p>{animal.isPopular ? "Popular" : "Not Popular"}</p>
                                <p>{animal.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No animals found.</p>
                )}
            </ul>
        </div>
    );
};

export default AnimalPage;