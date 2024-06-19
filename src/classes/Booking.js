export default class Booking {
    constructor(userId, campingSpotId, startDate, endDate, numOfPeople) {
        this.userId = userId;
        this.campingSpotId = campingSpotId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.numOfPeople = numOfPeople;
        this.price = 65 * numOfPeople;
        this.dateOfBooking = new Date().toISOString();
    }
    

    async confirmBooking() {
        // Calculate the price based on the number of people
        this.price = 65 * this.numOfPeople;
        // console.log("id here:", this.userId);
        // console.log(this.campingSpotId)
        const bookingDetails = {
            id: 0,
            bookingDate: this.dateOfBooking,
            startDate: this.startDate,
            endDate: this.endDate,
            numOfPeople: this.numOfPeople,
            price: this.price,
            user_id: this.userId,
            campinpingSpot_id: this.campingSpotId
        };

        try {
            const response = await fetch("https://localhost:7156/Booking/campingSpot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingDetails)
            });

            if (response.ok) {
                await response.json();
    
                return true;
            } else {
                console.error('Failed to confirm booking:', response.statusText);
                throw new Error('Failed to confirm booking');
            }
        } catch (error) {
            console.error('Error confirming booking:', error);
            throw error;
        }
    }
}
