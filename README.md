# DadoRTX Books - Toko Buku Online

Aplikasi web toko buku online yang lengkap dibangun dengan Next.js 14, TypeScript, Prisma, NextAuth, dan Tailwind CSS.

## 🚀 Fitur

### Pengguna
- ✅ Registrasi dan login dengan NextAuth
- ✅ Katalog buku dengan pencarian dan filter
- ✅ Detail buku lengkap
- ✅ Keranjang belanja
- ✅ Checkout dengan berbagai metode pembayaran
- ✅ Riwayat dan pelacakan pesanan
- ✅ Profil pengguna

### Admin Dashboard
- ✅ Dashboard statistik
- ✅ Kelola buku (CRUD)
- ✅ Kelola kategori (CRUD)
- ✅ Kelola pesanan dan update status
- ✅ Kelola pengguna (Edit, Hapus, Reset Password)
- ✅ Pengaturan

### Fitur Tambahan
- ✅ Animasi 3D di halaman utama
- ✅ Responsive design
- ✅ Animasi dengan Framer Motion
- ✅ Toast notifications
- ✅ SEO optimized

## 📦 Teknologi

- **Framework:** Next.js 14 (App Router)
- **Bahasa:** TypeScript
- **Database:** SQLite dengan Prisma ORM
- **Autentikasi:** NextAuth.js
- **Styling:** Tailwind CSS
- **Animasi:** Framer Motion
- **3D Graphics:** Three.js dengan React Three Fiber
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 🛠️ Instalasi

### Prasyarat
- Node.js 18+
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd web-jual-beli-buku
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit file `.env` sesuai kebutuhan:
   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Setup database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

6. **Buka browser**
   ```
   http://localhost:3000
   ```

## 👤 Akun Demo

### Admin
- Email: `admin@bukukita.com`
- Password: `admin123`

### User
- Email: `user@example.com`
- Password: `user123`

## 📁 Struktur Project

```
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API Routes
│   │   ├── books/         # Halaman katalog buku
│   │   ├── cart/          # Halaman keranjang
│   │   ├── checkout/      # Halaman checkout
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── login/         # Halaman login
│   │   ├── orders/        # Halaman pesanan
│   │   ├── profile/       # Halaman profil
│   │   ├── register/      # Halaman registrasi
│   │   └── ...            # Halaman lainnya
│   ├── components/        # React components
│   │   ├── 3d/            # 3D components
│   │   ├── books/         # Book components
│   │   ├── layout/        # Layout components
│   │   └── providers/     # Context providers
│   ├── lib/               # Utilities & configs
│   │   ├── auth.ts        # NextAuth config
│   │   └── prisma.ts      # Prisma client
│   └── types/             # TypeScript types
├── tailwind.config.js
├── next.config.js
└── package.json
```

## 📝 API Endpoints

### Autentikasi
- `POST /api/auth/register` - Registrasi user baru
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Buku
- `GET /api/books` - Daftar buku dengan pagination
- `POST /api/books` - Tambah buku baru (Admin)
- `GET /api/books/[id]` - Detail buku
- `PUT /api/books/[id]` - Update buku (Admin)
- `DELETE /api/books/[id]` - Hapus buku (Admin)

### Kategori
- `GET /api/categories` - Daftar kategori
- `POST /api/categories` - Tambah kategori (Admin)
- `PUT /api/categories/[id]` - Update kategori (Admin)
- `DELETE /api/categories/[id]` - Hapus kategori (Admin)

### Keranjang
- `GET /api/cart` - Keranjang user
- `POST /api/cart` - Tambah item ke keranjang
- `PUT /api/cart` - Update quantity item
- `DELETE /api/cart` - Hapus item dari keranjang

### Pesanan
- `GET /api/orders` - Daftar pesanan
- `POST /api/orders` - Buat pesanan baru
- `GET /api/orders/[id]` - Detail pesanan
- `PUT /api/orders/[id]` - Update status pesanan (Admin)

### Users
- `GET /api/users` - Daftar users (Admin)

## 🎨 Fitur UI

- **Glass Morphism** untuk navbar
- **Gradient backgrounds** untuk visual yang menarik
- **3D animated books** di homepage
- **Smooth animations** dengan Framer Motion
- **Responsive design** untuk semua ukuran layar
- **Dark mode ready** (Tailwind config)

## 📱 Halaman

### Publik
- `/` - Homepage dengan hero 3D
- `/books` - Katalog buku
- `/books/[id]` - Detail buku
- `/categories` - Daftar kategori
- `/about` - Tentang kami
- `/faq` - FAQ
- `/privacy` - Kebijakan privasi
- `/terms` - Syarat & ketentuan
- `/shipping` - Info pengiriman
- `/returns` - Info pengembalian

### Membutuhkan Login
- `/cart` - Keranjang belanja
- `/checkout` - Checkout
- `/orders` - Daftar pesanan
- `/orders/[id]` - Detail pesanan
- `/profile` - Profil pengguna

### Admin Only
- `/dashboard` - Dashboard admin
- `/dashboard/books` - Kelola buku
- `/dashboard/books/new` - Tambah buku
- `/dashboard/books/[id]/edit` - Edit buku
- `/dashboard/categories` - Kelola kategori
- `/dashboard/orders` - Kelola pesanan
- `/dashboard/orders/[id]` - Detail pesanan
- `/dashboard/users` - Kelola pengguna
- `/dashboard/settings` - Pengaturan

## 🔒 Security

- Password di-hash menggunakan bcrypt
- Session management dengan JWT
- Route protection dengan middleware
- Role-based access control (USER/ADMIN)

## 📈 Development

```bash
# Development server
npm run dev

# Build production
npm run build

# Start production server
npm start

# Linting
npm run lint

# Database commands
npm run db:push      # Push schema to database
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

## 📄 License

MIT License - Silakan gunakan untuk project Anda!

---

Dibuat dengan ❤️ menggunakan Next.js
