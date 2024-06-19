export default class Owner{
    constructor(){
        //this.Owner_id = id;
        this.ownerSpots = [];
    }
    

    // async getOwnerSpots(id) {
    //     try{
    //         const response = await fetch(`http://localhost:5156/CampingSpot/ownerId?id=${id}`,{
    //             method: "GET",
    //             headers:{
    //                 "content-Type": "application/json",
    //             }
    //         });
    //         if(response.ok){
    //             const spots = await response.json();
    //             this.ownerSpots = spots;
    //             return this.ownerSpots;
    //         }else{
    //             console.log("Failed to retrieve owner camping spot(s)", response.statusText);
    //         }
    //     }
    //     catch(error){
    //         console.error("Error getting owner camping Spots", error);
    //     }
    // }
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
        try{
            const response = await fetch("https://localhost:7156/CampingSpot", {
                method: "POST",
                body: spot
            });
            if(response.ok){
                const feedback = await response.json();
                console.log(feedback.message);
                return true;
            }else{
                console.log("Failed to add camping spot", await response.json());
                return false;
            }
        }catch(error) {
            console.error(error);
            
        }
    }
}