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
    const contactEmail = process.env.CONTACT_EMAIL || "iamdavidabayomi@gmail.com";
    const senderEmail = process.env.SENDER_EMAIL || contactEmail;
    const listId = parseInt(process.env.BREVO_LIST_ID || "3");

    if (!brevoApiKey) {
      console.error("Missing BREVO_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 1. Create/Update Contact in Brevo
    try {
      // Basic sanitization for Brevo's SMS attribute (needs E.164)
      let sanitizedPhone = phone ? phone.replace(/[^0-9+]/g, "") : "";
      
      // If it looks like a potential phone number without a '+', try to add one 
      // if it has 10+ digits, but this is a rough guess.
      // Better to satisfy the SMS format if possible, otherwise we skip it to ensure contact creation.
      if (sanitizedPhone && !sanitizedPhone.startsWith("+") && sanitizedPhone.length >= 10) {
        // Many systems reject without +, but Brevo requires it for SMS
        // We'll try to prepend it if it's missing.
        sanitizedPhone = "+" + sanitizedPhone;
      }

      const attributes: Record<string, string> = {
        FIRSTNAME: name.split(" ")[0] || "",
        LASTNAME: name.split(" ").slice(1).join(" ") || name,
        COMPANY: company || "",
      };

      // Brevo's SMS attribute MUST be in E.164 format (e.g., +1234567890)
      if (sanitizedPhone && /^\+\d{10,15}$/.test(sanitizedPhone)) {
        attributes.SMS = sanitizedPhone;
      }

      const contactResponse = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify({
          email: email,
          attributes: attributes,
          listIds: [listId],
          updateEnabled: true,
        }),
      });

      if (!contactResponse.ok) {
        const contactError = await contactResponse.json();
        console.warn("Brevo Contact API Warning:", contactError);
        
        // If the error was specifically about the phone number, retry without it
        if (contactError.code === "invalid_parameter" && contactError.message.toLowerCase().includes("phone")) {
          console.log("Retrying Brevo contact creation without PHONE attribute...");
          delete attributes.SMS;
          await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "api-key": brevoApiKey,
            },
            body: JSON.stringify({
              email: email,
              attributes: attributes,
              listIds: [listId],
              updateEnabled: true,
            }),
          });
        }
      }
    } catch (err) {
      console.error("Error creating Brevo contact:", err);
    }

    // 2. Send Transactional Email
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
          email: senderEmail,
        },
        replyTo: {
          name: name || "Website Visitor",
          email: email,
        },
        to: [
          {
            email: contactEmail,
            name: "Alphorax Contact Team",
          },
        ],
        subject: `Contact Form: ${subject}`,
        htmlContent: htmlContent,
      }),
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Brevo Email API Error:", response.status, responseData);
      return NextResponse.json(
        { error: "Failed to send email", details: responseData },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Error sending contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
