import { getServerAuthSession } from "@/server/auth";
import QuizCreation from "../_components/quiz-creation";
import { redirect } from "next/navigation";
import React from "react";







export const metadata = {
    title: "Quiz | Quizzzy",
    description: "Quiz yourself on anything!",
  };
  
  interface Props {
    searchParams: {
      mode?: "blitz" | "normal" | undefined
    };
  }
  
  const Quiz = async ({ searchParams }: Props) => {
    const session = await getServerAuthSession();
    if (!session?.user) {
      redirect("/");
    }
    return <QuizCreation mode={searchParams.mode ?? "normal"} />;
  };
  
  export default Quiz;