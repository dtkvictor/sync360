import userStorage from "@/storage/UserStorage";
import SendCodeEmailVerification from "@/service/SendCodeEmailVerification";

export default function VerifyEmailMiddleware(to:any) 
{
    const user = userStorage.getUser();
    
    if(!user || user.email_verified_at) return;

    if(!SendCodeEmailVerification.hasCode()) {
        SendCodeEmailVerification.sendCode()
    }

    if(to.name !== 'auth.verify-email') {
        return { name: 'auth.verify-email' };
    }

    if(to.name === 'auth.verify-email') {
        return { next: false };
    }
} 