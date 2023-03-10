import { createRouter, createWebHashHistory } from "vue-router";
import DamageCal from "../components/views/DamageCal.vue";
import EXRateCal from "../components/views/EXRateCal.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: DamageCal
        },
        {
            path: "/ex",
            component: EXRateCal
        }
    ]
});

export default router;