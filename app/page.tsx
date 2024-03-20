import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import AddNewWrapButton from "@/components/AddNewWrapButton";
import Title from "@/components/Title";
import Wrapped from "@/components/Wrapped";

async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) return <Link href="/sign-in">Sign in</Link>;

  return (
    <section className="flex flex-col h-80">
      <div className="flex justify-between items-center gap-4 p-4">
        <span>{session.user.username}</span>
        <Title>WRAPPPED</Title>
        <AddNewWrapButton />
      </div>

      <Wrapped />
    </section>
  );
}

export default Home;
