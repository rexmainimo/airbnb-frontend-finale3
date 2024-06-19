<template>
    <div id="userHome">
      <h1>Welcome to AirBnb for Campers, {{ userName }}</h1>

      <search-component></search-component>
      <profile-dropdown></profile-dropdown>
      <message-box :message="message" />
      <div v-for="spot in campingSpots" :key="spot.id" class="container_spots" @click="navigateToBookings(spot)">
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
            <img :src="`data:${spot.imageContentType};base64,${spot.imageData}`" alt="Camping Spot Image" v-if="spot.imageData"/>
          </div>
          <div @click.stop class="comment-group">
            <h4>Rate and Comment</h4>
            <!-- ratings -->
            <starRating v-model="ratings[spot.id]" />
            <p>Your rating: {{ ratings[spot.id] }}</p>
            <!-- comments -->
            <textarea v-model="comments[spot.id]" placeholder="Leave a comment"></textarea>
            <button @click="submitRatingAndComment(spot.id)">Submit</button>
            <div v-for="review in spot.reviews" :key="review.id" class="review">
              <p>{{ review.firstName }} rated {{ review.rating }} stars</p>
              <p>{{ review.comment }}</p>
            </div>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import ProfileDropdown from "../components/profileDropdown.vue";
  import searchComponent from "../components/searchComponent.vue";
  import CampingSpots  from "../classes/CampingSpots.js";
  import User from "../classes/User.js";
  import starRating from "../components/starRating.vue";
  import RateAndComment from "../classes/RateAndComment.js";
  import messageBox from "../components/messageBox.vue";
  
  export default {
    components: {
      "profile-dropdown": ProfileDropdown,
      "search-component": searchComponent,
      starRating,
      messageBox
      
    },
    data() {
      return {
        userId: null,
        userName: "",
        campingSpots: [],
        user: null,
        ratings: {},
        comments: {},
        message: null
      }
    },
    created() {
      this.userId = localStorage.getItem("userId");
      if (this.userId) {
        this.user = new User(this.userId);
        this.getUserName();
        this.fetchCampingSpots();
        this.fetchRatingsAndComments();
      } else {
        this.$router.push({ name: "userHome" });
      }
    },
    methods: {
      async fetchCampingSpots() {
        const newCamping = new CampingSpots();
        try {
          this.campingSpots = await newCamping.fetchAllCampingSpots();
          
          // initialize ratings and comments for each spot
          this.campingSpots.forEach(spot => {
            if(!this.ratings[spot.id]){
              this.ratings[spot.id] = 0;
            }
            if(!this.comments[spot.id]){
              this.comments[spot.id] = "";
            }
            spot.reviews = []; 
          });
        } catch (error) {
          console.error("Failed to fetch camping spots:", error);
        }
      },
    
      async submitRatingAndComment(campingSpotId){
        const rating = this.ratings[campingSpotId];
        const comment = this.comments[campingSpotId];
        try{
          const rateAndComment = new RateAndComment(rating, comment, this.userId, campingSpotId);
          const response = await rateAndComment.PostRatingAndComment();
          //console.log(response);
          this.message = response;//"Rating and comment submitted successfully";
            setTimeout(() => {
                this.message = null;
            },2000);
         
          //this.fetchRatingsAndComments(); // Refresh the reviews
        }catch (error) {
          console.error("Failed to submit rating and comment:", error);
        }
      },
    
      navigateToBookings(spot) {
        this.$router.push({ name: 'userBooking', params: { spot: spot } });
      },
      async getUserName() {
        const name = await this.user.getUserName(this.userId);
        this.userName = name || 'Guest';
      },
      logout() {
        this.message = "Logout successful";
        setTimeout(() => {
            localStorage.removeItem("userId");
            this.$router.push({ name: "home" })
        },2000);
      }
    }
  };
  </script>
    
  <style scoped>
    .container_spots{
      display: inline-flex;
      color: black;
    }
    .camping-spot {
      flex-direction: row;
      width: 200px;
      margin: 10px;
      background-color: aquamarine;
      border-radius: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    
    .camping-spot:hover {
      background-color: #f0f0f0;
    }
    .camping-spot img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    object-fit: cover;
    }
    .comment-group{
      color: white;
    }
   
    #userHome {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
    margin-top: 60px;
  }
  
  </style>
    