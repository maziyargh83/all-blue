export function DashboardMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mx-auto w-full p-4">{children}</main>;
}
