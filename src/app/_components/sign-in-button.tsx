'use client';

import React from 'react';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

type Props = {
    text: string;
};

const SignInButton = ({ text }: Props) => {
    return (
        <Button
        onClick={() => {
            signIn('google').catch(console.error)
        }}
        >
            {text}
        </Button>
    );
};

export default SignInButton;