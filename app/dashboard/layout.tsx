import { TopBar } from '@/app/dashboard/_components/top-bar';

export default function Layout({ children }: LayoutProps<'/dashboard'>) {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
