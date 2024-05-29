import userStorage from "@/storage/UserStorage";

export default function(to:any) {
    const notIgnore:Array<string> = [
        'auth.login', 
        'auth.register',
        'auth.recover-password',
        'auth.update-password',
    ];

    if(userStorage.isAuth() && notIgnore.includes(to.name)) {
        return { name: 'home.index' };
    }
}
