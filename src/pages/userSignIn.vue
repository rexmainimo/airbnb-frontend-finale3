<template>
    <div>
      <h1>Welcome to AirBnb Campaign</h1>
      <h2>Register user account</h2>
      <message-box :message="message" />
      <form @submit.prevent="createUser" class="register-form">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="registerData.FirstName" required>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="registerData.LastName" required>
        </div>
        <div class="form-group">
          <label for="phoneNum">Phone Number:</label>
          <input type="text" id="phoneNum" v-model="registerData.PhoneNum" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="registerData.Email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="registerData.PASSWORD" required>
        </div>
        <br>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  import router from '@/router';
  import messageBox from "../components/messageBox.vue";
  export default {
    components: {
        messageBox
    },
    data() {
      return {
        registerData: {
          FirstName: "",
          LastName: "",
          Email: "",
          PASSWORD: "",
          PhoneNum: "",
          ProfilePictureUrl: ""
        },
        message: null
      };
    },
    methods: {
      async createUser() {
        try{
          this.registerData.PhoneNum = Number(this.registerData.PhoneNum);
          const response = await fetch("https://localhost:7156/User/registration",{
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.registerData)
          });
          if(response.ok){
            const userData = await response.json();
            this.message = userData.message;
            setTimeout(() =>{
                router.push({name: "userLogin"});
                this.message = null;
            },2000);
          }else{
            const userData = await response.json();
            this.message = userData.message;
            setTimeout(() =>{
                this.message = null;
            },2000);
            //console.log("registration failed", response.statusText);
          }
  
        }catch(error){
          console.log(error.message);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-form {
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
  input {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  button {
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
  </style>
  