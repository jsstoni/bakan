import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="202"
      height="205"
      viewBox="0 0 202 205"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="40" style={{ fill: 'hsl(var(--foreground))' }} />
      <rect
        x="45"
        width="120"
        height="40"
        style={{ fill: 'hsl(var(--foreground))' }}
      />
      <rect
        x="122"
        y="37"
        width="43"
        height="83"
        style={{ fill: 'hsl(var(--foreground))' }}
      />
      <rect
        x="162"
        y="80"
        width="40"
        height="82.5"
        style={{ fill: 'hsl(var(--foreground))' }}
      />
      <rect
        y="80"
        width="125"
        height="40"
        style={{ fill: 'hsl(var(--foreground))' }}
      />
      <rect
        x="40"
        y="164.5"
        width="122"
        height="40"
        style={{ fill: 'hsl(var(--foreground))' }}
      />
      <rect
        y="45"
        width="40"
        height="118"
        style={{ fill: 'hsl(var(--foreground))' }}
      />
    </svg>
  );
}
