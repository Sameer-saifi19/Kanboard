import { cn } from '@/lib/utils'

type Props = React.HTMLAttributes<HTMLDivElement>;

function Section({ className, children, ...props }: Props) {
  return (
    <div
      className={cn("py-12 sm:py-16 md:py-20 lg:py-24", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Section;