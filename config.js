// config.js - Konfigurasi Landing Page & Simulasi LPK / Japanese School
const tenantConfig = {
  tenantId: "FUJI_JAPANESE_SCHOOL",
  clientName: "富史ジャパニーズスクール (Fuji Japanese School)",
  clientShortName: "Fuji Japanese School",
  logoUrl: "logo.png",
  adminPin: "123456",

  // Target Batch Operasional
  batchLabel: "Batch Januari 2027",
  targetQuota: 30,
  targetTeachers: 3,

  // Konten Hero Section
  badgeText: "✨ Penerimaan Siswa Baru • Batch Januari 2027",
  heroTitle: "Maju, Unggul, dan Berkualitas Menuju Jepang",
  heroSubtitle: "安心 (Anshin) • 安全 (Anzen) • 安楽 (Anraku) • 当たり前 (Atarimae)",

  // Nomor WhatsApp Konsultasi
  whatsappMarketingNumber: "6282136428885",

  // 6 Bidang Program Kerja
  programs: [
    { id: "OTM", name: "Otomotif / Manufacture", jp: "自動車・製造" },
    { id: "PM",  name: "Pengolahan Makanan",     jp: "飲食料品製造" },
    { id: "KP",  name: "Kaigo / Perawat Lansia", jp: "介護" },
    { id: "PT",  name: "Pertanian",              jp: "農業" },
    { id: "KW",  name: "Konstruksi / Welding",   jp: "建設・溶接" },
    { id: "HTL", name: "Perhotelan",             jp: "宿泊・ホテル" }
  ],

  // Data Dummy Awal untuk Simulasi Kanban (Terdistribusi di Semua Tahap)
  initialDummyLeads: [
    { id: 101, nama: "Rizky Pratama",   whatsapp: "0812-3456-7801", program: "Otomotif / Manufacture", asalSekolah: "SMKN 2 Yogyakarta", status: "masuk",     waktu: "10 menit lalu", catatan: "Minat Tokutei Ginou" },
    { id: 102, nama: "Siti Nurhaliza",  whatsapp: "0857-2345-8812", program: "Kaigo / Perawat Lansia", asalSekolah: "SMK Kesehatan Bantul", status: "masuk", waktu: "1 jam lalu",    catatan: "Sudah punya dasar Hiragana" },
    { id: 103, nama: "Dimas Saputra",   whatsapp: "0813-9876-5423", program: "Konstruksi / Welding",   asalSekolah: "SMKN 1 Seyegan",    status: "wa",        waktu: "Kemarin",       catatan: "Jadwal konsultasi orang tua" },
    { id: 104, nama: "Ayu Lestari",     whatsapp: "0878-4512-3390", program: "Pengolahan Makanan",     asalSekolah: "SMAN 1 Kalasan",    status: "wa",        waktu: "Kemarin",       catatan: "Berkas KTP & KK lengkap" },
    { id: 105, nama: "Fajar Nugroho",   whatsapp: "0821-7765-1104", program: "Pertanian",              asalSekolah: "SMKN 1 Pandak",     status: "seleksi",   waktu: "2 hari lalu",   catatan: "Lolos tes fisik dasar" },
    { id: 106, nama: "Nadia Putri",     whatsapp: "0856-4432-9981", program: "Perhotelan",             asalSekolah: "SMKN 4 Yogyakarta", status: "seleksi",   waktu: "3 hari lalu",   catatan: "Wawancara tahap akhir" },
    { id: 107, nama: "Bagas Setiawan",  whatsapp: "0819-3321-6654", program: "Otomotif / Manufacture", asalSekolah: "SMK Muhammadiyah 3", status: "closing",  waktu: "4 hari lalu",   catatan: "Siap masuk kelas Jan 2027" },
    { id: 108, nama: "Rina Wulandari",  whatsapp: "0852-8890-1243", program: "Kaigo / Perawat Lansia", asalSekolah: "SMKN 1 Depok",      status: "closing",   waktu: "5 hari lalu",   catatan: "Administrasi awal selesai" }
  ],

  // Knowledge Base Chatbot AI
  aiKnowledgeBase: [
    {
      keywords: ["biaya", "spp", "bayar", "harga", "angsuran"],
      answer: "Biaya pendidikan dirancang transparan dan tersedia skema angsuran bertahap. Silakan klik tombol 'Konsultasi via WA' untuk rincian simulasi biaya."
    },
    {
      keywords: ["jurusan", "program", "bidang", "kerja"],
      answer: "Tersedia 6 bidang penempatan kerja Jepang: Otomotif/Manufacture, Pengolahan Makanan, Kaigo (Perawat), Pertanian, Konstruksi/Welding, dan Perhotelan."
    },
    {
      keywords: ["syarat", "pendaftaran", "dokumen", "daftar", "januari"],
      answer: "Untuk pembukaan kelas Batch Januari 2027, cukup siapkan KTP, KK, dan Ijazah/Rapor terakhir. Pendaftaran awal bisa langsung diisi melalui formulir di halaman ini."
    }
  ]
};