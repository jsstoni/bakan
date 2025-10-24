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
import { BanIcon, CheckCircle2Icon, XCircleIcon } from 'lucide-react';

export default async function Users(props: PageProps<'/dashboard/users'>) {
  const { page } = await props.searchParams;
  const pageNumber = Number(page) || 1;
  const allUsers = await getUsers(pageNumber);

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
    </section>
  );
}
