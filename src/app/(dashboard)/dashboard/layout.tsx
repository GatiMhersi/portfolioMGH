import AdminNavbar from "@/components/adminComponents/AdminNavbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <AdminNavbar />
      <main className="flex-1 p-6 bg-gray-100 text-gray-900">
        {children}
      </main>
    </div>
  );
}
