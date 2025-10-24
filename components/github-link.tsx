'use client';

import { GitHub } from '@/components/icons/github-icon';
import { Button } from '@/components/ui/button';
import { env } from '@/lib/env/client';
import { useEffect, useState } from 'react';

export function GithubLink() {
  const [stars, setStars] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(env.NEXT_PUBLIC_REPO_URL);
        const result = (await res.json()) as { repo: { stars: number } };
        console.log(result);
        setStars(result.repo.stars);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Button size="sm" asChild>
      <a
        href="https://github.com/jsstoni/bakan"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="sr-only">Github</span>
        <GitHub className="fill-white dark:fill-black" />
        {stars}
      </a>
    </Button>
  );
}
