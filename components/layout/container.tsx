import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

function Container({ children, className, ...props }: Props) {
  return (
    <div
      className={cn(
        "container mx-auto px-6 sm:px-10 md:px-12 lg:px-36",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;