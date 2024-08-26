import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addAnimal } from '../features/animalsSlice';
import { createAnimal } from '../services/apiService';

const AddAnimalForm: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [isPopular, setIsPopular] = useState(false);
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const animal = {
            id: crypto.randomUUID(),
            name,
            price,
            description,
            category,
            isPopular,
            stock,
            imageUrl,
        };

        try {
            const newAnimal = await createAnimal(animal);
            dispatch(addAnimal(newAnimal));

            setName('');
            setPrice(0);
            setDescription('');
            setCategory('');
            setIsPopular(false);
            setStock(0);
            setImageUrl('');
        } catch (error) {
            console.error('Error adding animal:', error);
            alert('Failed to add animal. Please check the console for details.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Pet</h2>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                />
            </label>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Category:
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </label>
            <label>
                Popular:
                <input
                    type='checkbox'
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                />
            </label>
            <label>
                Stock:
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    required
                />
            </label>
            <label>
                Image URL:
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </label>
            <button type='submit'>Add Pet</button>
        </form>
    );
};

export default AddAnimalForm;