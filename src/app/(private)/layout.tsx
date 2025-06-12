import { AppSidebar } from '@/components/commom/app-sidebar';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}