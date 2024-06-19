<template>
    <div>
        <h1>
            Welcome to AirBnb Campaign
        </h1>
        <message-box :message="message" />
        <form @submit.prevent="fetchOwner()" class="login-form">
            <h2>
                Login as Owner
            </h2>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="loginData.email" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="loginData.password" required>
            </div>
            <button type="submit">Log In</button>
            <br>
            <br>
            <button type="button" @click="registerOwner">Create account</button>
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
                loginData: {
                    email: "",
                    password: ""
                },
                message: null
            };
        },
        methods: {
            async fetchOwner() {
                try{
                    const response = await fetch("https://localhost:7156/Owner/login",{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(this.loginData)
                    });

                    if(response.ok) {
                        const userData = await response.json();
                        const id = Number(userData);

                        this.message = "Login successfully";
                        setTimeout(() => {
                            this.message = null;
                            localStorage.setItem("ownerId", id);
                            router.push("/ownerHome");
                        },2000);
                        
                    }else{
                        this.message = "Login failed";
                        setTimeout(() => {
                            this.message = null;
                        },2000);
                    }

                }catch (error) {
                    console.error('Error occurred during login:', error);
                }

            },
            registerOwner() {
                router.push('/ownerSignIn')
            }
        }
    };
</script>

<style scoped>
.login-form{
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
button.hover{
    background-color: red;
}
</style>