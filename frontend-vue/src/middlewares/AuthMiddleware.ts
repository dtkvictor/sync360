import userStorage from "@/storage/UserStorage";

export default function(to:any) {
    const ignore:Array<string> = [
        'auth.login', 
        'auth.register',
        'auth.recover-password',
        'auth.update-password',
    ];

    if(!userStorage.isAuth() && !ignore.includes(to.name)) {
        return { name: 'auth.login' };
    }
    if(!userStorage.isAuth() && ignore.includes(to.name)) {
        return { next: false };
    }
}
