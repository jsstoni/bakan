import { UpdatePassword } from '@/app/dashboard/_components/update-password';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Profile() {
  return (
    <section className="container mx-auto py-5">
      <Tabs defaultValue="account">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl">Profile</h1>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">
          <UpdatePassword />
        </TabsContent>
      </Tabs>
    </section>
  );
}
