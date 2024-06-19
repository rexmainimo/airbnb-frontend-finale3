<template>
    <div>
        <h1>
            Welcome to AirBnb Campaign official website
        </h1>
            <div class="main-page">
                <h3>
                    Navigate to user login page or sign up
                </h3>
                <div class="form-group">
                    <button @click="goToUserLogin">User Login</button>
                </div>
                <h3>
                    Navigate to owner login page or sign up
                </h3>
                <div class="form-group">
                    <button @click="goToOwnerLogin">Owner Login</button>
                </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    methods: {
      goToUserLogin() {
        this.$router.push({ name: 'userLogin' });
      },
      goToOwnerLogin() {
        this.$router.push({ name: 'ownerLogin' });
      }
    }
  }
  </script>
  
  <style>
  .main-page {
    border: 2px solid green;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    background-color: aliceblue;
    color: black;
  }
  .form-group{
    margin-bottom: 15px;
 }
  .box {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
  