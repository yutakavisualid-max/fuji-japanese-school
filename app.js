// app.js - Logika Landing Page Simulasi, Auto-Fill Dummy & Chatbot
let currentLang = 'id';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi Data Dummy ke LocalStorage jika belum ada
  if (!localStorage.getItem('sasweb_leads') && tenantConfig.initialDummyLeads) {
    localStorage.setItem('sasweb_leads', JSON.stringify(tenantConfig.initialDummyLeads));
  }

  // 2. Render Identitas & Konten
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  setText('page-title', `Pendaftaran Online - ${tenantConfig.clientShortName}`);
  const logoEl = document.getElementById('client-logo');
  if (logoEl) logoEl.src = tenantConfig.logoUrl;

  setText('client-badge', tenantConfig.clientShortName);
  setText('promo-badge', tenantConfig.badgeText);
  setText('hero-title', tenantConfig.heroTitle);
  setText('hero-subtitle', tenantConfig.heroSubtitle);

  // Render Pilihan Jurusan di Select & Grid Kartu
  const programSelect = document.getElementById('program');
  const programGrid = document.getElementById('program-grid');

  if (tenantConfig.programs) {
    tenantConfig.programs.forEach(prog => {
      if (programSelect) {
        const opt = document.createElement('option');
        opt.value = prog.name;
        opt.innerText = `${prog.name} (${prog.jp})`;
        programSelect.appendChild(opt);
      }
      if (programGrid) {
        const card = document.createElement('div');
        card.className = "p-3 rounded-xl border border-stone-200/80 bg-stone-50/60 flex items-center justify-between";
        card.innerHTML = `
          <div>
            <span class="block text-xs font-bold text-slate-800">${prog.name}</span>
            <span class="block text-[11px] text-stone-500 jp-font">${prog.jp}</span>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-stone-200 text-slate-600">${prog.id}</span>
        `;
        programGrid.appendChild(card);
      }
    });
  }

  // 3. Submit Form -> Simpan ke LocalStorage Kanban
  const leadForm = document.getElementById('lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = document.getElementById('nama')?.value.trim();
      const whatsapp = document.getElementById('whatsapp')?.value.trim();
      const program = document.getElementById('program')?.value;
      const asalSekolah = document.getElementById('asal-sekolah')?.value.trim();

      if (!nama || !whatsapp || !program) return;

      const newLead = {
        id: Date.now(),
        nama,
        whatsapp,
        program,
        asalSekolah,
        status: 'masuk',
        waktu: 'Baru saja',
        catatan: 'Input dari Landing Page'
      };

      const existingLeads = JSON.parse(localStorage.getItem('sasweb_leads') || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem('sasweb_leads', JSON.stringify(existingLeads));

      if (confirm(`✅ Simulasi Berhasil!\n\nData "${nama}" (${program}) telah masuk ke kolom pertama papan Kanban.\n\nIngin langsung melihat posisinya di papan Kanban sekarang?`)) {
        window.location.href = 'kanban.html';
      } else {
        leadForm.reset();
      }
    });
  }

  // 4. Tombol Konsultasi WA
  const btnKonsultasi = document.getElementById('btn-konsultasi');
  if (btnKonsultasi) {
    btnKonsultasi.addEventListener('click', () => {
      const nama = document.getElementById('nama')?.value || 'Calon Siswa';
      const pesanWA = `Halo Admin ${tenantConfig.clientShortName}, saya ${nama}. Saya ingin bertanya mengenai program kelas Batch Januari 2027.`;
      window.open(`https://wa.me/${tenantConfig.whatsappMarketingNumber}?text=${encodeURIComponent(pesanWA)}`, '_blank');
    });
  }

  // 5. Inisialisasi Chatbot AI (Sinkron dengan ID di index.html)
  initChatbotWidget();
});

// Fungsi Auto-Fill Data Dummy untuk Memudahkan Uji Coba saat Demo
function isiDataDummyOtomatis() {
  const sampleNames = ["Hendra Wijaya", "Putri Maharani", "Arif Budiman", "Dewi Kartika", "Galih Prakoso"];
  const sampleSchools = ["SMKN 2 Depok", "SMAN 1 Sleman", "SMK N 1 Bantul", "SMK Muhammadiyah 1", "SMAN 2 Klaten"];
  const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
  const randomSchool = sampleSchools[Math.floor(Math.random() * sampleSchools.length)];
  const randomProg = tenantConfig.programs[Math.floor(Math.random() * tenantConfig.programs.length)].name;
  const randomPhone = "0812-" + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000);

  document.getElementById('nama').value = `${randomName} (Dummy)`;
  document.getElementById('whatsapp').value = randomPhone;
  document.getElementById('program').value = randomProg;
  document.getElementById('asal-sekolah').value = randomSchool;
}

