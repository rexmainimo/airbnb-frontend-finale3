<template>
    <div class="profile-container">
      <div class="profile-picture" @click="triggerFileInput">
        <img :src="profilePicture || defaultProfilePicture" alt="User Profile Picture" />
        <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" />
      </div>
      <p>{{ userName }}</p>
      <message-box :message="message" />
      <div class="profile-dropdown">
        <button @click="toggleDropdown">{{ dropdownOpen ? 'Close' : 'Open' }} Profile</button>
        <div v-if="dropdownOpen" class="dropdown-content">
          <ul>
            <li><router-link :to="{ path: '/userDetails' }">My Details</router-link></li>
            <li><router-link :to="{ path: '/bookingHistory' }">My Bookings</router-link></li>
            <li><button @click="logout">Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import router from "@/router/index.js";
import User from "../classes/User.js";
import messageBox from "../components/messageBox.vue";
  export default {
    components: {
      messageBox
    },
    data() {
      return {
        dropdownOpen: false,
        profilePicture: '', 
        defaultProfilePicture: require('@/assets/profile-picture.jpg'), 
        userId: localStorage.getItem('userId'), 
        userName: '', 
        user: "",
        message: null
      };
    },
    created() {
      if (this.userId) {
        this.user = new User(this.userId);
        this.user.fetchProfilePicture().then(imageFile => {
          if (imageFile) {
            this.profilePicture = imageFile;
          }
        }).catch(error => {
          console.error("Error fetching profile picture:", error);
        });
  
        this.user.getUserName(this.userId).then(name => {
          if (name) {
            this.userName = name;
          }
        }).catch(error => {
          console.error("Error fetching user name:", error);
        });
      } else {
        this.$router.push({ name: "userLogin" });
      }
    },
    methods: {
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      },
      logout(){
        this.message = "Logout successful";
        localStorage.removeItem("userId");
        setTimeout(() => {
          this.message = null;
          router.push({name: "home"})
        },2000);
      },
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      async onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append('profilePicture', file);
          //formData.append('userId', this.userId); 
          console.log(this.userId)
          try {
            const response = await fetch(`http://localhost:5156/User/uploadProfilePicture?userId=${this.userId}`, {
              method: 'POST',
              body: formData
            });
  
            if (response.ok) {
              const blob = await response.blob();
              const contentType = response.headers.get('Content-Type');
              const imageBlob = new Blob([blob], { type: contentType });
              const imageUrl = URL.createObjectURL(imageBlob);
              this.profilePicture = imageUrl;
            } else {
              console.error('Error uploading profile picture:', await response.text());
            }
          } catch (error) {
            console.error('Error uploading profile picture:', error);
          }
        }
      },
    }
  };
  </script>
  
  <style>
  .profile-container {
    position: absolute;
    top: 10px;
    right: 10px;
    text-align: center;
  }
  
  .profile-picture {
    margin-bottom: 10px;
    cursor: pointer;
    display: inline-block;
    position: relative;
  }
  
  .profile-picture img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #ccc;
  }
  
  .profile-dropdown {
    position: relative;
  }
  
  .profile-dropdown button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .profile-dropdown button:hover {
    background-color: #2980b9;
  }
  
  .dropdown-content {
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 40px;
    right: 0;
    width: 200px;
    z-index: 1000;
    border-radius: 5px;
    padding: 10px;
  }
  
  .dropdown-content ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .dropdown-content li {
    margin: 10px 0;
  }
  
  .dropdown-content a,
  .dropdown-content button {
    text-decoration: none;
    color: #3498db;
    display: block;
    padding: 10px;
    border-radius: 5px;
  }
  
  .dropdown-content a:hover,
  .dropdown-content button:hover {
    background-color: #f0f0f0;
  }
  </style>