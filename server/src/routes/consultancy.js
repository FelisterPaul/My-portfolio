import express from 'express';
import nodemailer from 'nodemailer';
import { config } from '../config.js';

const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    });

    await transporter.sendMail({
      from: email,
      to: config.emailUser,
      subject: `New message from ${name}`,
      text: message,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
