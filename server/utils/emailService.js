const sendEmail = async ({ to, subject, html }) => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "noreply@brightfutureschool.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Bright Future School";

  console.log(`\n--- [OUTGOING EMAIL] ---`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  
  // Extract link if any for quick console copying
  const linkMatch = html.match(/href="([^"]+)"/);
  if (linkMatch && linkMatch[1]) {
    console.log(`Action Link: ${linkMatch[1]}`);
  }
  console.log(`------------------------\n`);

  if (!apiKey) {
    console.log("Brevo API Key not configured. Email logged to console.");
    return { success: true, message: "Logged to console" };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Brevo Email Sending Failed:", data);
      return { success: false, error: data };
    }

    console.log("Email sent successfully via Brevo. Message ID:", data.messageId);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error("Error sending email via Brevo:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
