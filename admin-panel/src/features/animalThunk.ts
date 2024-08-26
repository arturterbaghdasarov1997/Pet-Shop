import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAnimals } from '../services/apiService';

export const fetchAnimalsThunk = createAsyncThunk(
    'animals/fetchAnimals',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchAnimals();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);