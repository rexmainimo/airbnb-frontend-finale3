<template>
    <div>
      <button @click="goHome" class="home-button">Home</button>
      <h1>Book Camping Spot</h1>
      <message-box :message="message" />
      <div class="main-container">
        <div class="reviews">
          <h3>User Reviews</h3>
          <div v-if="reviews.length === 0">No reviews yet.</div>
          <div v-for="review in reviews" :key="review.id" class="review">
            <p>{{ review.firstName }}: rated: {{ review.rating }} stars</p>
            <p>Comment: {{ review.comment }}</p>
            <p>Date: {{ review.createdAt }}</p>
          </div>
        </div>
        <div class="spot">
          <h2>Booking Details for {{ spot.name }}</h2>
          <p>Camping Spot Number: {{ spot.id }}</p>
          <p>City: {{ spot.city }}</p>
          <p>Postal Number: {{ spot.postalNum }}</p>
          <p>Street Number: {{ spot.streetNum }}</p>
          <p>House Number: {{ spot.houseNum }}</p>
          
          <p>Description: {{ spot.description }}</p>
          <p>Facilities: {{ spot.facilities }}</p>
          <p>Availability: {{ spot.availability }}</p>
          <img :src="`data:${spot.imageContentType};base64,${spot.imageData}`" alt="Camping Spot Image" v-if="spot.imageData"/>
          <br />
          <button @click="showBookingForm = true">Book Camping Spot</button>
        </div>
        <div v-if="showBookingForm" class="extra-info-group">
          <form @submit.prevent="handleBooking">
            <h2>Additional Information</h2>
            <div class="form-group">
              <label for="startDate">Start Date:</label>
              <input type="date" v-model="startDate" id="startDate" required />
            </div>
            <div class="form-group">
              <label for="endDate">End Date:</label>
              <input type="date" v-model="endDate" id="endDate" required />
            </div>
            <div class="form-group">
              <label for="numPeople">Number of People:</label>
              <input
                type="number"
                v-model="numPeople"
                id="numPeople"
                min="1"
                required
                @input="calculatePrice"
              />
            </div>
            <div class="form-group">
              <label for="price">Price:</label>
              <input type="number" v-model="price" id="price" required readonly />
            </div>
            <br />
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Booking from '../classes/Booking.js';
  import RateAndComment from '../classes/RateAndComment.js';
  import messageBox from '../components/messageBox.vue';
  
  export default {
    components: {
      messageBox,
    },
    props: {
      spot: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        userId: null,
        startDate: '',
        endDate: '',
        numPeople: 1,
        price: 65, 
        reviews: [], 
        showBookingForm: false,
        message: null
      };
    },
    created() {
      this.userId = localStorage.getItem('userId');
      this.fetchRatingsAndComments();
    },
    methods: {
      calculatePrice() {
        this.price = 65 * this.numPeople;
      },
      async handleBooking() {
        const booking = new Booking(
          this.userId,
          this.spot.id,
          this.startDate,
          this.endDate,
          this.numPeople,
          this.price
        );
  
        try {
          const data = await booking.confirmBooking();
          if (data) {
            this.message = "Booking successful";
            setTimeout(() => {
                this.message = null;
                this.$router.push({ name: "myBookings" });
                this.resetForm();
                this.showBookingForm = !this.showBookingForm;
            }, 2000);
           
           
          } else {
            this.message = 'Booking failed';
            setTimeout(() => {
              this.message = null;
            }, 2000);
          }
        } catch (error) {
          console.error('Error during booking:', error);
        }
      },
      async fetchRatingsAndComments() {
        try {
          const response = await RateAndComment.getRatingsAndComments(this.spot.id);
  
          if (response) {
            this.reviews = response;
          } else {
            this.message = "Can't fetch reviews at this time";
            setTimeout(() => {
                this.message = null;
            },2000);
          }
        } catch (error) {
          console.error('Failed to fetch ratings and comments:', error);
        }
      },
      resetForm() {
        this.startDate = '';
        this.endDate = '';
        this.numPeople = 1;
        this.price = 65;
      },
      goHome(){
        this.$router.push({ name: "userHome" });
      }
    }
  };
  </script>
  
  <style scoped>
  .main-container {
    display: inline-flex;
  }
  
  .spot {
    flex: 2;
    width: 420px;
    margin: 10px;
    background-color: aquamarine;
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    border-radius: 10px;
    color: black;
    border-radius: 20px;
  }
  .spot img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    object-fit: cover;
  }
  
  .extra-info-group {
    border: 2px solid green;
    margin-top: 20px;
    padding: 10px;
    border-radius: 20px;
    background-color: aliceblue;
    width: 420px;
    color: black;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  button, nav {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 15px 45px;
    border-radius: 30px;
    cursor: pointer;
    width: fit-content;
  }
  button:hover{
    background-color: green;
  }
  
  .reviews {
    flex: 1;
    margin-right: 30px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 20px;
    background-color: #f9f9f9;
    color: black;
  }
  
  .review {
    margin-top: 10px;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    color: black;
  }
  .home-button{
    text-align: left;
    justify-content: flex-end;
  }
  </style>