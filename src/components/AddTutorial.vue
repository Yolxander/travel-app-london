<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Title ( something fun and short )</label>
                <input
                        type="text"
                        class="form-control"
                        id="title"
                        required
                        v-model="tutorial.title"
                        name="title"
                />
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea
                    class="form-control"
                    id="description"
                    required
                    v-model="tutorial.description"
                    name="description"
                    rows="4"
                ></textarea>
            </div>


            <div class="form-group">
                <label for="date">Date</label>
                <input
                    type="date"
                class="form-control"
                id="date"
                required
                v-model="tutorial.date"
                name="date"
                />
            </div>

            <div class="form-group">
                <label for="location">Location</label>
                <input
                    class="form-control"
                    id="location"
                    required
                    v-model="tutorial.location"
                    name="location"
                />
            </div>

            <button @click="saveTutorial" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newTutorial">Add</button>
        </div>
    </div>
</template>


<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
    name: "add-tutorial",
    data() {
        return {
            tutorial: {
                title: "",
                description: "",
                location: "",
                date:"",
                published: false
            },
            submitted: false
        };
    },
    methods: {
        saveTutorial() {
            var data = {
                title: this.tutorial.title,
                description: this.tutorial.description,
                date: this.tutorial.date,
                location: this.tutorial.location,
                published: false
            };

            TutorialDataService.create(data)
                .then(() => {
                    console.log("Created new item successfully!");
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        newTutorial() {
            this.submitted = false;
            this.tutorial = {
                title: "",
                description: "",
                location: "",
                date:"",
                published: false
            };
        }
    }
};
</script>