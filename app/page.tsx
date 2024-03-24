import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import AddNewWrapButton from "@/components/AddNewWrapButton";
import Title from "@/components/Title";
import Wrapped from "@/components/Wrapped";

async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex flex-col h-80">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-white text-3xl">
          Welcome, <b>{session?.user.username}</b>
        </h1>
        <Title className="md:hidden">WRAPPPED</Title>

        <AddNewWrapButton />
      </div>

      <Wrapped />
    </section>
  );
}

export default Home;
