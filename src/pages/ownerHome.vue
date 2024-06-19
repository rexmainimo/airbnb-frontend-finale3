<template>
    <div>
        <h1>
            Welcome to Airbnb Campers for Camp Owners
        </h1>
        <button type="button" @click="logout" class="logout-button">Logout</button>
        <message-box :message="message" />
        <owner-spot-component></owner-spot-component>
    </div>
</template>

<script> 
import ownerSpotComponent from "../components/ownerSpotComponent.vue";
import messageBox from '../components/messageBox.vue';
import router from "@/router";
export default {
    components: {
        "owner-spot-component": ownerSpotComponent,
        messageBox
    },
    data() {
        return {
            ownerId: null,
            message: null
        }
    },
    created() {
        this.ownerId = localStorage.getItem("ownerId");
        
    },
    methods: {
        logout(){
            this.message = "logout successfully";
            setTimeout(() =>{
                this.message = null;
                router.push({name: "home"});
            },2000);
        }
    }
}
</script>

<style scoped>
 .logout-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}
.logout-button:hover {
    background-color: red;
}


</style>