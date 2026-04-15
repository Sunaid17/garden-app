import { API_BASE_URL } from './data.js';

export class PlantService {
    constructor() {
        this.cache = new Map();
    }

    async getPlants(apiKey = null) {
        const cacheKey = apiKey || 'local';
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            if (apiKey) {
                const response = await fetch(`${API_BASE_URL}/species-list?key=${apiKey}`);
                const data = await response.json();
                
                if (data.data && data.data.length > 0) {
                    const plants = data.data.map(this.transformApiData);
                    this.cache.set(cacheKey, plants);
                    return plants;
                }
            }
        } catch (error) {
            console.error('API Error:', error);
        }

        const localPlants = await this.getLocalPlants();
        this.cache.set('local', localPlants);
        return localPlants;
    }

    async getLocalPlants() {
        const { PLANT_DATA } = await import('./data.js');
        return PLANT_DATA;
    }

    transformApiData(apiPlant) {
        return {
            id: apiPlant.id,
            name: apiPlant.common_name || 'Unknown',
            scientific_name: apiPlant.scientific_name?.[0] || 'Unknown',
            description: apiPlant.default_image?.license_name || 'No description available',
            sunlight: Array.isArray(apiPlant.sunlight) ? apiPlant.sunlight.join(', ') : 'Unknown',
            watering: apiPlant.watering || 'Unknown',
            category: 'API'
        };
    }

    filterPlants(plants, searchTerm = '', category = '') {
        return plants.filter(plant => {
            const matchesSearch = !searchTerm || 
                plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                plant.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !category || plant.category === category;
            return matchesSearch && matchesCategory;
        });
    }

    clearCache() {
        this.cache.clear();
    }
}

export const plantService = new PlantService();