import { NextResponse } from 'next/server';
import Brevo from '@getbrevo/brevo';

const apiKey = process.env.BREVO_API_KEY!;
const listId = parseInt(process.env.BREVO_LIST_ID || '', 10);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const brevo = new Brevo.ContactsApi();
  brevo.setApiKey(Brevo.ContactsApiApiKeys.apiKey, apiKey);

  try {
    await brevo.createContact({
      email,
      listIds: [listId],
    });

    return NextResponse.json({ message: 'Successfully subscribed' });
  } catch (error: any) {
    if (error.response?.body?.code === 'duplicate_parameter') {
      return NextResponse.json({ message: 'Already subscribed' });
    }

    return NextResponse.json(
      { error: 'Failed to subscribe', details: error.response?.body },
      { status: 500 }
    );
  }
}
