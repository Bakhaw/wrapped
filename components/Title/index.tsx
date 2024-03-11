import { cn } from "@/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => (
  <h1
    className={cn("font-black text-amber-950 text-4xl lg:text-6xl", className)}
  >
    {children}
  </h1>
);

export default Title;
