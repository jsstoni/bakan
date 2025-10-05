export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted">
      {children}
    </main>
  );
}
