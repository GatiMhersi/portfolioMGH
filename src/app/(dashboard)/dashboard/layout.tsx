import AdminNavbar from "@/components/adminComponents/AdminNavbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar fijo, por ejemplo de 250px */}
      <div className="w-64 shrink-0">
        <AdminNavbar />
      </div>

      {/* Área principal, ocupa el resto */}
      <main className="flex-1 overflow-auto bg-gray-100 text-gray-900">
        {children}
      </main>
    </div>
  );
}
