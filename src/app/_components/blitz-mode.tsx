/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";


import { type Game, type Question } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Timer } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";


type Props = {
    game: Game & {
        questions: Pick<Question, 'id' | 'question' | 'options'>[];

    }
};

const BlitzMode = ({ game }: Props) => {
    const [questionIndex, setQuestionIndex ] = React.useState(0);
    const [selectedChoice, setSelectedChoice] = React.useState<number>(0);





    const currentQuestion = React.useMemo(() => {
        return game.questions[questionIndex];
    }, [questionIndex, game.questions]);

    const options = React.useMemo(() => {
        if(!currentQuestion) return [];
        if(!currentQuestion.options) return [];
        return JSON.parse(currentQuestion.options as string) as string[];
    }, [currentQuestion]);









    return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2 ">
            <div className="flex flex-col md:flex-row justify-between gap-3 p-4">
                <div className="flex items-center space-x-3">
                        <Avatar>
                            <AvatarImage src={game.profileCharacter} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="text-slate-400">{game.username}</span> &nbsp;
                        <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
                            {"presitige"}
                        </span>
                    </div>
                <div className="w-full pt-4">
                <div className="flex items-center gap-2">
                    <span className="text-slate-400 ">1 </span>
                <Image src='/assets/imgs/Ranking.webp' width={30} height={10} alt='' className="w-4 h-5" />
                    <Progress value={30} className="w-full h-1 ml-2 " />
                </div>
                <div className="flex px-24 justify-between">
                    <span>hello</span>
                    <span>hello</span>
                </div>
                    </div>
                <div className="flex self-start mt-3 text-slate-400">
                        <Timer className="mr-2" />
                        <span>00:00</span>
                </div>
            </div>
            <Card className="w-full mt-4">
                <CardHeader className="flex flex-row items-center">
                    <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
                            <div>{questionIndex + 1}</div>
                            <div className="text-base text-slate-400">
                                {game.questions.length}
                            </div>
                    </CardTitle>
                    <CardDescription className="flex-grow text-lg">
                            {currentQuestion?.question}
                    </CardDescription>
                </CardHeader>
            </Card>
            <div className="flex flex-col items-center justify-center w-full mt-4">
                {options.map((option, index) => {
                    return (
                        <Button 
                        key={index} 
                        className="justify-start w-full py-8 mb-4"
                        variant={selectedChoice === index ? 'default' : 'secondary'}
                        onClick={() => {
                            setSelectedChoice(index);
                        }}
                        >
                            <div className="flex items-center justify-start">
                                <div className="p-2 px-3 mr-5 border rounded-md">
                                    {index + 1}
                                </div>
                                <div className="text-start">
                                    {option}
                                </div>
                            </div>
                        </Button>
                    )
                })}
                <Button className="mt-2">
                    Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    )
}

export default BlitzMode;