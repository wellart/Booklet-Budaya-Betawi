import React, { useState, useEffect } from 'react';
import { BookletPage } from './components/BookletPage';
import { Printer, MapPin, Award, Camera, X } from 'lucide-react';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // State untuk Intro
  const [showIntro, setShowIntro] = useState(true);
  const [introFading, setIntroFading] = useState(false);
  const [introStep, setIntroStep] = useState(0);

  // Efek Animasi Intro
  useEffect(() => {
    // Sequence Timeline
    const timeouts = [
      setTimeout(() => setIntroStep(1), 500),  // Logo Masuk
      setTimeout(() => setIntroStep(2), 1500), // Teks 1: Sejarah Betawi
      setTimeout(() => setIntroStep(3), 2200), // Teks 2: Budaya Betawi
      setTimeout(() => setIntroStep(4), 2900), // Teks 3: Hubungan Silat
      setTimeout(() => setIntroStep(5), 3600), // Teks 4: Sejarah Sanggar
      setTimeout(() => setIntroFading(true), 5500), // Mulai Fade Out
      setTimeout(() => setShowIntro(false), 6200),  // Hapus Intro dari DOM
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-100 font-['Lato'] py-8 print:py-0 print:bg-white relative">

      {/* --- INTRO SPLASH SCREEN --- */}
      {showIntro && (
        <div className={`fixed inset-0 z-[200] bg-orange-50 flex flex-col justify-center items-center p-8 transition-opacity duration-700 ${introFading ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* Logo Animation */}
          <div className={`transform transition-all duration-1000 ease-out mb-8 ${introStep >= 1 ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10'}`}>
            <img 
              src="logo_sanggar.png" 
              alt="Logo Sanggar Rumah Baba" 
              className="h-40 md:h-56 w-auto object-contain drop-shadow-xl"
              onError={(e) => {
                 // Fallback jika gambar tidak ada saat dev
                 e.currentTarget.style.display = 'none';
              }}
            />
             {/* Fallback Text if image fails or just as decoration */}
             <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-teal-900 mt-4 text-center">
              Sanggar Rumah Baba
            </h1>
          </div>

          {/* Text Sequence */}
          <div className="space-y-4 text-center font-['Playfair_Display'] text-lg md:text-2xl text-slate-700 font-semibold">
            
            <div className={`transition-all duration-700 delay-0 ${introStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-teal-700">❖</span> Sejarah Betawi
            </div>

            <div className={`transition-all duration-700 delay-0 ${introStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-amber-600">❖</span> Budaya Betawi
            </div>

            <div className={`transition-all duration-700 delay-0 ${introStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-red-700">❖</span> Hubungan Silat Dengan Betawi
            </div>

            <div className={`transition-all duration-700 delay-0 ${introStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-green-700">❖</span> Sejarah Sanggar Rumah Baba
            </div>

          </div>

          {/* Loading Bar Decoration */}
          <div className="absolute bottom-10 w-48 h-1 bg-stone-200 rounded-full overflow-hidden">
             <div className="h-full bg-teal-600 animate-[pulse_2s_infinite]"></div>
          </div>
        </div>
      )}
      
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex justify-center items-center p-4 print:hidden animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full View" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      
      {/* Control Bar - Hidden when printing */}
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur shadow-md z-50 px-6 py-4 flex justify-between items-center no-print">
        <h1 className="font-['Playfair_Display'] font-bold text-xl text-teal-800">
          Booklet Budaya Betawi
        </h1>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition-all shadow-lg font-bold"
        >
          <Printer size={18} />
          Simpan PDF / Cetak
        </button>
      </div>

      <div className={`flex flex-col gap-8 print:gap-0 mt-16 print:mt-0 transition-opacity duration-1000 ${showIntro ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>

        {/* --- COVER PAGE --- */}
        <BookletPage className="justify-center items-center text-center" accentColor="fill-red-600">
          <div className="flex-1 flex flex-col justify-center items-center border-4 border-double border-red-100 p-8 m-4 rounded-xl">
            
            {/* Logo Section */}
            <div className="mb-8">
              <img 
                src="logo_sanggar.png" 
                alt="Logo Sanggar Rumah Baba" 
                className="h-32 md:h-40 w-auto object-contain mx-auto drop-shadow-sm"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'; // Hide if image not found
                }}
              />
            </div>
            
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Mengenal Sejarah <br/>
              <span className="text-red-600">& Budaya Betawi</span>
            </h1>
            
            <div className="w-24 h-1 bg-yellow-500 mb-6"></div>
            
            <p className="text-xl text-slate-600 max-w-lg mb-12 italic font-['Playfair_Display']">
              Sejarah, Kesenian, Hubungan Silat, dan Profil Sanggar Rumah Baba
            </p>

            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mt-8">
               <img 
                src="https://picsum.photos/400/300?random=1" 
                alt="Ondel Ondel" 
                className="w-full h-48 object-cover rounded-lg shadow-md grayscale hover:grayscale-0 transition-all duration-500"
              />
              <img 
                src="https://picsum.photos/400/300?random=2" 
                alt="Silat Betawi" 
                className="w-full h-48 object-cover rounded-lg shadow-md grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </BookletPage>

        {/* --- PAGE 1: SEJARAH BETAWI --- */}
        <BookletPage pageNumber={1} accentColor="fill-teal-600">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-10 bg-teal-600"></div>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-teal-800">Sejarah & Asal Usul Betawi</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div className="md:col-span-2 text-justify text-slate-700 leading-relaxed space-y-4">
              <p>
                <span className="font-bold text-teal-700 text-lg">Melting Pot Batavia.</span> Etnis Betawi lahir dari proses akulturasi budaya yang panjang di kota pelabuhan Batavia. Sejak Gubernur Jenderal VOC <strong>Jan Pieterszoon Coen</strong> membangun Batavia pada tahun 1619, kota ini menjadi pusat perdagangan maritim yang menarik migran dari berbagai penjuru.
              </p>
              <p>
                VOC mendatangkan tentara, pedagang, dan pekerja dari berbagai suku bangsa (Sunda, Jawa, Bali, Bugis, Ambon) serta bangsa asing (Tionghoa, Arab, India, dan Portugis/Mardijkers). Interaksi intensif di pemukiman yang padat, ditambah dengan pernikahan silang antar-etnis, perlahan meleburkan identitas kesukuan asli mereka menjadi identitas baru yang egalitarian: <strong>Orang Betawi</strong>.
              </p>
              <p>
                Bahasa Melayu Pasar yang digunakan sebagai <em>lingua franca</em> dalam perdagangan di pelabuhan Sunda Kelapa berevolusi menjadi Bahasa Betawi, diperkaya dengan serapan kosakata dari bahasa Belanda, Portugis, Hokkien, dan Arab.
              </p>
            </div>
            
            <div className="md:col-span-1 space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                 <img 
                  src="https://picsum.photos/300/400?random=3" 
                  alt="Batavia Era VOC" 
                  className="w-full h-40 object-cover rounded mb-3 shadow-sm sepia"
                />
                <p className="text-xs text-orange-800 italic text-center">
                  Suasana kesibukan di pelabuhan Batavia tempo dulu.
                </p>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h4 className="font-bold text-teal-800 text-sm mb-2 border-b border-teal-200 pb-1">Faktor Pembentuk:</h4>
                <ul className="text-xs text-teal-900 space-y-1 list-disc list-inside">
                  <li>Perdagangan Rempah VOC</li>
                  <li>Migrasi Antar-Pulau</li>
                  <li>Pemukiman Budak & Pekerja</li>
                  <li>Asimilasi Perkawinan</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section Jagoan */}
          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-red-600 mb-6">
            <h3 className="font-bold text-lg mb-3 text-slate-800 flex items-center gap-2">
              <span className="text-red-600 text-2xl">⚔</span> Legenda Jagoan & Jawara Betawi
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm mb-4">
              Dalam struktur sosial Betawi yang seringkali tertindas oleh kebijakan kolonial, muncullah sosok <strong>Jawara</strong> atau Jagoan. Mereka bukan sekadar ahli silat, melainkan tokoh masyarakat yang menjadi pelindung kampung (*local hero*) dan simbol perlawanan terhadap ketidakadilan tuan tanah maupun pemerintah kolonial.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
                  <strong className="text-red-700 block text-sm">Si Pitung</strong>
                  <span className="text-xs text-slate-600">"Robin Hood" dari Rawa Belong, perampok ulung yang membagikan hasil jarahannya ke rakyat miskin.</span>
               </div>
               <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
                  <strong className="text-red-700 block text-sm">Entong Gendut</strong>
                  <span className="text-xs text-slate-600">Pemimpin pemberontakan petani di Condet (1916) melawan kesewenang-wenangan tuan tanah.</span>
               </div>
               <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
                  <strong className="text-red-700 block text-sm">Haji Darip</strong>
                  <span className="text-xs text-slate-600">Panglima perang dari Klender yang menggerakkan barisan rakyat pada masa revolusi fisik.</span>
               </div>
            </div>
          </div>
          
          <p className="text-slate-700 leading-relaxed mt-auto border-t pt-4 text-sm italic text-center">
             "Lo jual, gue beli." — Falsafah yang menggambarkan keberanian dan sikap pantang menyerah masyarakat Betawi dalam mempertahankan harga diri.
          </p>
        </BookletPage>

        {/* --- PAGE 2: KESENIAN BETAWI --- */}
        <BookletPage pageNumber={2} accentColor="fill-amber-600">
           <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-10 bg-amber-600"></div>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-amber-800">Kesenian Betawi</h2>
          </div>

          <p className="mb-4 text-slate-700 text-sm">
            Kesenian Betawi berkembang sebagai hasil perpaduan budaya yang kaya. Berikut adalah beberapa kesenian ikonik:
          </p>

          <div className="grid grid-cols-2 gap-5">
            
            {/* 1. Lenong */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-stone-100 flex flex-col">
              <div className="h-28 w-full mb-3 overflow-hidden rounded bg-slate-100">
                <img src="https://picsum.photos/400/250?random=20" alt="Pementasan Lenong" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-amber-700 mb-1 border-b border-amber-100 pb-1 text-sm">1. Lenong</h3>
              <p className="text-xs text-slate-600 mb-1 flex-1">
                Teater tradisional dengan dialog spontan & humor (Lenong Denes & Preman).
              </p>
            </div>

             {/* 2. Gambang Kromong */}
             <div className="bg-white p-3 rounded-lg shadow-sm border border-stone-100 flex flex-col">
              <div className="h-28 w-full mb-3 overflow-hidden rounded bg-slate-100">
                <img src="https://picsum.photos/400/250?random=21" alt="Gambang Kromong" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-amber-700 mb-1 border-b border-amber-100 pb-1 text-sm">2. Gambang Kromong</h3>
              <p className="text-xs text-slate-600 flex-1">
                Musik akulturasi Betawi-Tionghoa dengan instrumen gambang, kromong, & tehyan.
              </p>
            </div>

            {/* 3. Tanjidor */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-stone-100 flex flex-col">
               <div className="h-28 w-full mb-3 overflow-hidden rounded bg-slate-100">
                <img src="https://picsum.photos/400/250?random=22" alt="Tanjidor" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
               <h3 className="font-bold text-amber-700 mb-1 border-b border-amber-100 pb-1 text-sm">3. Tanjidor</h3>
               <p className="text-xs text-slate-600 flex-1">Orkes tiup (brass) peninggalan kolonial yang sering memeriahkan arak-arakan.</p>
            </div>

            {/* 4. Ondel-ondel */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-stone-100 flex flex-col">
               <div className="h-28 w-full mb-3 overflow-hidden rounded bg-slate-100">
                <img src="https://picsum.photos/400/250?random=23" alt="Ondel Ondel" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
               <h3 className="font-bold text-amber-700 mb-1 border-b border-amber-100 pb-1 text-sm">4. Ondel-Ondel</h3>
               <p className="text-xs text-slate-600 flex-1">Boneka raksasa simbol penjaga kampung & penolak bala.</p>
            </div>

            {/* 5. Tari Topeng */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-stone-100 flex flex-col">
                <div className="h-28 w-full mb-3 overflow-hidden rounded bg-slate-100">
                  <img src="https://picsum.photos/400/250?random=24" alt="Tari Topeng" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
               <h3 className="font-bold text-amber-700 mb-1 border-b border-amber-100 pb-1 text-sm">5. Tari Topeng</h3>
               <p className="text-xs text-slate-600 flex-1">Tarian teatrikal dengan karakter topeng Panji, Jingga, dan Romo.</p>
            </div>

             {/* 6. Kuliner */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-stone-100 flex flex-col">
                <div className="h-28 w-full mb-3 overflow-hidden rounded bg-slate-100">
                  <img src="https://picsum.photos/400/250?random=25" alt="Kuliner Betawi" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
               <h3 className="font-bold text-amber-700 mb-1 border-b border-amber-100 pb-1 text-sm">6. Seni Kuliner</h3>
               <p className="text-xs text-slate-600 flex-1">Kerak telor, soto Betawi, gabus pucung, dan bir pletok.</p>
            </div>
            
          </div>
        </BookletPage>

        {/* --- PAGE 3: SILAT BETAWI --- */}
        <BookletPage pageNumber={3} accentColor="fill-red-700">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-10 bg-red-700"></div>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-red-900">Silat & Masyarakat Betawi</h2>
          </div>

          <div className="relative mb-8">
            <img 
              src="https://picsum.photos/800/300?random=5" 
              alt="Silat Practice" 
              className="w-full h-48 object-cover rounded-xl shadow-md opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end p-6">
              <p className="text-white font-bold text-lg drop-shadow-md">
                "Silat bukan sekadar bela diri, tapi simbol kehormatan."
              </p>
            </div>
          </div>

          <div className="columns-1 md:columns-2 gap-8 space-y-6 text-slate-700 text-justify">
            <p>
              Pencak silat memegang peranan penting dalam kehidupan masyarakat Betawi. Bagi orang Betawi, silat bukan semata-mata teknik bela diri, tetapi juga merupakan ajaran moral, identitas budaya, dan simbol kehormatan.
            </p>
            <p>
              Pada masa kolonial, silat digunakan oleh para jawara Betawi untuk mempertahankan kampung dari gangguan perampok atau penjajah. Para jawara dikenal sebagai sosok yang disegani, berwibawa, dan berperan sebagai penjaga keamanan lingkungan.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl text-red-800 mb-4 font-['Playfair_Display']">Fungsi Silat dalam Masyarakat</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Pembentukan Karakter", desc: "Mengajarkan rendah hati & hormat pada guru." },
                { title: "Seni Budaya", desc: "Ditampilkan di sunatan & palang pintu pernikahan." },
                { title: "Simbol Keberanian", desc: "Bekal menjaga diri dan keluarga." },
                { title: "Warisan Leluhur", desc: "Aliran Beksi, Cingkrik, Gerak Rasa, dll." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="mt-1 min-w-[24px]">
                    <Award size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-red-800/80 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BookletPage>

        {/* --- PAGE 4: SANGGAR RUMAH BABA --- */}
        <BookletPage pageNumber={4} accentColor="fill-green-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-10 bg-green-700"></div>
              <h2 className="text-3xl font-['Playfair_Display'] font-bold text-green-900">Sejarah Sanggar Rumah Baba</h2>
            </div>
            {/* Logo Watermark/Icon for Section */}
            <img 
              src="logo_sanggar.png" 
              alt="Logo Sanggar" 
              className="h-16 w-auto object-contain opacity-80 hidden md:block" 
              onError={(e) => {
                  e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
            <div className="flex-1 text-slate-700 text-justify space-y-4">
              <p>
                <strong>Sanggar Rumah Baba</strong> didirikan pada <span className="text-green-700 font-bold">10 November 2010</span> di Pondok Cabe Ilir oleh <strong>Bang Udin Cecek</strong>. Sanggar ini lahir dari kepedulian untuk melestarikan budaya Betawi yang mulai tergerus oleh perkembangan zaman.
              </p>
              <p>
                Fokus utama sanggar ini adalah menjaga penerusan ilmu pencak silat tradisi, khususnya aliran <span className="bg-green-100 px-1 rounded font-semibold text-green-800">MS Jalan Enam Pengasinan</span>.
              </p>
            </div>
            <div className="w-full md:w-1/3">
               <div className="bg-white p-3 shadow-lg rotate-2 border border-slate-200">
                 <img src="https://picsum.photos/300/300?random=6" alt="Bang Udin Cecek" className="w-full h-auto grayscale hover:grayscale-0 transition-all" />
                 <p className="text-center text-xs mt-2 font-serif">Arsip Sanggar Rumah Baba</p>
               </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-6">
            <h3 className="font-['Playfair_Display'] font-bold text-xl text-green-800 mb-4 flex items-center gap-2">
              <MapPin size={20}/> Visi & Misi
            </h3>
            <ul className="space-y-2">
              {[
                "Melestarikan seni budaya Betawi melalui latihan & pertunjukan.",
                "Membina generasi muda agar bangga terhadap tradisi.",
                "Menjaga eksistensi silat tradisi sebagai warisan leluhur.",
                "Wadah sosial dan kebersamaan masyarakat Pondok Cabe."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-green-600 rounded-full block"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-bold text-slate-800 mb-2">Jejak Langkah & Prestasi</h4>
            <p className="text-sm text-slate-600 mb-4">
              Selama lebih dari satu dekade, Sanggar Rumah Baba aktif dalam festival budaya lokal hingga nasional, pertunjukan pemerintahan, dan pembinaan atlet silat berprestasi.
            </p>
            <p className="text-center font-['Playfair_Display'] text-lg font-bold text-green-800 italic mt-6">
              "Pusat penguatan karakter, disiplin, dan gotong royong."
            </p>
          </div>

        </BookletPage>

        {/* --- PAGE 5: GALERI KEGIATAN --- */}
        <BookletPage pageNumber={5} accentColor="fill-orange-600">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-10 bg-orange-600"></div>
              <h2 className="text-3xl font-['Playfair_Display'] font-bold text-orange-900">Galeri Kegiatan</h2>
            </div>
             <Camera className="text-orange-400 opacity-60" size={32} />
          </div>

          <p className="text-slate-700 mb-8 leading-relaxed">
             Dokumentasi ini merekam jejak langkah, semangat latihan, serta kemeriahan pentas seni yang menjadi bukti nyata komitmen <span className="font-bold text-orange-800">Sanggar Rumah Baba</span> dalam merawat dan melestarikan budaya Betawi di tengah masyarakat modern.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grid-rows-[160px_160px_160px]">
            {/* Featured Photo - Large */}
            <div 
              className="col-span-2 row-span-2 relative group rounded-xl overflow-hidden shadow-md border-2 border-white cursor-pointer"
              onClick={() => setSelectedImage("https://picsum.photos/600/600?random=10")}
            >
               <img 
                 src="https://picsum.photos/600/600?random=10" 
                 alt="Foto Bersama Anggota" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                 <div>
                    <p className="text-white font-bold text-shadow">Keluarga Besar Sanggar</p>
                    <p className="text-white/80 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <Camera size={12}/> Klik untuk memperbesar
                    </p>
                 </div>
               </div>
            </div>

            {/* Side Photo 1 */}
            <div 
              className="relative group rounded-xl overflow-hidden shadow-sm border border-stone-200 cursor-pointer"
              onClick={() => setSelectedImage("https://picsum.photos/300/300?random=11")}
            >
               <img src="https://picsum.photos/300/300?random=11" alt="Latihan Silat" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-x-0 bottom-0 bg-white/90 py-1 px-2 text-xs font-semibold text-center text-orange-900 translate-y-full group-hover:translate-y-0 transition-transform">Latihan Rutin</div>
            </div>

            {/* Side Photo 2 */}
            <div 
              className="relative group rounded-xl overflow-hidden shadow-sm border border-stone-200 cursor-pointer"
              onClick={() => setSelectedImage("https://picsum.photos/300/300?random=12")}
            >
               <img src="https://picsum.photos/300/300?random=12" alt="Pentas Seni" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-x-0 bottom-0 bg-white/90 py-1 px-2 text-xs font-semibold text-center text-orange-900 translate-y-full group-hover:translate-y-0 transition-transform">Pentas Seni</div>
            </div>

            {/* Bottom Row - Wide */}
            <div 
              className="md:col-span-1 relative group rounded-xl overflow-hidden shadow-sm border border-stone-200 cursor-pointer"
              onClick={() => setSelectedImage("https://picsum.photos/300/300?random=13")}
            >
               <img src="https://picsum.photos/300/300?random=13" alt="Festival Budaya" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
             <div 
               className="md:col-span-2 relative group rounded-xl overflow-hidden shadow-sm border border-stone-200 cursor-pointer"
               onClick={() => setSelectedImage("https://picsum.photos/600/300?random=14")}
             >
               <img src="https://picsum.photos/600/300?random=14" alt="Generasi Penerus" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute bottom-2 right-2 bg-orange-600 text-white text-xs px-3 py-1 rounded-full shadow">Generasi Penerus</div>
            </div>
          </div>

          <div className="mt-auto bg-orange-50 border border-orange-200 p-4 rounded-lg flex items-center gap-4">
             <div className="bg-white p-2 rounded-full shadow-sm">
                <Camera size={24} className="text-orange-600" />
             </div>
             <div>
               <p className="text-sm text-orange-900 font-bold italic">"Setiap gerakan adalah doa, setiap keringat adalah bukti cinta pada budaya."</p>
             </div>
          </div>

        </BookletPage>

      </div>
    </div>
  );
};

export default App;