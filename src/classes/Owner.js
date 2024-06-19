export default class Owner{
    constructor(){
        //this.Owner_id = id;
        this.ownerSpots = [];
    }
    
    async fetchOwnerCampingSpots(id) {
        try {
          const response = await fetch(`https://localhost:7156/CampingSpot/ownerId?id=${id}`, { 
            method: 'GET'
          });
    
          const spots = await response.json();
          if (response.ok) {
            this.ownerSpots = spots;
            return this.ownerSpots;
          } else {
            console.error('Error fetching camping spots:', spots);
            return [];
          }
        } catch (error) {
          console.error('Error:', error);
          return [];
        }
    }
    async addCampingSpot(spot) {
      try {
          const response = await fetch("https://localhost:7156/CampingSpot", {
              method: "POST",
              body: spot
          });
          if (response.ok) {
              const feedback = await response.json();
              console.log(feedback)
              return feedback; 
          } else {
              const error = await response.json();
              console.error("Failed to add camping spot", error);
              return null;
          }
      } catch (error) {
          console.error("Error adding camping spot", error);
          return null;
      }
  }  
}