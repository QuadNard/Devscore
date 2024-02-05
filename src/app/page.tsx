import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignInButton from "./_components/sign-in-button";


export default async function Home() {
  const session = await  getServerAuthSession();
  if(session?.user) {
    redirect('/dashboard')
  }


  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Welcome to Devscoreboard 🔥!</CardTitle>
          <CardDescription>
              Quiz Game for Developers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign In with Google" />
        </CardContent>
      </Card>
    </div>
  );
}


