import { requireUser } from "@/utils/require-user";

export default async function Dashboard() {
  await requireUser();

  return <p>Dashboard</p>;
}
