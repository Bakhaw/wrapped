import { cn } from "@/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => (
  <h1
    className={cn(
      "uppercase text-primary font-bold text-3xl md:text-6xl",
      className
    )}
  >
    {children}
  </h1>
);

export default Title;
