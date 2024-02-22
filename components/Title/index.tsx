const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    className="relative font-black p-6"
    style={{
      background: "linear-gradient(180deg, #fff, #adadad)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: "max(48px,min(5vw,76px))",
    }}
  >
    {children}
  </h1>
);

export default Title;
