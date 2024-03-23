import AddNewWrapButton from "@/components/AddNewWrapButton";
import Title from "@/components/Title";
import Wrapped from "@/components/Wrapped";

function Home() {
  return (
    <section className="flex flex-col h-80">
      <div className="flex justify-between items-center p-4">
        <Title className="md:hidden">WRAPPPED</Title>

        <AddNewWrapButton />
      </div>

      <Wrapped />
    </section>
  );
}

export default Home;
