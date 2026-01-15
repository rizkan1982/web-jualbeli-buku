import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bukukita.com' },
    update: {},
    create: {
      name: 'Administrator',
      email: 'admin@bukukita.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create Regular User
  const userPassword = await bcrypt.hash('user123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'user@example.com',
      password: userPassword,
      role: 'USER',
    },
  })
  console.log('✅ Regular user created:', user.email)

  // Create Categories
  const categories = [
    { name: 'Novel', description: 'Buku fiksi naratif yang menceritakan kisah imajiner', image: 'https://picsum.photos/seed/novel/400/300' },
    { name: 'Pendidikan', description: 'Buku untuk pembelajaran dan edukasi', image: 'https://picsum.photos/seed/education/400/300' },
    { name: 'Bisnis', description: 'Buku tentang kewirausahaan dan ekonomi', image: 'https://picsum.photos/seed/business/400/300' },
    { name: 'Sejarah', description: 'Buku yang menceritakan peristiwa masa lalu', image: 'https://picsum.photos/seed/history/400/300' },
    { name: 'Teknologi', description: 'Buku tentang perkembangan teknologi dan IT', image: 'https://picsum.photos/seed/technology/400/300' },
    { name: 'Self-Improvement', description: 'Buku pengembangan diri dan motivasi', image: 'https://picsum.photos/seed/selfhelp/400/300' },
    { name: 'Anak-anak', description: 'Buku cerita dan edukasi untuk anak', image: 'https://picsum.photos/seed/children/400/300' },
    { name: 'Komik', description: 'Buku cerita bergambar dan manga', image: 'https://picsum.photos/seed/comic/400/300' },
  ]

  const createdCategories = []
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
    createdCategories.push(created)
  }
  console.log('✅ Categories created:', createdCategories.length)

  // Create Books
  const books = [
    {
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      description: 'Novel yang menceritakan perjuangan 10 anak di Belitung Timur untuk mendapatkan pendidikan yang layak. Kisah inspiratif tentang persahabatan dan semangat belajar.',
      price: 89000,
      stock: 50,
      categoryId: createdCategories[0].id,
      image: 'https://picsum.photos/seed/laskarpelangi/400/600',
      isbn: '978-602-03-0234-5',
      publisher: 'Bentang Pustaka',
      publishYear: 2005,
      pages: 529,
    },
    {
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      description: 'Novel pertama dari Tetralogi Buru yang mengisahkan kehidupan pribumi di zaman kolonial Belanda. Sebuah karya sastra masterpiece Indonesia.',
      price: 95000,
      stock: 35,
      categoryId: createdCategories[0].id,
      image: 'https://picsum.photos/seed/bumimanusia/400/600',
      isbn: '978-979-403-300-0',
      publisher: 'Lentera Dipantara',
      publishYear: 1980,
      pages: 535,
    },
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'Cara mudah dan terbukti untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk. Panduan praktis untuk perubahan hidup.',
      price: 108000,
      stock: 100,
      categoryId: createdCategories[5].id,
      image: 'https://picsum.photos/seed/atomichabits/400/600',
      isbn: '978-0-7352-1131-3',
      publisher: 'Gramedia',
      publishYear: 2018,
      pages: 320,
    },
    {
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      description: 'Buku tentang literasi keuangan yang mengajarkan cara membangun kekayaan dan kebebasan finansial.',
      price: 125000,
      stock: 75,
      categoryId: createdCategories[2].id,
      image: 'https://picsum.photos/seed/richdad/400/600',
      isbn: '978-1-61268-014-0',
      publisher: 'Gramedia',
      publishYear: 1997,
      pages: 336,
    },
    {
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      description: 'Pelajaran abadi tentang kekayaan, keserakahan, dan kebahagiaan. Buku yang mengubah cara pandang tentang uang.',
      price: 98000,
      stock: 60,
      categoryId: createdCategories[2].id,
      image: 'https://picsum.photos/seed/psychologymoney/400/600',
      isbn: '978-0-85719-768-0',
      publisher: 'Harriman House',
      publishYear: 2020,
      pages: 256,
    },
    {
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      description: 'Perjalanan menakjubkan sejarah umat manusia dari zaman batu hingga era modern. Buku wajib baca untuk memahami peradaban.',
      price: 145000,
      stock: 40,
      categoryId: createdCategories[3].id,
      image: 'https://picsum.photos/seed/sapiens/400/600',
      isbn: '978-0-06-231609-7',
      publisher: 'Harper',
      publishYear: 2011,
      pages: 443,
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      description: 'Panduan praktis untuk menulis kode yang bersih, mudah dibaca, dan mudah dipelihara. Wajib untuk setiap programmer.',
      price: 185000,
      stock: 25,
      categoryId: createdCategories[4].id,
      image: 'https://picsum.photos/seed/cleancode/400/600',
      isbn: '978-0-13-235088-4',
      publisher: 'Prentice Hall',
      publishYear: 2008,
      pages: 464,
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'David Thomas & Andrew Hunt',
      description: 'Petunjuk dari pengembang berpengalaman tentang cara menjadi programmer yang lebih baik dan efektif.',
      price: 175000,
      stock: 30,
      categoryId: createdCategories[4].id,
      image: 'https://picsum.photos/seed/pragmatic/400/600',
      isbn: '978-0-13-595705-9',
      publisher: 'Addison-Wesley',
      publishYear: 2019,
      pages: 352,
    },
    {
      title: 'Filosofi Teras',
      author: 'Henry Manampiring',
      description: 'Buku filsafat Stoa yang dikemas dengan cara yang mudah dipahami untuk kehidupan modern Indonesia.',
      price: 89000,
      stock: 80,
      categoryId: createdCategories[5].id,
      image: 'https://picsum.photos/seed/filosofiteras/400/600',
      isbn: '978-602-291-557-8',
      publisher: 'Kompas',
      publishYear: 2018,
      pages: 346,
    },
    {
      title: 'Sejarah Indonesia Modern 1200-2008',
      author: 'M.C. Ricklefs',
      description: 'Buku komprehensif tentang sejarah Indonesia dari masa kerajaan hingga era reformasi.',
      price: 195000,
      stock: 20,
      categoryId: createdCategories[3].id,
      image: 'https://picsum.photos/seed/sejarahindo/400/600',
      isbn: '978-979-22-4004-0',
      publisher: 'Serambi',
      publishYear: 2008,
      pages: 784,
    },
    {
      title: 'Si Kancil dan Buaya',
      author: 'Folklore Indonesia',
      description: 'Cerita rakyat Indonesia tentang kecerdikan Kancil menghadapi buaya. Cocok untuk anak-anak.',
      price: 45000,
      stock: 100,
      categoryId: createdCategories[6].id,
      image: 'https://picsum.photos/seed/sikancil/400/600',
      isbn: '978-602-123-456-7',
      publisher: 'Erlangga',
      publishYear: 2020,
      pages: 32,
    },
    {
      title: 'One Piece Vol. 1',
      author: 'Eiichiro Oda',
      description: 'Petualangan Monkey D. Luffy dalam mencari harta karun One Piece dan menjadi Raja Bajak Laut.',
      price: 35000,
      stock: 150,
      categoryId: createdCategories[7].id,
      image: 'https://picsum.photos/seed/onepiece/400/600',
      isbn: '978-4-08-872509-1',
      publisher: 'Elex Media',
      publishYear: 1997,
      pages: 208,
    },
    {
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      description: 'Eksplorasi mendalam tentang dua sistem yang menggerakkan cara berpikir manusia.',
      price: 135000,
      stock: 45,
      categoryId: createdCategories[5].id,
      image: 'https://picsum.photos/seed/thinkingfast/400/600',
      isbn: '978-0-374-53355-7',
      publisher: 'Farrar, Straus and Giroux',
      publishYear: 2011,
      pages: 499,
    },
    {
      title: 'Matematika SMA Kelas 12',
      author: 'Tim Kemendikbud',
      description: 'Buku pelajaran matematika untuk siswa SMA kelas 12 sesuai kurikulum terbaru.',
      price: 55000,
      stock: 200,
      categoryId: createdCategories[1].id,
      image: 'https://picsum.photos/seed/matematikas/400/600',
      isbn: '978-602-244-789-0',
      publisher: 'Kemendikbud',
      publishYear: 2023,
      pages: 286,
    },
    {
      title: 'Pulang',
      author: 'Tere Liye',
      description: 'Novel tentang perjalanan pulang seorang anak ke kampung halamannya dan menghadapi masa lalu.',
      price: 79000,
      stock: 65,
      categoryId: createdCategories[0].id,
      image: 'https://picsum.photos/seed/pulang/400/600',
      isbn: '978-602-291-191-4',
      publisher: 'Republika',
      publishYear: 2015,
      pages: 400,
    },
  ]

  for (const book of books) {
    await prisma.book.create({
      data: book,
    })
  }
  console.log('✅ Books created:', books.length)

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
