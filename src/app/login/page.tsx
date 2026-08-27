import LoginPage from "./login-page";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  return <LoginPage redirect={params.redirect} />;
}
