<template>
    <div>
      <button @click="toggleForm">{{ addSpot ? 'Close' : 'Add Spot' }}</button>
      <div v-if="addSpot">
        <message-box :message="message" />
        <form @submit.prevent="handleSubmit" class="submit-form">
          <h2>Add Camping Spot</h2>
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required placeholder="Camping spot name">
          </div>
          <div class="form-group">
            <label for="city">City:</label>
            <input type="text" id="city" v-model="city" required>
          </div>
          <div class="form-group">
            <label for="postal">Postal Number:</label>
            <input type="text" id="postal" v-model="postal" required>
          </div>
          <div class="form-group">
            <label for="street">Street Number:</label>
            <input type="text" id="street" v-model="street" required>
          </div>
          <div class="form-group">
            <label for="house">House Number:</label>
            <input type="text" id="house" v-model="house">
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <input type="text" id="description" v-model="description">
          </div>
          <div class="form-group">
            <label for="facilities">Facilities:</label>
            <input type="text" id="facilities" v-model="facilities">
          </div>
          <div class="form-group">
            <label for="availability">Available:</label>
            <select id="availability" v-model="availability">
              <option value="available">Yes</option>
              <option value="unavailable">No</option>
            </select>
          </div>
          <div class="form-group">
            <label for="image">Upload Image:</label>
            <input type="file" id="image" @change="handleImageUpload">
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div v-else class="container_spots">
        <div v-for="spot in ownerCampintSpots" :key="spot.id" class="camping-spot">
          <h2>{{ spot.name }}</h2>
          <p>Camping Spot Number: {{ spot.id }}</p>
          <p>City: {{ spot.city }}</p>
          <p>Postal Number: {{ spot.postalNum }}</p>
          <p>Street Number: {{ spot.streetNum }}</p>
          <p>House Number: {{ spot.houseNum }}</p>
          <p>Description: {{ spot.description }}</p>
          <p>Facilities: {{ spot.facilities }}</p>
          <p>Availability: {{ spot.availability }}</p>
          <p>Owner ID: {{ spot.owner_Id }}</p>
          <img :src="`data:${spot.imageContentType};base64,${spot.imageData}`" alt="Camping Spot Image" v-if="spot.imageData"/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Owner from "../classes/Owner.js";
  import messageBox from '../components/messageBox.vue';

  export default {
    components:{
      messageBox
    },
    data() {
      return {
        city: "",
        postalNum: "",
        streetNum: "",
        houseNum: "",
        ownerId: null,
        addSpot: false,
        name: "",
        description: "",
        facilities: "",
        availability: "available",
        imageFile: null,
        submittedData: null,
        ownerCampintSpots: [],
        // spotImage: null,
        message: null
      };
    },
    created() {
      this.ownerId = localStorage.getItem("ownerId");
      if(this.ownerId){
        this.ownerSpots();
      }
    },
    methods: {
      toggleForm() {
        this.addSpot = !this.addSpot;
      },
      async ownerSpots() {
        let owner = new Owner();
        try {
          this.ownerCampintSpots = await owner.fetchOwnerCampingSpots(this.ownerId);
        } catch (error) {
          console.error("Error accessing spots", error);
        }
      },
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageFile = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      async handleSubmit() {
        // const newSpot = {
        //   id: 0,
        //   name: this.name,
        //   city: this.city,
        //   postalNum: this.postal,
        //   streetNum: Number(this.street),
        //   houseNum: this.house ? Number(this.house) : null,
        //   description: this.description,
        //   facilities: this.facilities,
        //   availability: this.availability,
        //   image: "site/pic.jpg",
        //   owner_Id: Number(this.ownerId)
        // };
          const formData = new FormData();
          formData.append('Name', this.name);
          formData.append('City', this.city);
          formData.append('PostalNum', this.postalNum);
          formData.append('StreetNum', this.streetNum);
          formData.append('HouseNum', this.houseNum);
          formData.append('Description', this.description);
          formData.append('Facilities', this.facilities);
          formData.append('Availability', this.availability);
          formData.append('ImageFile', this.imageFile);
          formData.append('Owner_Id', this.ownerId);
        
        const newOwner = new Owner();
        try {
          const success = await newOwner.addCampingSpot(formData);
          if (success) {
            this.ownerCampintSpots.push(formData);
            this.message = "spot added successully";
            setTimeout(() => {
              this.message = null;
              this.resetForm();
              this.toggleForm();
            },2000);
            
          } else {
            this.message = "Failed to add camping spot";
            setTimeout(() => {
              this.message = null;
              this.resetForm();
              this.toggleForm();
            },2000);
          }
        } catch (error) {
          console.error("Error adding camping spot", error);
        }
      },
      resetForm() {
        this.name = "";
        this.city = "";
        this.postal = "";
        this.street = "";
        this.house = "";
        this.description = "";
        this.facilities = "";
        this.availability = "available";
        this.imageFile = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .submit-form {
    border: 2px solid green;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    background-color: aliceblue;
    color: black;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
  }
  button:hover{
    background-color: green;
  }
  .container_spots {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .camping-spot {
    flex-direction: column;
    width: 200px;
    margin: 10px;
    background-color: aquamarine;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: black;
  }
  .camping-spot img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    object-fit: cover;
  }
  </style>
  