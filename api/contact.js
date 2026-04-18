// ============================================
// Kadir Yetim Portfolyo — Contact API Route
// Vercel Serverless Function
// Form → Gmail SMTP + Telegram Bot
// ============================================

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, message } = req.body;

  // Validasyon
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Geçerli bir e-posta adresi girin.' });
  }

  try {
    // ---- 1. Gmail SMTP ile E-posta Gönder ----
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolyo Bildirim" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `🔔 Portfolyo - Yeni Mesaj: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #1a1a2e; margin-bottom: 20px;">📬 Yeni Portfolyo Mesajı!</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666; width: 120px;"><strong>Ad Soyad</strong></td>
              <td style="padding: 10px 0; color: #222;">${firstName} ${lastName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;"><strong>E-posta</strong></td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;"><strong>Tarih</strong></td>
              <td style="padding: 10px 0; color: #222;">${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #fff; border-left: 4px solid #3b82f6; border-radius: 4px;">
            <strong style="color: #666;">Mesaj:</strong>
            <p style="margin-top: 8px; color: #222; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">Bu e-posta Kadir Yetim portfolyo sitesinden otomatik olarak gönderilmiştir.</p>
        </div>
      `,
    });

    // ---- 2. Telegram Bildirimi Gönder ----
    const firstSentence = message.split(/[.!?]/)[0].trim() || message.substring(0, 100);
    const telegramText =
      `🔔 <b>Yeni Portfolyo Mesajı!</b>\n\n` +
      `👤 <b>Gönderen:</b> ${firstName} ${lastName}\n` +
      `📧 <b>E-posta:</b> ${email}\n\n` +
      `💬 <b>Mesaj:</b> ${firstSentence}${message.length > firstSentence.length ? '...' : ''}`;

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramText,
          parse_mode: 'HTML',
        }),
      }
    );

    return res.status(200).json({ success: true, message: 'Mesajınız iletildi!' });

  } catch (err) {
    console.error('Contact API hatası:', err);
    return res.status(500).json({ error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.' });
  }
};
