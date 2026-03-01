import { sendEmail } from './send-email';

export function sendResetPasswordEmail({ user, url }: { user: { email: string, name: string }, url: string }) {
  sendEmail({
    to: user.email,
    subject: 'Reset your password',
    html: `
    <h2>Reset your password</h2>
    <p>Hi ${user.name},</p>
    <p>Click the link below to reset your password:</p>
    <a href="${url}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
      Reset Password
    </a>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `})
}
