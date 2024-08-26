const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = '/api/v1';

export const fetchData = async (url: string, options: RequestInit = {}) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch Data Error:', error);
        throw error;
    }
};

export const fetchAnimals = async () => {
    try {
        const data = await fetchData(`${API_URL}/animals`);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching animals:', error);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        return await fetchData(`${API_URL}/categories`);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

interface Animal {
    name: string;
    price: number;
    description: string;
    category: string;
    isPopular: boolean;
    stock: number;
    imageUrl?: string;
}

export const createAnimal = async (animal: Animal) => {
    try {
        const response = await fetch(`${API_URL}/animals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify([animal]),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Fetch error:', response.status, errorText);
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating animal:', error);
        throw error;
    }
};

export const updateAnimal = async (animal: Animal) => {
    return await fetchData(`${API_URL}/animals/:id`, {
        method: 'PUT',
        body: JSON.stringify(animal),
    });
};

export const deleteAnimal = async () => {
    return await fetchData(`${API_URL}/animals/:id`, {
        method: 'DELETE',
    });
};