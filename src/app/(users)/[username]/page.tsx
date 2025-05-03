



export default async function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;

  return (
    <div>
      {username}
    </div>
  );
}
