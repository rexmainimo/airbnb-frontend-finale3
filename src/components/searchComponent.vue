<template>
    <div>
        <select v-model="selectedFilter">
            <option disabled value=""> Please select one to search</option>
            <option>Name</option>
            <option>City</option>
            <option>Available</option>
            <option>Description</option>
        </select>
        <div>
            <input v-model="searchQuery" type="text" id="search-name" placeholder="Search for Camping Spots">
            <button @click="searchSpots">Search</button>
        </div>
        <div v-if="spots.length > 0">
            <div v-for="spot in spots" :key="spot.id" class="container_spots" @click="navigateToBookings(spot)">
                <div class="camping-spot">
                    <h2>{{ spot.name }}</h2>
                    <p>Camping Spot Number: {{ spot.id }}</p>
                    <p>City: {{ spot.city }}</p>
                    <p>Postal Number: {{ spot.postalNum }}</p>
                    <p>Street Number: {{ spot.streetNum }}</p>
                    <p>House Number: {{ spot.houseNum }}</p>
                    <p>Description: {{ spot.description }}</p>
                    <p>Facilities: {{ spot.facilities }}</p>
                    <p>Availability: {{ spot.availability }}</p>
                    <p>Image: {{ spot.image }}</p>
                    <!-- <p>Latitude: {{ spot.latitude }}</p>
                    <p>Longitude: {{ spot.longitude }}</p> -->
                </div>
            </div>
        </div>
        <div v-else>
            <p>No camping spots found.</p>
        </div>
    </div>
</template>

<script>
import CampingSpots from "../classes/CampingSpots.js";

export default {
    data() {
        return {
            spots: [],
            searchQuery: "",
            selectedFilter: ""
        };
    },
    methods: {
        async searchSpots() {
            const campings = new CampingSpots();
            let foundSpots = [];

            if (this.selectedFilter === "Name" && this.searchQuery !== "") {
                foundSpots = await campings.findCampingByName(this.searchQuery);
            } else if (this.selectedFilter === "City" && this.searchQuery !== "") {
                foundSpots = await campings.findCampingByCity(this.searchQuery);
            } else if (this.selectedFilter === "Available") {
                this.searchQuery = "Yes";
                foundSpots = await campings.findCampingByAvailability(this.searchQuery);
            } else if (this.selectedFilter === "Description" && this.searchQuery !== "") {
                foundSpots = await campings.findCampingByDescription(this.searchQuery);
            } else {
                console.log("Enter search parameter");
                return;
            }

            if (foundSpots.length > 0) {
                this.spots = foundSpots;
            } else {
                this.spots = [];
                console.log(`No spots found that match the search criteria: ${this.searchQuery}`);
            }
            this.clearVariables();
        },
        navigateToBookings(spot) {
            this.$router.push({ name: 'userBooking', params: { spot: spot } });
        },
        clearVariables() {
            this.selectedFilter = "";
            this.searchQuery = "";
        }
    }
};
</script>


<style scoped>
 input{
    width: 30%;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font: bold;
  }
button{
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 15px 45px;
    border-radius: 30px;
    cursor: pointer;
  }
  button:hover{
    background-color: green;
  }

  .container_spots{
    display: inline-flex;
    
  }
  .camping-spot {
    flex-direction: row;
    width: 200px;
    margin: 10px;
    background-color: aquamarine;
    /* color: black; */
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  
  .camping-spot:hover {
    background-color: #f0f0f0;
  }
</style>