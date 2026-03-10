export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return (
    <>
      <h1>{slug}</h1>
    </>
  );
}
