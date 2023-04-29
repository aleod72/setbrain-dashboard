'use client';

import * as React from 'react';
import { Button, Input } from 'ui';

import { useSupabase } from '../providers/supabase-provider';

const AuthForm = () => {
    const { supabase } = useSupabase();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
    };

    const handleEmailLogin = async () => {
        await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
    };

    return (
        <section className="md:bg-darkgrey-100 min-w-max max-w-md w-2/4 md:rounded-[32px] md:py-8 md:px-10 md:border-2 md:border-lightgrey-100 gap-6 flex flex-col">
            <div className="flex flex-col gap-4">
                <h1 className="text-white-100 text-subtitle-m font-bold">
                    Connexion
                </h1>
                <Button
                    fullWidth={true}
                    intent="social"
                    iconLeft="google"
                    onClick={handleGoogleLogin}
                >
                    Se connecter avec google
                </Button>
            </div>
            <div className="flex gap-2 items-center justify-center">
                <span className="h-1 bg-white-48 flex-1 rounded-full"></span>
                <span className="flex-none text-white-100">ou avec</span>
                <span className="h-1 bg-white-48 flex-1 rounded-full"></span>
            </div>
            <div className="flex flex-col gap-3">
                <Input
                    fullWidth={true}
                    label="Email"
                    type="email"
                    placeholder="Entrez votre email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    fullWidth={true}
                    label="Mot de passe"
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button
                fullWidth={true}
                intent="primary"
                onClick={handleEmailLogin}
            >
                Se connecter
            </Button>
        </section>
    );
};

export default AuthForm;
