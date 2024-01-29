import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        name: "cards",
        component: () => import("../components/GridCardsComponent.vue")
    },
    {
        path: "/tutorials",
        name: "tutorials",
        component: () => import("../components/ TutorialsList.vue")
    },
    {
        path: "/add",
        name: "add",
        component: () => import("../components/AddTutorial.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;