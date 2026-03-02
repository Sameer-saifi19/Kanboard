import WelcomeEmail from "@/emails/welcome-email";
import transporter from "@/lib/nodemailer";
import { render } from "@react-email/render";

export const sendMail = async (to: string, subject: string) => {
  const emailHtml = await render(WelcomeEmail());

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `ProdSaas - ${subject}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Sendmail error");
    return { success: false };
  }
};
