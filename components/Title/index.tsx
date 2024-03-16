import { cn } from "@/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => (
  <h1
    className={cn(
      "uppercase leading-none gradient-primary font-bold text-3xl md:text-6xl first:text-accent",
      className
    )}
  >
    {children}
  </h1>
);

export default Title;
