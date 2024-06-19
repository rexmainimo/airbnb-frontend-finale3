<template>
    <div>
        <nav>
            <button @click="goHome" class="home-button">Home</button>
        </nav>
        <button @click="toggleForm">{{ switchForms ? "My " : "Change my " }}Details</button>
        <message-box :message="message" />
        <div v-if="showForm">
            <form @submit.prevent="saveChanges" class="update-form">
                <div class="form-group">
                  <label for="firstName">First Name:</label>
                  <input v-model="editedInfo.FirstName" id="firstName"/>
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name:</label>
                  <input v-model="editedInfo.LastName" id="lastName"/>
                </div>
                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input v-model="editedInfo.Email" id="email"/>
                  </div>
                
                <div class="form-group">
                  <label for="PhoneNum">Phone Number:</label>
                  <input v-model="editedInfo.PhoneNum" id="phoneNum"/>
                </div>
                <h3>Change Password:</h3>
                <div class="form-group">
                  <label for="password">Password:</label>
                  <input v-model="editedInfo.Password" id="password"/>
                </div>
                <div class="form-group">
                  <label for="new_password">New Password:</label>
                  <input v-model="new_password" id="new_password"/>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
        <div v-else class="details">
            <h1>My Details</h1>
           <div v-for="info in user" :key="info.id" class="user-info">
                <p class="form-group"><strong>First Name:</strong> {{ info.firstName }}</p>
                <p class="form-group"><strong>Last Name:</strong> {{ info.lastName }}</p>
                <p><strong>Email:</strong> {{ info.email }}</p>
                <p><strong>Phone Number:</strong> {{ info.phoneNum }}</p>
                <p><strong>Password:</strong> {{ info.password.replace(/./g, '*') }}</p>
           </div>
      </div>
    </div>
  </template>
  
  <script>
  import User from "../classes/User.js";
  import messageBox from "../components/messageBox.vue";

  export default {
    components:{
      messageBox
    },
    data() {
      return {
        showForm: false,
        user: null,
        userId: localStorage.getItem("userId"),
        userClass: null,
        new_password: null,
        switchForms: null,
        message: null,
        editedInfo: {
            Id: 0,
            FirstName: null,
            LastName: null,
            Email: null,
            Password: null,
            PhoneNum: "",
            ProfilePictureUrl: null
        }
      };
    },
    created() {
      if (this.userId) {
        this.userClass = new User(this.userId);
        this.getUserInformation();
      } else {
        this.$router.push({ name: "userLogin" });
      }
    },
    methods: {
      async getUserInformation() {
        const userClass = new User(this.userId);
        const userInfo = await userClass.getUserInfo(this.userId);
        if (userInfo) {
          this.user = userInfo; // Ensure reactivity by assigning the plain object
          this.editedInfo = {...userInfo, new_password: "" };
        }
      },

      toggleForm() {
        this.showForm = !this.showForm;
        this.switchForms = !this.switchForms;
        // Reset editedInfor when hiding the form
        if(!this.showForm){
           this.editedInfo = { ...this.user, new_password: "" };
           
        }
      },
      async saveChanges() {
        
        try{
            if(this.new_password != null){
                if(this.verifyPassword(this.editedInfo.Password)){
                    this.editedInfo.Password = this.new_password;
                    this.editedInfo.Id = this.userId;        
                    const updatedUser = await this.userClass.updateUserInfo(this.editedInfo);
                    this.user = updatedUser;
                    this.showForm = false;
                    
                    this.message = "Password updated successfully";
                    setTimeout(() => {
                      this.message = null;
                      this.getUserInformation()
                      this.clearForm();
                    },2000);
                }else{
                  
                    this.message = "Insert correct password";
                    setTimeout(() => {
                      this.message = null;
                    },2000);
                }

            }else{
                this.editedInfo.Id = this.userId;        
                const updatedUser = await this.userClass.updateUserInfo(this.editedInfo);
                this.user = updatedUser;
                this.showForm = false;
                this.message = "Updated successfully";
                    setTimeout(() => {
                      this.message = null;
                      this.getUserInformation()
                      this.clearForm();
                    },2000);
            }
            
        }catch(error){
            console.log("Failed to update user information", error);
        }
       },
       verifyPassword(entered_password){
        // function returns true if the entered password matches user password 
        //when changing password otherwise false, 
        console.log(entered_password)
        for(let value in this.editedInfo){
          if(this.editedInfo[value]["password"] === entered_password){
            return true;
          }
          return false;
        }
            // for(let i = 0; i < this.user.length; i++){
            //     let old_pass = this.user[i]["password"];
                
            //     if(entered_password == old_pass){

            //         return true;
            //     }
            // }
            // return false;
       },
       goHome() {
            this.$router.push({ name: "userHome" });
        },
        clearForm(){
          this.editedInfo.FirstName = "";
          this.editedInfo.LastName = ""
          this.editedInfo.PhoneNum = "";
          this.editedInfo.Email = "";
          this.editedInfo.Password = "";
          this.new_password = "";
        }
    }
  };
  </script>
  
  <style scoped>
  .update-form, .details{
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
    margin: 5px;
    cursor: pointer;
  }
  button:hover{
    background-color: green;
  }
 
  .user-info p {
    font-size: larger;
    color: #333;
    border: 1px solid goldenrod;
    border-radius: 5px;
    
  }
  .home-button{
    text-align: left;
    justify-content: flex-end;
    margin: 10px;
  }
  </style>