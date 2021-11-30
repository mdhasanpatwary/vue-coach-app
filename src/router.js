import { defineAsyncComponent } from 'vue'

import { createRouter, createWebHistory } from 'vue-router';

import CoachList from './pages/coaches/CoachesList.vue';
// import CoachDetail from './pages/coaches/CoachDetail.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';

// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestReceived from './pages/requests/RequestReceived.vue';
// import UserAuth from './pages/auth/UserAuth.vue';

import NotFound from './pages/NotFound.vue'

import store from './store/index.js';


const CoachDetail = defineAsyncComponent(() => import('./pages/coaches/CoachDetail.vue'));
const CoachRegistration = defineAsyncComponent(() => import('./pages/coaches/CoachRegistration.vue'));
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach.vue'));
const RequestReceived = defineAsyncComponent(() => import('./pages/requests/RequestReceived.vue'));
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'));

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachList },
        { path: '/coaches/:id', component: CoachDetail, props: true, children: [
            { path: 'contact', component: ContactCoach }  //coaches/c1/contact
        ]},
        { path: '/register', component: CoachRegistration, meta: {requiresAuth: true} },
        { path: '/requests', component: RequestReceived, meta: {requiresAuth: true} },
        { path: '/auth', component: UserAuth, meta: {requiresUnAuth: true} },
        { path: '/:notFound(.*)', component: NotFound },
    ]
});

//Navigation Guard
router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
});

export default router;