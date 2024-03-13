import { cn } from "@/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => (
  <h1
    className={cn(
      "gradient-primary relative right-2 font-bold first:text-accent text-3xl lg:text-6xl",
      className
    )}
  >
    {children}
  </h1>
);

export default Title;
