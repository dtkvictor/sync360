import axios from './axios';


export default {

    status: localStorage.getItem('emailVerificationCodeStatus'),

    hasCode() {
        return this.status === 'true';
    },

    sendCode() {
        axios.post('auth/send-email-verification-code')
            .then(() => {
                localStorage.setItem('emailVerificationCodeStatus', 'true');
            });
    }
}