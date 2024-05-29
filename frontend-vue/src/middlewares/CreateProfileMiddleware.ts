import userStorage from "@/storage/UserStorage";

export default function(to: any) {
    if(!userStorage.hasProfile() && to.path !== '/profile/create') {
        return { name: 'profile.create' };
    }
    if(!userStorage.hasProfile() && to.path === '/profile/create') {
        return { next: false };
    }
}