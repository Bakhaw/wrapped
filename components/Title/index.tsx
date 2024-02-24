import { cn } from "@/lib/utils/utils";

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
      fontSize: "max(48px,min(5vw,76px))",
    }}
    className={cn("relative font-black", className)}
  >
    {children}
  </h1>
);

export default Title;
