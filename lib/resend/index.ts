'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (subject: string, to: string[] | string) => {
  const { data } = await resend.emails.send({
    from: '',
    to: to,
    subject: subject,
    html: '',
  });

  console.log(data);
};
