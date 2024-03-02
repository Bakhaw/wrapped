import { cn } from "@/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => (
  <h1
    style={{
      background: "linear-gradient(180deg, #fff, #adadad)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
    className={cn("relative font-black text-4xl lg:text-6xl", className)}
  >
    {children}
  </h1>
);

export default Title;
