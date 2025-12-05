import express from "express";
import fs from "node:fs/promises";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { IncomingForm } from "formidable";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use("/app_images", express.static("app_images"));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/users_images", express.static(path.join(__dirname, "users_images")));

dotenv.config({ path: path.join(__dirname, ".env") });

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

const JWT_SECRET = process.env.JWT_SECRET || "my-secret-key-for-development";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен відсутній" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Токен недійсний або прострочений" });
    }
    req.user = decoded;
    next();
  });
};


app.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Усі поля обов'язкові" });
    }

    const fileContent = await fs.readFile("./data/users.json");
    const users = JSON.parse(fileContent);

    if (users.find((u) => u.email === email)) {
      return res
        .status(409)
        .json({ message: "Користувач з таким email вже існує" });
    }

    const newUser = {
      id: Date.now().toString(),
      userName,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      message: "Користувач успішно зареєстрований",
      token,
      user: {
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email та пароль обов'язкові" });
    }

    const fileContent = await fs.readFile("./data/users.json");
    const users = JSON.parse(fileContent);

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Користувача не знайдено" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Невірний email або пароль" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: "Успішний вхід",
      token,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

app.get("/auth", authenticateToken, async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/users.json");
    const users = JSON.parse(fileContent);

    const user = users.find((u) => u.id === req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    res.json({
      id: user.id,
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

app.get("/images", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/app_images.json");

    const appImagesData = JSON.parse(fileContent);

    res.status(200).json({ images: appImagesData });
  } catch (error) {
    console.error("Images error:", error);
    res.status(500).json({ message: "Не вдалося завантажити картинки" });
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-booking", (req, res) => {
  const form = new IncomingForm({
    uploadDir: path.join(__dirname, "tmp"),
    keepExtensions: true,
    multiples: true,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Помилка парсингу форми:", err);
      return res.status(500).json({ error: "Помилка обробки форми" });
    }

    try {
      console.log("Отримані поля:", Object.keys(fields));
      console.log("Отримані файли:", Object.keys(files));
      console.log("Вміст files:", files);

      if (files.files) {
        const fileList = Array.isArray(files.files)
          ? files.files
          : [files.files];
        console.log(`Деталі ${fileList.length} файлів:`);
        fileList.forEach((file, index) => {
          console.log(`Файл ${index + 1}:`, {
            originalName: file.originalFilename,
            tempName: file.newFilename,
            filepath: file.filepath,
            size: file.size,
            mimetype: file.mimetype,
          });
        });
      }

      const name = fields.name?.[0] || "";
      const email = fields.email?.[0] || "";
      const phone = fields.phone?.[0] || "";
      const instagram = fields.instagram?.[0] || "";
      const people = fields.people?.[0] || "";
      const location = fields.location?.[0] || "";
      const wishes = fields.wishes?.[0] || "";

      const attachments = [];

      if (files.files) {
        const fileList = Array.isArray(files.files)
          ? files.files
          : [files.files];

        fileList.forEach((file, index) => {
          const filename = file.originalFilename || `file_${index + 1}.jpg`;

          console.log(`Файл ${index + 1}: ${filename} -> ${file.filepath}`);

          attachments.push({
            filename: filename,
            path: file.filepath,
            contentType: file.mimetype || "image/jpeg",
          });
        });
      }

      console.log(`Всього вкладень: ${attachments.length}`);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: "Нове бронювання зйомки",
        html: `
          <h2>Нова заявка на бронювання</h2>
          <p><strong>Імʼя:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Instagram:</strong> ${instagram}</p>
          <p><strong>Кількість людей:</strong> ${people}</p>
          <p><strong>Локація:</strong> ${location}</p>
          <p><strong>Побажання:</strong> ${wishes || "Не вказано"}</p>
          ${attachments.length > 0 ? `<p><strong>Прикріплено файлів:</strong> ${attachments.length}</p>` : "<p><strong>Файлів не прикріплено</strong></p>"}
        `,
        attachments: attachments,
      };

      console.log("Відправляємо email...");
      await transporter.sendMail(mailOptions);
      console.log("Email успішно відправлено");

      if (attachments.length > 0) {
        let deletedCount = 0;
        for (const attachment of attachments) {
          try {
            await fs.unlink(attachment.path);
            console.log(`Видалено: ${attachment.path}`);
            deletedCount++;
          } catch (unlinkError) {
            if (unlinkError.code === "ENOENT") {
              console.log(`Файл вже видалений: ${attachment.path}`);
            } else {
              console.error("Помилка видалення файлу:", unlinkError);
            }
          }
        }
        console.log(`Видалено ${deletedCount} з ${attachments.length} файлів`);
      }

      res.status(200).json({
        message: "Email успішно відправлено",
        filesCount: attachments.length,
      });
    } catch (error) {
      console.error("Помилка відправки email:", error);

      res.status(500).json({
        error: "Помилка відправки email",
        details: error.message,
      });
    }
  });
});

app.get("/user-photos", authenticateToken, async (req, res) => {
  const userFolder = path.join(__dirname, "users_images", req.user.userId);
  let files = [];
  try {
    files = await fs.readdir(userFolder);
  } catch (e) {
    if (e.code === "ENOENT") return res.json({ photos: [] });
    throw e;
  }
  const photos = files
    .filter(f => !f.startsWith('.') &&  /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(f)) 
    
    .map(f => ({
      filename: f,
      url: `http://localhost:3000/users_images/${req.user.userId}/${f}`
    }));
  res.json({ photos });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
