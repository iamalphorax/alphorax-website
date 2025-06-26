// app/api/subscribe/route.ts

import { NextResponse } from 'next/server';
import SibApiV3Sdk from 'sib-api-v3-sdk';

const apiKey = process.env.BREVO_API_KEY as string;
const listId = parseInt(process.env.BREVO_LIST_ID || '', 10);

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKeyInstance = defaultClient.authentications['api-key'];
  apiKeyInstance.apiKey = apiKey;

  const contactsApi = new SibApiV3Sdk.ContactsApi();

  const createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  if (listId) createContact.listIds = [listId];

  try {
    await contactsApi.createContact(createContact);
    return NextResponse.json({ message: 'Successfully subscribed' });
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as { response: unknown }).response === 'object'
    ) {
      const response = (error as {
        response: { body?: { code?: string; message?: string } };
      }).response;

      if (response.body?.code === 'duplicate_parameter') {
        return NextResponse.json({ message: 'Already subscribed' });
      }

      return NextResponse.json({
        error: 'Failed to subscribe',
        details: response.body,
      }, { status: 500 });
    }

    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}