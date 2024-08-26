import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

const initialState: AnimalsState = {
  animals: [],
};

const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    setAnimals: (state, action: PayloadAction<Animal[]>) => {
      state.animals = action.payload;
    },
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
});

export const { setAnimals, addAnimal, updateAnimal, deleteAnimal } = animalsSlice.actions;
export default animalsSlice.reducer;