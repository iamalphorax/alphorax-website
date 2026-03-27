import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message, services } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const htmlContent = `
      <h3>New Contact Form Submission from Alphorax Website</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/> ${message.replace(/\n/g, "<br/>")}</p>
      <p><strong>Services:</strong> ${services?.join(", ") || "N/A"}</p>
    `;

    const brevoApiKey = process.env.BREVO_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "info@alphorax.com";

    if (!brevoApiKey) {
      console.error("Missing BREVO_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: name || "Website Visitor",
          email: recipientEmail, // Usually it's safer to use the recipient email as sender if it's the only verified domain in Brevo
        },
        replyTo: {
          name: name || "Website Visitor",
          email: email,
        },
        to: [
          {
            email: recipientEmail,
            name: "Alphorax Contact Team",
          },
        ],
        subject: `Contact Form: ${subject}`,
        htmlContent: htmlContent,
      }),
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Brevo API Error:", response.status, responseData);
      return NextResponse.json(
        { error: "Failed to send email", details: responseData },
        { status: response.status }
      );
    }

    console.log("Brevo API Success:", responseData);
    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Error sending contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
