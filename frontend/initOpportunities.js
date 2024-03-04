import { getOpportunities } from "./services/apiService";
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const data = await getOpportunities();
        console.log(data);
        const wrapper = document.querySelector('.wrapper');
        wrapper.innerHTML = ''; // Clear existing content
        data.forEach(opportunity => {
            const article = document.createElement('article');
            article.className = 'volunteer-card';
            // Populate article with opportunity data
            article.innerHTML = `
                <header class="volunteer-card-header">
                    <img src="${opportunity.header_image}" alt="Header Image" class="volunteer-header-image">
                    <button class="heart-button">♥</button>
                    ${opportunity.high_demand ? '<div class="badge high-demand">In High Demand</div>' : ''}
                    <div class="badge location">${opportunity.location}</div>
                </header>
                <div class="volunteer-content">
                    <h2 class="volunteer-title">${opportunity.title}</h2>
                    <div class="volunteer-rating">
                        <span class="rating">${opportunity.rating.score}</span>
                        <img class="star" src="star.svg" alt="star">
                        <span class="total-ratings">(${opportunity.rating.total_reviews})</span>
                    </div>
                    <div class="volunteer-info">
                        <span class="volunteer-price">${opportunity.cost.currency} ${opportunity.cost.price_per_week} per week</span>
                        <span class="volunteer-duration">${opportunity.cost.duration_weeks.min}-${opportunity.cost.duration_weeks.max} weeks</span>
                        <span class="volunteer-age">Age ${opportunity.minimum_age}+</span>
                    </div>
                    <p class="volunteer-description">${opportunity.description}</p>
                </div>
                <div class="volunteer-footer">
                    <div class="volunteer-services">
                        ${opportunity.services.map(service => `
                            <div class="service">
                                <img class="service-icon" src="${service.icon}" alt="${service.name} Icon">
                                <span>${service.name}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="details-button">Details</button>
                </div>
`;

            wrapper.appendChild(article);
        });
    
    } catch (error) {
        console.error('Error:', error);
    }
});