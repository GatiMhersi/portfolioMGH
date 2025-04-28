// /app/(sitio)/layout.tsx
import Navbar from "@/components/Navbar";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

export default function SitioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <PageTransitionWrapper>
        {children}
      </PageTransitionWrapper>
    </>
  );
}
