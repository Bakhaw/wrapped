import AddNewWrapButton from "@/components/AddNewWrapButton";
import Title from "@/components/Title";
import Wrapped from "@/components/Wrapped";

function Home() {
  return (
    <section className="flex flex-col h-80">
      <div className="flex items-center justify-end md:justify-between px-2 py-4">
        <Title className="hidden md:block">WRAPPPED</Title>

        <div>
          <AddNewWrapButton />
        </div>
      </div>

      <Wrapped />
    </section>
  );
}

export default Home;
