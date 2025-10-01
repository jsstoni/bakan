import { TopBar } from "@/app/dashboard/_components/top-bar";
import { requireUser } from "@/utils/require-user";

export default async function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  await requireUser();

  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
