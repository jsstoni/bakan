import { GithubLink } from '@/components/github-link';
import { Logo } from '@/components/logo';
import { Navigation } from '@/components/nav';
import { ToggleTheme } from '@/components/toggle-theme';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed top-0 w-full border-b shadow-xs backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="size-6 fill-black dark:fill-white" />
            <span className="font-semibold text-lg">Bakan</span>
          </div>

          <div className="flex items-center gap-2">
            <Navigation />
            <GithubLink />
            <ToggleTheme />
          </div>
        </div>
      </header>

      {children}
    </>
  );
}
