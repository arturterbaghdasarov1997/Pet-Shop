import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAnimals } from '../services/apiService';

export const fetchAnimalsThunk = createAsyncThunk(
    'animals/fetchAnimals',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchAnimals();
            if (!Array.isArray(data)) {
                throw new Error('Invalid data format');
            }
            return data;
        } catch (error) {
            console.error('Error fetching animals:', error);
            return rejectWithValue('Failed to fetch animals.');
        }
    }
);