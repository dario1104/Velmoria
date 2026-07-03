import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;
let smtpConfigured = false;

async function getTransporter(): Promise<nodemailer.Transporter | null> {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    smtpConfigured = false;
    return null;
  }
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  smtpConfigured = true;
  return transporter;
}

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const t = await getTransporter();
  if (!t) {
    console.log(`[EMAIL] Would send to ${to}: ${subject}\n${html}`);
    return;
  }
  await t.sendMail({
    from: process.env.EMAIL_FROM || 'noreply@velmoria.app',
    to,
    subject,
    html,
  });
}

export async function sendCodiceVerifica(email: string, codice: string): Promise<void> {
  const subject = 'Velmoria — Codice di verifica';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #7c4dff; font-size: 28px; margin: 0;">Velmoria</h1>
        <p style="color: #64748b; font-size: 15px; margin: 4px 0 0;">Il tuo compagno di viaggio</p>
      </div>
      <h2 style="color: #0f172a; font-size: 20px; text-align: center; margin: 0 0 8px;">Codice di verifica</h2>
      <p style="color: #475569; font-size: 14px; line-height: 1.6; text-align: center; margin: 0 0 24px;">
        Utilizza il codice seguente per accedere al tuo account.<br>
        Il codice scade tra <strong>15 minuti</strong>.
      </p>
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="display: inline-block; font-size: 36px; font-weight: 800; letter-spacing: 8px;
              color: #7c4dff; background: #f0edff; padding: 16px 32px; border-radius: 12px; font-family: monospace;">
          ${codice}
        </span>
      </div>
      <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">
        Se non hai richiesto tu questo codice ignora questa email.
      </p>
    </div>
  `;
  await sendEmail(email, subject, html);
}

export async function sendNotificaEmail(email: string, titolo: string, messaggio: string): Promise<void> {
  const subject = `Velmoria — ${titolo}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #7c4dff; font-size: 28px; margin: 0;">Velmoria</h1>
        <p style="color: #64748b; font-size: 15px; margin: 4px 0 0;">Il tuo compagno di viaggio</p>
      </div>
      <h2 style="color: #0f172a; font-size: 18px; text-align: center; margin: 0 0 8px;">${titolo}</h2>
      <p style="color: #475569; font-size: 14px; line-height: 1.6; text-align: center; margin: 0 0 24px;">${messaggio}</p>
      <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">
        Puoi gestire le notifiche dalle impostazioni del tuo profilo.
      </p>
    </div>
  `;
  await sendEmail(email, subject, html);
}
