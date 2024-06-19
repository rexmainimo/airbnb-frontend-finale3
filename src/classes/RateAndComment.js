export default class RateAndComment{
    constructor(rating, comment, userId, campingSpotId){
        this.rating = rating;
        this.comment = comment;
        this.userId = userId;
        this.campingSpotId = campingSpotId;
    }
    async PostRatingAndComment() {
       try{
            const response = await fetch("https://localhost:7156/RatingsAndComments/ratings",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    rating: this.rating,
                    comment: this.comment,
                    user_id: this.userId,
                    campingSpot_id: this.campingSpotId
                })
            });
            if(response.ok){
                const data = await response.json();
                return data.message;
            }else{
                console.log("Failed to post your reaction", response.statusText);
            }
       }catch(error){
            console.log("Error", error);
       }
    }
    static async getRatingsAndComments(spot_id) {
        console.log(spot_id)
       try{
            const response = await fetch(`https://localhost:7156/RatingsAndComments?spot_id=${spot_id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(response.ok){
                
                const data = await response.json();
                return data;
            }
            else{
                console.log("failed to retrieve reviews", response.statusText);
            }
       }catch(error){
        console.log("Failed to fetch ratings and comments", error);
       }
    }
}