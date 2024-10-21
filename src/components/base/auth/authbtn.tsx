"use client";
import React from 'react';
import styles from './authbtn.module.scss';
import { signIn } from 'next-auth/react';

interface AuthBtnsProps {
    provider: 'google' | 'github';
}

const AuthBtn: React.FC<AuthBtnsProps> = ({ provider }) => {
    const handleSignIn = async (providerName: string) => {
        try {
            await signIn(providerName, { callbackUrl: '/' });
        } catch (error) {
            console.error('Failed to sign in:', error);
        }
    };
    return (
        <>
            {provider === 'google' && (
                <button onClick={() => handleSignIn('google')} className={styles.provider}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.providerlogo} width="29" height="29" viewBox="0 0 25 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.1 12.227C22.1 11.518 22.0364 10.8361 21.9182 10.1816H12.5V14.0498H17.8818C17.65 15.2998 16.9455 16.3589 15.8864 17.068V19.577H19.1182C21.0091 17.8361 22.1 15.2725 22.1 12.227Z" fill="#4285F4" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4998 21.9994C15.1998 21.9994 17.4635 21.104 19.118 19.5767L15.8862 17.0676C14.9907 17.6676 13.8453 18.0222 12.4998 18.0222C9.89529 18.0222 7.69075 16.2631 6.90439 13.8994H3.56348V16.4903C5.20893 19.7585 8.59075 21.9994 12.4998 21.9994Z" fill="#34A853" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.90455 13.8997C6.70455 13.2997 6.59091 12.6588 6.59091 11.9997C6.59091 11.3406 6.70455 10.6997 6.90455 10.0997V7.50879H3.56364C2.88636 8.85879 2.5 10.3861 2.5 11.9997C2.5 13.6133 2.88636 15.1406 3.56364 16.4906L6.90455 13.8997Z" fill="#FBBC05" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4998 5.97727C13.968 5.97727 15.2862 6.48182 16.3226 7.47273L19.1907 4.60455C17.4589 2.99091 15.1953 2 12.4998 2C8.59075 2 5.20893 4.24091 3.56348 7.50909L6.90439 10.1C7.69075 7.73636 9.89529 5.97727 12.4998 5.97727Z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>
            )}

            {provider === 'github' && (
                <button onClick={() => handleSignIn('github')} className={styles.provider}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.providerlogo} width="26" height="26" viewBox="0 0 143 143" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M71.5 2C31.9963 2 0 33.9963 0 73.5C0 105.139 20.4669 131.862 48.8881 141.336C52.4631 141.961 53.8038 139.816 53.8038 137.939C53.8038 136.241 53.7144 130.611 53.7144 124.623C35.75 127.929 31.1025 120.243 29.6725 116.221C28.8681 114.166 25.3825 107.82 22.3438 106.122C19.8413 104.781 16.2663 101.474 22.2544 101.385C27.885 101.296 31.9069 106.569 33.2475 108.714C39.6825 119.528 49.9606 116.489 54.0719 114.613C54.6975 109.965 56.5744 106.837 58.63 105.049C42.7213 103.262 26.0975 97.095 26.0975 69.7463C26.0975 61.9706 28.8681 55.5356 33.4263 50.5306C32.7113 48.7431 30.2088 41.4144 34.1413 31.5831C34.1413 31.5831 40.1294 29.7063 53.8038 38.9119C59.5238 37.3031 65.6013 36.4987 71.6788 36.4987C77.7563 36.4987 83.8338 37.3031 89.5538 38.9119C103.228 29.6169 109.216 31.5831 109.216 31.5831C113.149 41.4144 110.646 48.7431 109.931 50.5306C114.489 55.5356 117.26 61.8813 117.26 69.7463C117.26 97.1844 100.547 103.262 84.6381 105.049C87.23 107.284 89.4644 111.574 89.4644 118.277C89.4644 127.84 89.375 135.526 89.375 137.939C89.375 139.816 90.7156 142.051 94.2906 141.336C122.533 131.862 143 105.049 143 73.5C143 33.9963 111.004 2 71.5 2Z" fill="white" />
                    </svg>
                    Continue with Github
                </button>
            )}
        </>
    );
};

export default AuthBtn;
