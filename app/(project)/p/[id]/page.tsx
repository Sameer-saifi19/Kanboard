import KanbanBoard from "@/components/global/kanban/board";
import { getColumnByProjectSlug } from "@/server/column";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const { data } = await getColumnByProjectSlug(id);

  return (
    <>
      <KanbanBoard columns={data ?? []} />
    </>
  );
}
