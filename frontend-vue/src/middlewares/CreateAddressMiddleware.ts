import userStorage from "@/storage/UserStorage";

export default function(to: any) {
    if(!userStorage.hasAddress() && to.path !== '/address/create') {
        return { name: 'address.create' };
    }
    if(!userStorage.hasAddress() && to.path === '/address/create') {
        return { next: false };
    }
}