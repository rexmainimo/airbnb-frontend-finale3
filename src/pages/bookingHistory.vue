<template>
    <div>
        <nav>
            <button @click="goHome" class="home-button">Home</button>
        </nav>
        <h1>
            My Bookings
        </h1>
        <message-box :message="message" />
        <div v-for="detail in bookedSpots" :key="detail.id" class="container-spots">
            <div class="spots">
                <h3><strong>Name: </strong>{{ detail.campingSpotName }}</h3>
                <p>Camping Spot Number: {{ detail.id }}</p>
                <p><strong>Booking Date: </strong> {{ detail.bookingDate }}</p>
                <p><strong>Start Date: </strong> {{ detail.startDate }}</p>
                <p><strong>End Date: </strong> {{ detail.endDate }}</p>
                <p><strong>Number of People: </strong> {{ detail.numOfPeople }}</p>
                <p><strong>Amount Paid: </strong> {{ detail.price }}</p>
                <p><strong>City: </strong>{{ detail.campingSpotCity }}</p>
                <p><strong>Postal Number: </strong>{{ detail.postalNum }}</p>
                <p><strong>Street Number: </strong>{{ detail.streetNum }}</p>
                <p><strong>House Number: </strong>{{ detail.houseNum }}</p>
                <p><strong>Description: </strong>{{ detail.campingSpotDescription }}</p>
                <p><strong>Facilities: </strong>{{ detail.campingSpotFacilities }}</p>
                <img :src="`data:${detail.imageContentType};base64,${detail.imageData}`" alt="Camping Spot Image" v-if="detail.imageData"/>
                <button @click="showCancelConfirmation(detail.id)">Cancel Booking</button>
            </div>
        </div>
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h3>Confirm Cancellation</h3>
                <p>Are you sure you want to cancel this booking?</p>
                <button @click="confirmCancelBooking">Yes, Cancel</button>
                <button @click="closeModal">No, Keep Booking</button>
            </div>
        </div>
    </div>
</template>

<script>
import User from "../classes/User.js";
import messageBox from "../components/messageBox.vue";

export default {
    components: {
        messageBox
    },
    data() {
        return {
            userId: localStorage.getItem("userId"),
            user: null,
            bookedSpots: [],
            showModal: false,
            bookingToCancel: null,
            message: null
        };
    },
    created() {
        if (this.userId) {
            this.userClass = new User(this.userId);
            this.userBookingHistory();
        } else {
            this.$router.push({ name: "userLogin" });
        }
    },
    methods: {
        async userBookingHistory() {
            try {
                const userClass = new User(this.userId);
                const bookings = await userClass.userBookings();
                this.bookedSpots = bookings;
            } catch (error) {
                console.log("Error obtaining booking history", error);
            }
        },
        showCancelConfirmation(bookingId) {
            this.bookingToCancel = bookingId;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.bookingToCancel = null;
        },
        async confirmCancelBooking() {
            if (this.bookingToCancel) {
                await this.cancelBooking(this.bookingToCancel);
                this.closeModal();
            }
        },
        async cancelBooking(bookingId) {
            try {
                const response = await fetch(`https://localhost:7156/Booking/deleteBooking?booking_id=${bookingId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    this.bookedSpots = this.bookedSpots.filter(booking => booking.id !== bookingId);
                    this.message = "Booking cancelled successfully";
                    setTimeout(() => {
                        this.message = null;
                    }, 2000);
                } else {
                    this.message = "Failed to cancel booking";
                    setTimeout(() => {
                        this.message = null;
                    }, 2000);
                }
            } catch (error) {
                console.error('Error cancelling booking:', error);
                this.message = "An error occurred while cancelling the booking";
                setTimeout(() => {
                    this.message = null;
                }, 2000);
            }
        },
        goHome() {
            this.$router.push({ name: "userHome" });
        }
    }
};
</script>

<style scoped>
.container-spots {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.spots {
    flex-direction: column;
    width: 200px;
    margin: 10px;
    background-color: aquamarine;
    padding: 10px;
    border: 1px solid #ccc;
    color: black;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.spots img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    object-fit: cover;
}
button{
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 15px 45px;
    border-radius: 30px;
    cursor: pointer;
}
button:hover {
    background-color: green;
}
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
}
.message-box {
    background-color: #f0f8ff;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: opacity 0.5s ease-in-out;
    opacity: 1;
    color: black;
    margin: 20px 0;
}
</style>
