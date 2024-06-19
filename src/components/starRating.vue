<template>
    <div class="star-rating">
      <span v-for="star in 5" :key="star" class="star" @click="setRating(star)" @mouseover="hoverRatings(star)" @mouseleave="resetHover">
        <i :class="['fa', star <= computedRating ? 'fa-star' : 'fa-star-o']"></i>
      </span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StarRating',
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        currentRating: this.value,
        hoverRating: 0
      };
    },
    methods: {
      setRating(rating) {
        event.stopPropagation(); 
        this.currentRating = rating;
        this.$emit('input', rating);  // Emit input event to update v-model
      },
      hoverRatings(rating) {
        this.hoverRating = rating;
      },
      resetHover() {
        this.hoverRating = 0;
      }
    },
    computed: {
      computedRating() {
        return this.hoverRating || this.currentRating;
      }
    }
  };
  </script>
  
  <style scoped>
  .star-rating {
    display: flex;
    flex-direction: row;
  }
  .star {
    cursor: pointer;
    font-size: 2em;
    color: gold;
  }
  .fa-star-o {
    color: lightgray;
  }
  </style>