import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

function Stack({ children, className, ...props }: Props) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}

export default Stack;