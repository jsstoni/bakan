import { UpdatePassword } from '@/app/dashboard/_components/update-password';

export default function Profile() {
  return (
    <section className="container mx-auto">
      <h1 className="py-5 font-bold text-3xl">Profile</h1>

      <UpdatePassword />
    </section>
  );
}
