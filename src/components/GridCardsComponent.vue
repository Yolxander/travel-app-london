<template>
    <div class="row row-cols-1 row-cols-md-3">
        <div class="btn-group btn-group-toggle mb-4" data-toggle="buttons">
            <label class="btn btn-secondary" :class="{ active: filterOption === 'upcoming' }">
                <input type="radio" name="options" id="option1" @click="setFilterOption('upcoming')"> Coming Up
            </label>
            <label class="btn btn-secondary" :class="{ active: filterOption === 'done' }">
                <input type="radio" name="options" id="option3" @click="setFilterOption('done')"> Done
            </label>
        </div>
        <div class="col mb-4" v-for="(tutorial, index) in filteredTutorials" :key="index">

        <div class="card border-success mb-3" style="max-width: 100%;">
                <div class="card-header bg-transparent border-success">{{ tutorial.location }}</div>
                <div class="card-body text-success">
                    <h5 class="card-title">{{ tutorial.title }}</h5>
                    <p class="card-text">{{ tutorial.description }}</p>
                </div>
                <div class="card-footer bg-transparent border-success">{{ tutorial.date }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
    name: "GridCardsComponent",
    data() {
        return {
            tutorials: [],
            filteredTutorials: [],
            filterOption: 'upcoming', // Default filter option
        };
    },
    methods: {
        onDataChange(items) {
            let _tutorials = [];

            items.forEach((item) => {
                let key = item.key;
                let data = item.val();
                _tutorials.push({
                    key: key,
                    title: data.title,
                    description: data.description,
                    date: data.date,
                    location: data.location,
                    published: data.published,
                });
            });

            // Sorting tutorials by date
            this.tutorials = _tutorials.sort((a, b) => {
                // Assuming date is in 'YYYY-MM-DD' format; if not, modify accordingly
                return new Date(a.date) - new Date(b.date);
            });


        },
        filterTutorials() {
            const today = new Date();
            if (this.filterOption === 'upcoming') {
                this.filteredTutorials = this.tutorials
                    .filter(tutorial => new Date(tutorial.date) >= today)
                    .slice(0, 5); // Get first 5 upcoming tutorials
            } else if (this.filterOption === 'done') {
                this.filteredTutorials = this.tutorials
                    .filter(tutorial => new Date(tutorial.date) < today);
            }
        },
        setFilterOption(option) {
            this.filterOption = option;
            this.filterTutorials();
        }
    },
    mounted() {
        TutorialDataService.getAll().on("value", this.onDataChange);
        this.filterTutorials(); // Initial filter
    },
    beforeUnmount() {
        TutorialDataService.getAll().off("value", this.onDataChange);
    },
    watch: {
        tutorials: function () {
            this.filterTutorials();
        }
    }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
