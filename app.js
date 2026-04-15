const API_BASE_URL = 'https://perenual.com/api';

const PLANT_DATA = [
    {
        id: 1,
        name: 'Rose',
        scientific_name: 'Rosa',
        description: 'Classic flowering plant known for its beautiful blooms.',
        sunlight: 'Full sun',
        watering: 'Average',
        category: 'Flowering'
    },
    {
        id: 2,
        name: 'Lavender',
        scientific_name: 'Lavandula',
        description: 'Fragrant herb with purple flowers, great for pollinators.',
        sunlight: 'Full sun',
        watering: 'Minimum',
        category: 'Herb'
    },
    {
        id: 3,
        name: 'Tomato',
        scientific_name: 'Solanum lycopersicum',
        description: 'Popular vegetable plant producing red fruits.',
        sunlight: 'Full sun',
        watering: 'Average',
        category: 'Vegetable'
    },
    {
        id: 4,
        name: 'Fern',
        scientific_name: 'Nephrolepis exaltata',
        description: 'Lush green plant perfect for shaded areas.',
        sunlight: 'Partial shade',
        watering: 'Maximum',
        category: 'Foliage'
    },
    {
        id: 5,
        name: 'Succulent',
        scientific_name: 'Echeveria',
        description: 'Drought-resistant plant with thick fleshy leaves.',
        sunlight: 'Full sun',
        watering: 'Minimum',
        category: 'Foliage'
    }
];

const state = {
    plants: [],
    filteredPlants: [],
    filter: ''
};

function init() {
    loadPlants();
    setupEventListeners();
}

function loadPlants() {
    state.plants = PLANT_DATA;
    state.filteredPlants = [...PLANT_DATA];
    renderPlants();
}

function setupEventListeners() {
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    state.filter = searchTerm;
    filterPlants();
}

function handleCategoryFilter(event) {
    const category = event.target.value;
    filterPlants(category);
}

function filterPlants(category = '') {
    const searchTerm = state.filter.toLowerCase();
    
    state.filteredPlants = state.plants.filter(plant => {
        const matchesSearch = plant.name.toLowerCase().includes(searchTerm) ||
                            plant.scientific_name.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || plant.category === category;
        return matchesSearch && matchesCategory;
    });

    renderPlants();
}

function renderPlants() {
    const plantList = document.getElementById('plant-list');
    if (!plantList) return;

    if (state.filteredPlants.length === 0) {
        plantList.innerHTML = '<p>No plants found.</p>';
        return;
    }

    plantList.innerHTML = state.filteredPlants.map(plant => `
        <div class="plant-card">
            <h3>${plant.name}</h3>
            <p class="scientific-name"><em>${plant.scientific_name}</em></p>
            <p>${plant.description}</p>
            <div class="plant-info">
                <span>☀️ ${plant.sunlight}</span>
                <span>💧 ${plant.watering}</span>
                <span>🏷️ ${plant.category}</span>
            </div>
        </div>
    `).join('');
}

function fetchPlantsFromApi(apiKey) {
    return fetch(`${API_BASE_URL}/species-list?key=${apiKey}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching plants:', error);
            return { data: [] };
        });
}

document.addEventListener('DOMContentLoaded', init);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { state, loadPlants, renderPlants, filterPlants };
}