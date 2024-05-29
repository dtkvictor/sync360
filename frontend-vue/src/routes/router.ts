import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import UnauthMiddleware from "@/middlewares/UnauthMiddleware";
import VerifyEmailMiddleware from "@/middlewares/VerifyEmailMiddleware";
import CreateProfileMiddleware from "@/middlewares/CreateProfileMiddleware";
import CreateAddressMiddleware from "@/middlewares/CreateAddressMiddleware";

import Index from '@/pages/home/Index.vue';
import AddressCreate from "@/pages/address/AddressCreate.vue";
import AddressUpdate from "@/pages/address/AddressUpdate.vue";
import ProfileCreate from "@/pages/profile/ProfileCreate.vue";
import ProfileUpdate from "@/pages/profile/ProfileUpdate.vue";

import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import RecoverPassword from "@/pages/auth/RecoverPassword.vue";
import UpdatePassword from "@/pages/auth/UpdatePassword.vue";
import VerifyEmail from "@/pages/auth/VerifyEmail.vue";

const routes:Array<RouteRecordRaw> = [
    { path: '/', name: 'home.index', component: Index },
    { path: '/home', redirect: '/'},

    { path: '/profile/create', name: 'profile.create', component: ProfileCreate },
    { path: '/profile/update', name: 'profile.update', component: ProfileUpdate },
    { path: '/address/create', name: 'address.create', component: AddressCreate },
    { path: '/address/update', name: 'address.update', component: AddressUpdate },

    { path: '/auth/login', name: 'auth.login', component: Login },
    { path: '/auth/register', name: 'auth.register', component: Register },
    { path: '/auth/recover-password', name: 'auth.recover-password', component: RecoverPassword },
    { path: '/auth/update-password', name: 'auth.update-password', component: UpdatePassword },
    { path: '/auth/verify-email', name: 'auth.verify-email', component: VerifyEmail},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach(async (to:any, from: any) => {

    const middewares:Array<Function> = [
        UnauthMiddleware,
        AuthMiddleware,
        VerifyEmailMiddleware,
        CreateProfileMiddleware,
        CreateAddressMiddleware
    ];

    for(let middleware of middewares) {        
        let result = middleware(to, from);
        if(result && result.next === false) break;
        if(result) return result;
    }
});

export default router;