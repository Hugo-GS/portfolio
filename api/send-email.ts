import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const RESEND_API_KEY = process.env["RESEND_API_KEY"] ?? "";
const resend = new Resend(RESEND_API_KEY);
const EMAIL_FROM = process.env["EMAIL_FROM"] ?? "";
const EMAIL_TO = process.env["EMAIL_TO"] ?? "";
const URL_DOMAIN = process.env["URL_DOMAIN"] ?? "";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getEmailTemplate(name: string, email: string, message: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Contacto</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 500px;
      margin: 40px auto;
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    h1 {
      font-size: 18px;
      font-weight: 600;
      border-bottom: 2px solid #333;
      padding-bottom: 10px;
      margin-bottom: 24px;
    }
    .field {
      margin-bottom: 16px;
    }
    .label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .message {
      background: #f5f5f5;
      padding: 16px;
      margin-top: 20px;
      border-radius: 4px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    a {
      color: #333;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .reply {
      display: inline-block;
      margin-top: 24px;
      padding: 10px 20px;
      background: #333;
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      border-radius: 4px;
    }
    .reply:hover {
      background: #555;
      text-decoration: none;
    }
    footer {
      margin-top: 40px;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <h1>Nuevo Contacto Web</h1>

  <div class="field">
    <div class="label">Nombre</div>
    <div>${name}</div>
  </div>

  <div class="field">
    <div class="label">Email</div>
    <a href="mailto:${email}">${email}</a>
  </div>

  <div class="message">
    <div class="label">Mensaje</div>
    <p>${message}</p>
  </div>

  <a href="mailto:${email}?subject=Re: Contacto web" class="reply">Responder</a>

  <footer>${URL_DOMAIN}</footer>
</body>
</html>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env["RESEND_API_KEY"] || !EMAIL_FROM || !EMAIL_TO) {
      console.error("Missing environment variables");
      return res.status(500).json({
        error: "Configuración del servidor incompleta"
      });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Faltan campos requeridos",
        details: {
          name: !name ? "El nombre es requerido" : null,
          email: !email ? "El email es requerido" : null,
          message: !message ? "El mensaje es requerido" : null,
        }
      });
    }

    if (typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        error: "El nombre debe tener al menos 2 caracteres"
      });
    }

    if (typeof email !== "string" || !isValidEmail(email)) {
      return res.status(400).json({
        error: "El email no es válido"
      });
    }

    if (typeof message !== "string" || message.trim().length < 10) {
      return res.status(400).json({
        error: "El mensaje debe tener al menos 10 caracteres"
      });
    }

    const sanitizedName = name.trim().substring(0, 100);
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim().substring(0, 5000);

    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${EMAIL_FROM}>`,
      to: [EMAIL_TO],
      subject: `Nuevo mensaje de ${sanitizedName} - Portfolio`,
      html: getEmailTemplate(sanitizedName, sanitizedEmail, sanitizedMessage),
      replyTo: sanitizedEmail,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(400).json({
        error: "Error al enviar el email",
        details: error
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email enviado correctamente",
      data
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}
