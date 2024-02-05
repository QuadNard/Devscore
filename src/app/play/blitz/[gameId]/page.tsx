/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */


import BlitzMode from "@/app/_components/blitz-mode";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
    params: {
        gameId: string;
    };
};


const BlitzPage = async ({ params: { gameId }}: Props) => {
    const session = await  getServerAuthSession();
    if(!session?.user) {
        redirect('/');
    }
    const game = await db.game.findUnique({
        where: {
            id: gameId
        },
        include: {
            questions: {
                select: {
                    id: true,
                    question: true,
                    options: true,
                }
            },    
        },
    });
    if (!game || game.gameType !== 'blitz') {
        return redirect('/quiz')
    }

    return <BlitzMode game={game} />
}

export default BlitzPage;