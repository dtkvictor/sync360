export interface Address {
    id?: string,
    user_id?: string,
    country?: string, 
    state?: string,
    city?: string,
    neighborhood?: string,
    street?: string,
    cep?: number
}

export interface Profile {
    id?: string,
    picture?: string,
    user_id?: string,
    name?: string,
    birth_date?: string,
    gender?: string,
    cell_number?: number,
    about_me?: string,
}

export interface User {
    id?: string,
    email?: string,
    email_verified_at?: boolean|null,
    created_at?: string,
    updated_at?: string,
    token?: string,
    profile?: Profile,
    address?: Address,
}

export interface UserStorage {
    user: User|undefined,
    
    isAuth: () => boolean,
    hasToken: () => boolean,
    getToken: () => string|undefined,

    hasUser: () => boolean,
    getUser: () => User|undefined,
    setUser: (user: User) => void,

    hasProfile: () => boolean,
    getProfile: () => Profile|undefined,
    setProfile: (profile: Profile) => void,

    hasAddress: () => boolean,
    getAddress: () => Address|undefined
    setAddress: (address: Address) => void

    delete: Function
}

function loadUser(): User|undefined {
    const user = localStorage.getItem('user');
    if(!user) return undefined;
    return JSON.parse(user);
}

function persistUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
}

function deleteUser() {
    localStorage.removeItem('user');
}

const userStorage:UserStorage = {
    user: loadUser(),

    isAuth() {
        return this.user?.token ? true: false;
    },
    
    hasToken() {
        return this.user?.token ? true: false;
    },
    getToken() {
        return this.user?.token;
    },

    hasUser() {
        return this.user ? true : false;
    },
    getUser() {
        return this.user;
    },
    setUser(user: User) {
        this.user = user;
        persistUser(user);
    },

    hasProfile() {
        return this.user?.profile ? true : false;
    },
    getProfile() {
        return this.user?.profile
    },
    setProfile(profile: Profile) {
        if(!this.user) return;
        this.user.profile = profile;
        persistUser(this.user as User);     
    },

    hasAddress() {
        return this.user?.address ? true : false;
    },
    getAddress() {
        return this.user?.address
    },
    setAddress(address: Address) {
        if(!this.user) return;
        this.user.address = address;        
        persistUser(this.user as User);
    },

    delete() {
        this.user = undefined;
        deleteUser();
    }
}

export default userStorage;