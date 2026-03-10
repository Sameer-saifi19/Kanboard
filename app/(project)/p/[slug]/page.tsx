import KanbanBoard from "@/components/global/kanban/board";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Kanban Board
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Drag and drop tasks between columns
          </p>
        </div>

        {/* Board — scrolls horizontally if columns overflow */}
        <KanbanBoard />

      </div>
    </main>
  );
}