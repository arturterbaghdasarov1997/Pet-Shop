import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setAnimals } from "../features/animalsSlice";
import { fetchAnimals } from "../services/apiService";

const AnimalList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const animals = useSelector((state: RootState) => state.animals.animals);

    useEffect(() => {
        const loadAnimals = async () => {
            const data = await fetchAnimals();
            dispatch(setAnimals(data));
        };

        loadAnimals();
    }, [dispatch]);

    return (
        <div>
            <h2>Pets</h2>
            <ul>
                {animals.map(animal => (
                    <li key={animal.id}>
                         <img src={animal.imageUrl || ''} alt={animal.name} />
                        <p>Name: {animal.name}</p>
                        <p>Price: {animal.price} GEL</p>
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

export default AnimalList;