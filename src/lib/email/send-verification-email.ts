import { sendEmail } from './send-email';

export function sendVerificationEmail({ user, url }: { user: { email: string, name: string }, url: string }) {
  sendEmail({
    to: user.email,
    subject: 'Email Verification',
    html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Verify your email</h2>
    <p>Hi ${user.name},</p>
    <p>Please click the link below to verify your email address:</p>
    <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
    <p>Or copy and paste this link in your browser:</p>
    <p><code>${url}</code></p>
    <p>This link expires in 24 hours.</p>
    <p>If you didn't request this, you can safely ignore this email.</p>
  </div>
  `})
}
