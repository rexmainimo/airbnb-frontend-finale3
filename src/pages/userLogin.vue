<template>
    <div>
        <h1>Welcome to AirBnb Campaign</h1>
        <message-box :message="message" />
        <form @submit.prevent="fetchUser()" class="login-form">
            <h2>Log In</h2>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="loginData.email" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="loginData.password" required>
            </div>
            <button type="submit">Log In</button>
            <br><br>
            <button type="button" @click="redirectToRegistration">Create account</button>
        </form>
    </div>
</template>

<script>
import messageBox from "../components/messageBox.vue";

export default {
    components: {
        messageBox,
    },
    data() {
        return {
            loginData: {
                email: "",
                password: "",
            },
            message: null
        };
    },
    methods: {
        async fetchUser() {
            try {
                const response = await fetch("https://localhost:7156/User/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.loginData)
                });

                if (response.ok) {
                    const userData = await response.json();
                    const id = Number(userData.message);

                    localStorage.setItem("userId", id);

                    this.message = "Login Successful";

                    // Redirect to userHome with userId as a route param
                    setTimeout(() => {
                        this.$router.push({ name: "userHome"});
                        this.message = null;
                    }, 2000);
                    
                } else {
                    this.message = "Login failed: Invalid credentials";
                    //.error('Login failed:', response.statusText);

                    setTimeout(() => {
                        this.message = null;
                    }, 2000);
                }
            } catch (error) {
                console.error('Error occurred during login:', error);
            }
        },
        redirectToRegistration() {
            this.$router.push("/userSignIn");
        }
    }
};
</script>

<style scoped>
.login-form, .register-form{
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
label{
    font: bold;
    margin-bottom: 5px;
}
input{
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;

}
button{
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 15px 45px;
    border-radius: 30px;
    cursor: pointer;
}
</style>