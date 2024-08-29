import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface Animal {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    isPopular: boolean;
    stock: number;
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

// Thunk to fetch animals
export const fetchAnimalsThunk = createAsyncThunk('animals/fetchAnimals', async () => {
    const response = await fetch('https://crudapi.co.uk/api/v1/animals');
    if (!response.ok) {
        throw new Error('Failed to fetch animals');
    }
    return (await response.json()) as Animal[];
});

const animalsSlice = createSlice({
    name: 'animals',
    initialState,
    reducers: {
        setAnimalsFromLocalStorage: (state, action: PayloadAction<Animal[]>) => {
            state.animals = action.payload;
            state.status = 'succeeded';
        },
        addAnimal: (state, action: PayloadAction<Animal>) => {
            state.animals.push(action.payload);
            localStorage.setItem('animals', JSON.stringify(state.animals));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimalsThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAnimalsThunk.fulfilled, (state, action: PayloadAction<Animal[]>) => {
                console.log('Animals fetched:', action.payload);
                state.status = 'succeeded';
                state.animals = action.payload;
                localStorage.setItem('animals', JSON.stringify(state.animals));
            })
            .addCase(fetchAnimalsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch animals';
            });
    },
});

export const { setAnimalsFromLocalStorage, addAnimal } = animalsSlice.actions;

export const selectAnimals = (state: RootState) => state.animals.animals;

export default animalsSlice.reducer;