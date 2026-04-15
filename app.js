document.addEventListener('DOMContentLoaded', () => {
    console.log('Garden App loaded');
});

function renderPlants(plants) {
    const plantList = document.getElementById('plant-list');
    if (!plantList) return;

    plantList.innerHTML = plants.map(plant => `
        <div class="plant-card">
            <h3>${plant.name}</h3>
            <p>${plant.description}</p>
        </div>
    `).join('');
}