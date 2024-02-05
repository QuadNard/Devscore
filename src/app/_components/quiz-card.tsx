/* eslint-disable @typescript-eslint/ban-types */
"use client";
import React from "react";

import { BrainCircuit } from 'lucide-react'

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


type Props = {};

const QuizCard = (props: Props) => {

    const router = useRouter();

    return (
        <Card className='hover:cursor-pointer hover:opacity-75' onClick={() => {
            router.push('/quiz')
        }}>
            <CardHeader className='flex flex-row items-center justify-center'>
                <CardTitle className='text-2xl font-bold'>Quiz</CardTitle>
                <BrainCircuit size={28} strokeWidth={2.5} />
            </CardHeader>

            <CardContent>
                <p className='text-sm text-muted-foreground'>
                        Challenge yourself with a quiz!
                </p>
            </CardContent>
        </Card>
    )
};

export default QuizCard;