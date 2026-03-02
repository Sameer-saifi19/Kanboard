import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

type LoaderProps = {
    text: string
}

export default function Loader({text}: LoaderProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="ghost" disabled size="sm">
        <Spinner data-icon="inline-start" />
        {text}
      </Button>
    </div>
  )
}
