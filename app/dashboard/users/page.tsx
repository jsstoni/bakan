import { getUsers } from '@/app/dashboard/users/query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { BanIcon, CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function Users({
  searchParams,
}: PageProps<'/dashboard/users'>) {
  const pageNumber = Number((await searchParams).page) || 1;
  const allUsers = await getUsers(pageNumber).catch(() => notFound());
  if (!allUsers) notFound();
  const totalPages = Math.ceil(allUsers.total / 10);

  return (
    <section className="container mx-auto space-y-1.5 py-5">
      {allUsers?.users.map((user) => (
        <Item variant="outline" key={user.id}>
          <ItemContent>
            <ItemTitle>{user.name}</ItemTitle>
            <ItemDescription className="flex items-center gap-2">
              {user.email}
              {user.emailVerified ? (
                <CheckCircle2Icon stroke="green" size={14} />
              ) : (
                <XCircleIcon size={14} />
              )}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge>{user.role}</Badge>
            <Button variant="destructive">
              <BanIcon /> Banear
            </Button>
          </ItemActions>
        </Item>
      ))}

      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <noindex>
            <PaginationItem key={i}>
              <PaginationLink href={`?page=${i + 1}`}>{i + 1}</PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </section>
  );
}
