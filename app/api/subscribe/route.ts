import { NextResponse } from 'next/server';
import Brevo from '@getbrevo/brevo';

const apiKey = process.env.BREVO_API_KEY!;
const listId = parseInt(process.env.BREVO_LIST_ID || '', 10);

interface BrevoError {
  response?: {
    body?: {
      code?: string;
      message?: string;
    };
  };
}

interface SubscribeRequestBody {
  email: string;
}

export async function POST(request: Request) {
  let body: SubscribeRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { email } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const contactsApi = new Brevo.ContactsApi();
  contactsApi.setApiKey(Brevo.ContactsApiApiKeys.apiKey, apiKey);

  try {
    await contactsApi.createContact({ email, listIds: [listId] });
    return NextResponse.json({ message: 'Successfully subscribed' });
  } catch (error: unknown) {
    const brevoError = error as BrevoError;

    if (brevoError.response?.body?.code === 'duplicate_parameter') {
      return NextResponse.json({ message: 'Already subscribed' });
    }

    return NextResponse.json(
      {
        error: 'Failed to subscribe',
        details: brevoError.response?.body ?? 'Unknown error',
      },
      { status: 500 }
    );
  }
}
