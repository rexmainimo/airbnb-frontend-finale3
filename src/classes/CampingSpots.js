export default class CampingSpots {
    constructor() {
        this.spots = [];
    }

    async fetchAllCampingSpots() {
        try {
            const response = await fetch("https://localhost:7156/CampingSpot");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const campingSpots = await response.json();
            this.spots = campingSpots;
            return this.spots;
        } catch (error) {
            console.error('Error fetching camping spots:', error);
            throw error;
        }
    }

    async findCampingByName(name) {
        try {
            const response = await fetch(`https://localhost:7156/CampingSpot/name?name=${name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                const nameData = await response.json();
                return nameData;  
            } else {
                console.error('Failed to retrieve spots:', response.statusText);
                return [];
            }
        } catch (error) {
            console.error('Error searching camping spots:', error);
            return [];
        }
    }
    async findCampingByCity(city) {
        try {
            const response = await fetch(`https://localhost:7156/CampingSpot/city?city=${city}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                const nameData = await response.json();
                return nameData;  
            } else {
                console.error('Failed to retrieve spots:', response.statusText);
                return [];
            }
        } catch (error) {
            console.error('Error searching camping spots:', error);
            return [];
        }
    }
    async findCampingByDescription(description) {
        try {
            const response = await fetch(`https://localhost:7156/CampingSpot/description?description=${description}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                const nameData = await response.json();
                return nameData;  
            } else {
                console.error('Failed to retrieve spots:', response.statusText);
                return [];
            }
        } catch (error) {
            console.error('Error searching camping spots:', error);
            return [];
        }
    }
    async findCampingByAvailability(availability) {
        try {
            const response = await fetch(`https://localhost:7156/CampingSpot/availability?available=${availability}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                const nameData = await response.json();
                return nameData; 
            } else {
                console.error('Failed to retrieve spots:', response.statusText);
                return [];
            }
        } catch (error) {
            console.error('Error searching camping spots:', error);
            return [];
        }
    }
}
