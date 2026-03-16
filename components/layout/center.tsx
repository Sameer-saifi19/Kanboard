import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

function Center({ children, className, ...props }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Center;