/* eslint-disable @typescript-eslint/ban-types */
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import QuizCard from "../_components/quiz-card";

type Props = {};

const  Dashboard = async (props: Props) => {
    const session = await getServerAuthSession();
    if (!session?.user) {
      redirect("/");
    }
    
    return (
        <main className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center">
          <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
            <span className="text-gray-500">Welcome back, {session?.user.name}</span>
        </div>
  
        <div className="grid gap-4 mt-4 md:grid-cols-2">
          <QuizCard />
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">

        </div>
      </main>
    )
}

export default Dashboard;