// Switch Bahasa Banner & Label Utama (Indonesia <-> Jepang)
function toggleSimLanguage() {
  currentLang = currentLang === 'id' ? 'jp' : 'id';
  const btn = document.getElementById('toggle-lang-btn');
  const banner = document.getElementById('sim-banner-text');

  if (currentLang === 'jp') {
    btn.innerText = '🇮🇩 Bahasa Indonesia';
    banner.innerHTML = '<strong>【デモ・シミュレーションモード】</strong> 表示されているデータはすべてダミー（架空データ）です。選考フローや項目は、今後の運営方針に合わせて柔軟にカスタマイズ可能です。';
    document.getElementById('form-title').innerText = 'オンライン入学申込（試作）';
    document.getElementById('form-subtitle').innerText = '送信データは管理用カンバンボードへ自動連携されます。';
    document.getElementById('btn-daftar').innerText = '📝 申込テストを送信';
  } else {
    btn.innerText = '🇯🇵 日本語表示';
    banner.innerHTML = '<strong>Mode Simulasi:</strong> Seluruh data yang tampil adalah <em>dummy</em>. Alur & kolom sistem ini sangat fleksibel untuk disesuaikan dengan kebutuhan operasional sekolah.';
    document.getElementById('form-title').innerText = 'Formulir Pendaftaran';
    document.getElementById('form-subtitle').innerText = 'Data otomatis masuk ke sistem seleksi Kanban.';
    document.getElementById('btn-daftar').innerText = '📝 Daftar Sekarang (Simulasi)';
  }
}

// Logika Chatbot AI
function initChatbotWidget() {
  const toggleBtn = document.getElementById('toggle-chat-btn');
  const chatWindow = document.getElementById('chat-window');
  const closeBtn = document.getElementById('close-chat-btn');
  const resetBtn = document.getElementById('reset-chat-btn');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  const renderGreeting = () => {
    if (!chatMessages) return;
    chatMessages.innerHTML = `
      <div class="bg-white border border-stone-200 text-slate-700 p-3 rounded-2xl rounded-tl-none self-start max-w-[85%] shadow-sm">
        Halo! Selamat datang di simulasi <strong>${tenantConfig.clientShortName}</strong>. Silakan tanyakan soal <em>biaya</em>, <em>jurusan</em>, atau <em>syarat pendaftaran</em>.
      </div>
    `;
  };

  renderGreeting();

  if (toggleBtn && chatWindow) {
    toggleBtn.addEventListener('click', () => {
      chatWindow.classList.toggle('hidden');
      chatWindow.classList.toggle('flex');
    });
  }

  if (closeBtn && chatWindow) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.add('hidden');
      chatWindow.classList.remove('flex');
    });
  }

  if (resetBtn) resetBtn.addEventListener('click', renderGreeting);

  if (chatForm && chatInput && chatMessages) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      const userBubble = document.createElement('div');
      userBubble.className = "bg-slate-900 text-white p-3 rounded-2xl rounded-tr-none self-end max-w-[85%]";
      userBubble.innerText = text;
      chatMessages.appendChild(userBubble);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        let reply = "Terima kasih atas pertanyaannya. Untuk detail lebih lanjut, silakan klik tombol Konsultasi via WhatsApp.";
        const lower = text.toLowerCase();
        if (tenantConfig.aiKnowledgeBase) {
          for (const item of tenantConfig.aiKnowledgeBase) {
            if (item.keywords.some(k => lower.includes(k))) {
              reply = item.answer;
              break;
            }
          }
        }
        const botBubble = document.createElement('div');
        botBubble.className = "bg-white border border-stone-200 text-slate-800 p-3 rounded-2xl rounded-tl-none self-start max-w-[85%] shadow-sm";
        botBubble.innerText = reply;
        chatMessages.appendChild(botBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 400);
    });
  }
}

// Portal Admin
function bukaModalAdmin() {
  document.getElementById('modal-admin')?.classList.remove('hidden');
}
function tutupModalAdmin() {
  document.getElementById('modal-admin')?.classList.add('hidden');
  document.getElementById('error-pin')?.classList.add('hidden');
}
function verifikasiPin() {
  const inputPin = document.getElementById('input-pin-admin')?.value;
  const pinRahasia = tenantConfig.adminPin || '123456';
  if (inputPin === pinRahasia) {
    window.location.href = 'kanban.html';
  } else {
    document.getElementById('error-pin')?.classList.remove('hidden');
  }
}