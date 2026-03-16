import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

function Grid({ children, className, ...props }: Props) {
  return (
    <div
      className={cn("grid gap-6 md:grid-cols-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Grid;