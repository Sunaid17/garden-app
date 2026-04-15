import { plantService } from './plantService.js';
import { plantStore } from './store.js';
import { CATEGORIES } from './data.js';

function init() {
    setupEventListeners();
    renderCategoryFilter();
    loadPlants();
    subscribeToStore();
}

async function loadPlants() {
    plantStore.setState({ isLoading: true });
    
    try {
        const plants = await plantService.getPlants();
        plantStore.setState({ plants, filteredPlants: plants, isLoading: false });
    } catch (error) {
        plantStore.setState({ error: error.message, isLoading: false });
    }
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

function renderCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');
    if (!categoryFilter) return;
    
    const currentValue = categoryFilter.value;
    categoryFilter.innerHTML = '<option value="">All Categories</option>' +
        CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    categoryFilter.value = currentValue;
}

function handleSearch(event) {
    const search = event.target.value;
    plantStore.setState(state => ({
        filter: { ...state.filter, search }
    }));
    filterAndRender();
}

function handleCategoryFilter(event) {
    const category = event.target.value;
    plantStore.setState(state => ({
        filter: { ...state.filter, category }
    }));
    filterAndRender();
}

function filterAndRender() {
    const state = plantStore.getState();
    const filteredPlants = plantService.filterPlants(
        state.plants,
        state.filter.search,
        state.filter.category
    );
    plantStore.setState({ filteredPlants });
}

function subscribeToStore() {
    plantStore.subscribe(renderPlants);
}

function renderPlants() {
    const plantList = document.getElementById('plant-list');
    if (!plantList) return;

    const state = plantStore.getState();
    
    if (state.isLoading) {
        plantList.innerHTML = '<p>Loading plants...</p>';
        return;
    }

    if (state.filteredPlants.length === 0) {
        plantList.innerHTML = '<p>No plants found.</p>';
        return;
    }

    plantList.innerHTML = state.filteredPlants.map(plant => `
        <div class="plant-card">
            <h3>${plant.name}</h3>
            <p class="scientific-name"><em>${plant.scientific_name || 'Unknown'}</em></p>
            <p>${plant.description || 'No description available'}</p>
            <div class="plant-info">
                <span>☀️ ${plant.sunlight || 'Unknown'}</span>
                <span>💧 ${plant.watering || 'Unknown'}</span>
                <span>🏷️ ${plant.category || 'Unknown'}</span>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', init);