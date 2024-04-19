function EditWrapPage({
  searchParams,
}: {
  searchParams: { search?: string; year?: string };
}) {
  const { search, year } = searchParams;

  return (
    <div>
      EditWrapPage
      <h1>{year}</h1>
    </div>
  );
}

export default EditWrapPage;
