import type { NextApiRequest, NextApiResponse } from 'next';
import SibApiV3Sdk from 'sib-api-v3-sdk';

const apiKey = process.env.BREVO_API_KEY as string;
const listId = parseInt(process.env.BREVO_LIST_ID || '', 10);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
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
    res.status(200).json({ message: 'Successfully subscribed' });
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
        return res.status(200).json({ message: 'Already subscribed' });
      }
  
      return res.status(500).json({
        error: 'Failed to subscribe',
        details: response.body,
      });
    }
  
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
}
