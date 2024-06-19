<template>
    <div v-if="message" class="modal-overlay">
        <div class="message-box">
            <h2>
                {{ message }}
            </h2>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: null
        }
    }
}
</script>

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
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
    z-index: 1001;
    text-align: center; 
}
</style>
