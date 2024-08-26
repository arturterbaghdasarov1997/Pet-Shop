import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAnimalsThunk } from './animalThunk';

interface Animal {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    isPopular: boolean;
    stock: number;
    imageUrl: string;
}

interface AnimalsState {
    animals: Animal[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AnimalsState = {
    animals: [],
    status: 'idle',
    error: null,
};

const animalsSlice = createSlice({
    name: 'animals',
    initialState,
    reducers: {
        addAnimal: (state, action: PayloadAction<Animal>) => {
            state.animals.push(action.payload);
        },
        updateAnimal: (state, action: PayloadAction<Animal>) => {
            const index = state.animals.findIndex(animal => animal.id === action.payload.id);
            if (index !== -1) {
                state.animals[index] = action.payload;
            }
        },
        deleteAnimal: (state, action: PayloadAction<string>) => {
            state.animals = state.animals.filter(animal => animal.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimalsThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAnimalsThunk.fulfilled, (state, action: PayloadAction<Animal[]>) => {
                state.status = 'succeeded';
                state.animals = action.payload;
            })
            .addCase(fetchAnimalsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { addAnimal, updateAnimal, deleteAnimal } = animalsSlice.actions;
export default animalsSlice.reducer;