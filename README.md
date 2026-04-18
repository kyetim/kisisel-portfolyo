# Kadir Yetim — Kişisel Portfolyo Sitesi

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**🌐 Canlı Site / Live Demo:** [kisisel-portfolyo.vercel.app](https://kisisel-portfolyo.vercel.app)

</div>

---

## 🇹🇷 Türkçe

### 📌 Proje Hakkında

Fullstack Web Geliştirici & Yapay Zeka Sistemleri Uzman Adayı kimliğiyle hazırladığım kişisel portfolyo ve CV web sitesidir. Site; becerilerimi, projelerimi ve deneyimlerimi sergilerken, iletişim formu aracılığıyla gelen mesajları **otomatik bildirim sistemi** ile anlık olarak takip etmemi sağlar.

### ✨ Özellikler

- **Tek Sayfa Uygulama** — Smooth scroll navigasyon ile Hero, Hakkımda, Projeler, Beceriler, Eğitim ve İletişim bölümleri
- **Dark Tema** — Modern, profesyonel koyu renk tasarımı
- **Tam Responsive** — Mobil, tablet ve masaüstü uyumlu
- **Animasyonlar** — Scroll reveal efektleri ve animasyonlu skill bar'ları
- **İletişim Formu** — Gerçek zamanlı validasyon ve otomatik bildirim sistemi
- **Otomasyon** — Form gönderimi → E-posta + Telegram anlık bildirim

### 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Hosting** | Vercel (Serverless) |
| **API / Backend** | Vercel Serverless Functions (Node.js) |
| **E-posta** | Nodemailer + Gmail SMTP |
| **Bildirim** | Telegram Bot API |
| **Otomasyon (Demo)** | n8n Workflow (Webhook → SMTP → Telegram) |
| **Versiyon Kontrol** | Git & GitHub |

### 📁 Proje Yapısı

```
kisisel-portfolyo/
├── index.html          # Ana sayfa (tüm bölümler)
├── css/
│   └── style.css       # Stil dosyası (CSS variables, responsive)
├── js/
│   └── main.js         # JavaScript (animasyonlar, form gönderimi)
├── api/
│   └── contact.js      # Vercel Serverless API (e-posta + Telegram)
├── package.json        # Node.js bağımlılıkları
├── vercel.json         # Vercel yapılandırması
└── .env.example        # Ortam değişkenleri şablonu
```

### ⚙️ Kurulum ve Çalıştırma

#### Gereksinimler
- Node.js 18+
- Gmail hesabı + App Password
- Telegram Bot Token

#### 1. Repoyu klonla
```bash
git clone https://github.com/kyetim/kisisel-portfolyo.git
cd kisisel-portfolyo
```

#### 2. Bağımlılıkları yükle
```bash
npm install
```

#### 3. Ortam değişkenlerini ayarla
`.env.example` dosyasını `.env` olarak kopyala ve doldur:
```env
GMAIL_USER=senin@gmail.com
GMAIL_APP_PASSWORD=xxxx_xxxx_xxxx_xxxx
TELEGRAM_BOT_TOKEN=123456789:AAFxxxxxxxx
TELEGRAM_CHAT_ID=123456789
```

#### 4. Local sunucu başlat
```bash
# Python ile (önerilen)
python -m http.server 3000
```

### 🤖 n8n Otomasyon Workflow'u

Proje, iletişim formundan gelen verileri işlemek için **n8n** tabanlı bir otomasyon workflow'u içermektedir:

```
[İletişim Formu]
      │
      ▼
[n8n Webhook Node]  ──→  POST /webhook/portfolyo-iletisim
      │
      ├──▶ [Send Email Node]    ──→  Gmail SMTP ile bildirim maili
      │
      └──▶ [Telegram Node]      ──→  Anlık Telegram mesajı
```

**Workflow Özellikleri:**
- Webhook trigger ile form verisi alımı
- HTML formatlı e-posta bildirimi
- Telegram bot üzerinden anlık bildirim
- Ad, Soyad, E-posta, Mesaj ve Zaman damgası içerir

### 🚀 Vercel'e Deploy

1. [vercel.com](https://vercel.com) üzerinde GitHub reposunu import et
2. Environment Variables bölümüne `.env.example`'daki değişkenleri ekle
3. Deploy et — otomatik HTTPS ve CDN ile yayına girer

---

## 🇬🇧 English

### 📌 About The Project

This is a personal portfolio and CV website built to showcase my skills, projects, and experience as a Fullstack Web Developer & AI Systems Specialist Candidate. The contact form is integrated with an **automated notification system** that delivers instant alerts via email and Telegram whenever a message is received.

### ✨ Features

- **Single Page Application** — Smooth scroll navigation across Hero, About, Projects, Skills, Education, and Contact sections
- **Dark Theme** — Modern, professional dark color scheme
- **Fully Responsive** — Mobile, tablet, and desktop compatible
- **Animations** — Scroll reveal effects and animated skill bars
- **Contact Form** — Real-time validation with automated notification pipeline
- **Automation** — Form submission → Instant Email + Telegram notification

### 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Hosting** | Vercel (Serverless) |
| **API / Backend** | Vercel Serverless Functions (Node.js) |
| **Email** | Nodemailer + Gmail SMTP |
| **Notification** | Telegram Bot API |
| **Automation (Demo)** | n8n Workflow (Webhook → SMTP → Telegram) |
| **Version Control** | Git & GitHub |

### 📁 Project Structure

```
kisisel-portfolyo/
├── index.html          # Main page (all sections)
├── css/
│   └── style.css       # Styles (CSS variables, responsive design)
├── js/
│   └── main.js         # JavaScript (animations, form submission)
├── api/
│   └── contact.js      # Vercel Serverless API (email + Telegram)
├── package.json        # Node.js dependencies
├── vercel.json         # Vercel configuration
└── .env.example        # Environment variables template
```

### ⚙️ Local Setup

#### Prerequisites
- Node.js 18+
- Gmail account + App Password
- Telegram Bot Token

#### 1. Clone the repository
```bash
git clone https://github.com/kyetim/kisisel-portfolyo.git
cd kisisel-portfolyo
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Set up environment variables
Copy `.env.example` to `.env` and fill in the values:
```env
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=xxxx_xxxx_xxxx_xxxx
TELEGRAM_BOT_TOKEN=123456789:AAFxxxxxxxx
TELEGRAM_CHAT_ID=123456789
```

### 🤖 n8n Automation Workflow

The project includes an **n8n**-based automation workflow for processing contact form submissions:

```
[Contact Form]
      │
      ▼
[n8n Webhook Node]  ──→  POST /webhook/portfolyo-iletisim
      │
      ├──▶ [Send Email Node]    ──→  Email notification via Gmail SMTP
      │
      └──▶ [Telegram Node]      ──→  Instant Telegram message
```

### 🚀 Deploy to Vercel

1. Import the GitHub repo at [vercel.com](https://vercel.com)
2. Add environment variables from `.env.example` in the Vercel dashboard
3. Deploy — automatic HTTPS and CDN included

---

## 📬 Contact

**Kadir Yetim**
- 🌐 Portfolio: [kisisel-portfolyo.vercel.app](https://kisisel-portfolyo.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/kadir-yetim](https://linkedin.com/in/kadir-yetim)
- 🐙 GitHub: [github.com/kyetim](https://github.com/kyetim)
- 📧 Email: mr.kyetim12@gmail.com

---

<div align="center">
  <sub>Built with ❤️ by Kadir Yetim</sub>
</div>
