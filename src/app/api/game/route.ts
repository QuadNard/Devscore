/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { NextResponse } from "next/server";
import { blitzData, normalData } from "@/lib/data";
import { ZodError } from "zod";
import { getServerAuthSession } from "@/server/auth";
import { quizSchema } from "@/schemas/quiz";
import  { db } from "@/server/db";




export async function POST(req: Request,) {
    try {
        const session = await getServerAuthSession();
        if(!session?.user) {
            return NextResponse.json(
                {
                    error: "You must be logged in to play a game"
                },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { mode, profileCharacter, username } = quizSchema.parse(body);
        const game = await db.game.create({
            data: {
                gameType: mode,
                timeStarted: new Date(),
                userId: session.user.id.toString(),
                username: username,
                profileCharacter: profileCharacter
            }
        }); 

     
        const NormalMode = normalData;
        
        if(mode === 'blitz') {
            type mcqQuestion = {
                question: string;
                answer: string;
                option1: string;
                option2: string;
                option3: string;
            }
                 const manyData = blitzData.map((question: mcqQuestion) => {
                const options = [question.answer, question.option1, question.option2, question.option3];
                options.sort(() => Math.random() - 0.5);
                return {
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options),
                    gameId: game.id,
                    questionType: 'blitz' as const
                }
            })
            await db.question.createMany({
                data: manyData,
            })
        } else if (mode === 'normal'){
            type mcqQuestion = {
                question: string;
                answer: string;
                option1: string;
                option2: string;
                option3: string;
            }
                 const manyData = NormalMode.map((question: mcqQuestion) => {
                const options = [question.answer, question.option1, question.option2, question.option3];
                options.sort(() => Math.random() - 0.5);
                return {
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options),
                    gameId: game.id,
                    questionType: 'normal' as const
                }
            })
            await db.question.createMany({
                data: manyData,
            })
        }
        return NextResponse.json({
            gameId: game.id
        })
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        {
            error: "Something went wrong"
        },
        { status: 500}
      )
    }

}