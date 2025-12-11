import React, { useState, useEffect } from 'react';
import { BookletPage } from './components/BookletPage';
import { Printer, MapPin, Award, Camera, X, ChevronLeft, ChevronRight, Music, Info, Youtube } from 'lucide-react';

// Helper component untuk membungkus halaman dengan logika animasi Flipbook & print
const PageWrapper: React.FC<{ 
  children: React.ReactNode; 
  index: number; 
  currentIndex: number;
  totalPages: number;
}> = ({ children, index, currentIndex, totalPages }) => {
  
  // Logika Flipbook:
  // Halaman < currentIndex = Sudah dibalik ke kiri (-180deg)
  // Halaman >= currentIndex = Masih rata (0deg)
  const isFlipped = index < currentIndex;
  
  // Z-Index: Halaman awal harus paling atas tumpukan
  // Page 0: z-6, Page 1: z-5, dst.
  const zIndex = totalPages - index;

  return (
    <div 
      className={`
        absolute top-0 left-0 w-full h-full
        transition-transform duration-1000 ease-in-out origin-left
        [transform-style:preserve-3d] 
        [backface-visibility:hidden]
        bg-white
        
        /* Print Styles: Reset absolute positioning and transforms */
        print:relative print:transform-none print:visible print:opacity-100 print:block print:w-full print:h-auto
      `}
      style={{ 
        zIndex: zIndex,
        transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
      }}
    >
      {/* 1. Static Spine Shadow (Bayangan lipatan buku di kiri) */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-stone-900/20 to-transparent z-20 pointer-events-none mix-blend-multiply" />

      {/* 2. Dynamic Turning Shadow (Bayangan dinamis saat membalik) 
          Gradient ini menggelap saat halaman berputar menjauh (flipped)
      */}
      <div 
        className={`
          absolute inset-0 z-30 pointer-events-none
          bg-gradient-to-l from-black/40 via-black/10 to-transparent
          transition-opacity duration-1000 ease-in-out
          ${isFlipped ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* 3. Subtle Highlight (Kilau halus saat halaman rata) */}
      <div 
        className={`
          absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/30 to-transparent z-30 pointer-events-none
          transition-opacity duration-1000
          ${isFlipped ? 'opacity-0' : 'opacity-100'}
        `}
      />
      
      {children}
    </div>
  );
};

// Data for Kesenian Page
// Note: videoId menggunakan ID YouTube yang relevan atau placeholder jika tidak tersedia.
const kesenianList = [
  {
    id: 1,
    title: "Lenong",
    shortDesc: "Teater tradisional dengan dialog spontan & humor.",
    longDesc: "Lenong adalah teater rakyat Betawi yang berkembang di akhir abad ke-19. Pertunjukan ini dibawakan dalam dialek Betawi dan diiringi musik Gambang Kromong. Ada dua jenis Lenong: Lenong Denes (cerita bangsawan dengan bahasa halus) dan Lenong Preman (cerita jagoan/rakyat dengan bahasa sehari-hari). Ciri khasnya adalah interaksi spontan dan humor cerdas antar pemain.",
    image: "https://picsum.photos/400/250?random=20",
    videoId: "ScMzIvxBSi4" // Placeholder ID: Wonderland Indonesia (Representative of culture)
  },
  {
    id: 2,
    title: "Gambang Kromong",
    shortDesc: "Musik akulturasi Betawi-Tionghoa.",
    longDesc: "Orkes Gambang Kromong merupakan bukti harmonisnya akulturasi budaya Betawi dan Tionghoa. Instrumennya terdiri dari gamelan (Gambang, Kromong, Gong) dan alat musik gesek Tionghoa (Tehyan, Kongahyan, Sukong). Irama musik ini sering mengiringi tari Cokek dan teater Lenong, dengan lagu-lagu klasik seperti 'Jali-jali' dan 'Kicir-kicir'.",
    image: "https://picsum.photos/400/250?random=21",
    videoId: "ScMzIvxBSi4" // Placeholder
  },
  {
    id: 3,
    title: "Tanjidor",
    shortDesc: "Orkes tiup (brass) peninggalan kolonial.",
    longDesc: "Tanjidor adalah kesenian musik berbentuk orkes yang lahir pada abad ke-18. Namanya berasal dari bahasa Portugis 'Tanger' (memainkan alat musik). Dahulu dimainkan oleh budak-budak pemusik untuk menghibur tuan tanah. Kini, Tanjidor menjadi musik kemeriahan yang wajib ada saat arak-arakan pengantin atau pesta rakyat.",
    image: "https://picsum.photos/400/250?random=22",
    videoId: "ScMzIvxBSi4" // Placeholder
  },
  {
    id: 4,
    title: "Ondel-Ondel",
    shortDesc: "Boneka raksasa simbol penjaga kampung.",
    longDesc: "Dahulu disebut 'Barongan', Ondel-ondel dipercaya leluhur sebagai penolak bala atau penjaga kampung dari roh jahat. Wajah merah (laki-laki) menyimbolkan keberanian dan ketegasan, sedangkan wajah putih (perempuan) menyimbolkan kebaikan dan kesucian. Kini Ondel-ondel menjadi ikon semarak pesta Jakarta.",
    image: "https://picsum.photos/400/250?random=23",
    videoId: "ScMzIvxBSi4" // Placeholder
  },
  {
    id: 5,
    title: "Tari Topeng",
    shortDesc: "Tarian teatrikal dengan karakter topeng.",
    longDesc: "Tari Topeng Betawi bukan sekadar tarian, melainkan perpaduan seni tari, musik, dan teater. Penari mengganti topeng sesuai karakter cerita. Terdapat tiga watak utama topeng: Panji (putih, halus/lembut), Samba (merah muda, lincah/genit), dan Jingga/Klana (merah, gagah/kasar).",
    image: "https://picsum.photos/400/250?random=24",
    videoId: "ScMzIvxBSi4" // Placeholder
  },
  {
    id: 6,
    title: "Seni Kuliner",
    shortDesc: "Kerak telor, soto Betawi, dan bir pletok.",
    longDesc: "Kuliner Betawi kaya akan rempah dan pengaruh budaya Arab, Tionghoa, serta Eropa. Kerak Telor adalah primadona jajanan kerak nasi dengan telur bebek/ayam. Bir Pletok adalah minuman penghangat non-alkohol dari jahe, serai, dan kayu secang, diciptakan masyarakat Betawi untuk menandingi kebiasaan minum wine orang Belanda.",
    image: "https://picsum.photos/400/250?random=25",
    videoId: "ScMzIvxBSi4" // Placeholder
  }
];

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // State for Kesenian Modal
  const [selectedKesenian, setSelectedKesenian] = useState<typeof kesenianList[0] | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 6; // Cover (0) + 5 Pages
  
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

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 font-['Lato'] py-8 print:py-0 print:bg-white relative pb-24 print:pb-0 overflow-x-hidden">

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
                 e.currentTarget.style.display = 'none';
              }}
            />
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
      
      {/* Image Modal (Gallery) */}
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

      {/* Kesenian Detail Modal */}
      {selectedKesenian && (
        <div 
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 print:hidden animate-in fade-in duration-200"
          onClick={() => setSelectedKesenian(null)}
        >
           <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
           >
             {/* Header Image */}
             <div className="relative h-48 bg-slate-100 shrink-0">
               <img 
                 src={selectedKesenian.image} 
                 alt={selectedKesenian.title} 
                 className="w-full h-full object-cover"
               />
               <button 
                  onClick={() => setSelectedKesenian(null)}
                  className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors"
                >
                  <X size={24} />
               </button>
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                 <h3 className="text-2xl font-bold text-white font-['Playfair_Display']">{selectedKesenian.title}</h3>
               </div>
             </div>

             {/* Content Body */}
             <div className="p-6 overflow-y-auto">
                
                {/* YouTube Video Player */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Youtube size={20} className="text-red-600" />
                    <span className="text-sm font-bold text-slate-700">Video Dokumentasi:</span>
                  </div>
                  <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md border border-slate-200 bg-black">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${selectedKesenian.videoId}`} 
                      title={`Video ${selectedKesenian.title}`}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 italic text-right">* Video diambil dari referensi YouTube</p>
                </div>

                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Info size={18} className="text-teal-600"/> Tentang {selectedKesenian.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  {selectedKesenian.longDesc}
                </p>
             </div>
           </div>
        </div>
      )}
      
      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur shadow-md z-50 px-6 py-4 flex justify-between items-center no-print">
        <h1 className="font-['Playfair_Display'] font-bold text-xl text-teal-800 hidden md:block">
          Booklet Budaya Betawi
        </h1>
        <h1 className="font-['Playfair_Display'] font-bold text-lg text-teal-800 md:hidden">
          Booklet Betawi
        </h1>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full transition-all shadow-lg font-bold text-sm md:text-base"
        >
          <Printer size={18} />
          <span className="hidden md:inline">Simpan PDF / Cetak</span>
          <span className="md:hidden">Cetak</span>
        </button>
      </div>

      {/* Navigation Bar (Bottom) */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-40 flex justify-center items-center gap-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] no-print transition-transform duration-500 ${showIntro ? 'translate-y-full' : 'translate-y-0'}`}>
        <button 
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${currentPage === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-teal-100 text-teal-800 hover:bg-teal-200'}`}
        >
          <ChevronLeft size={20} /> Prev
        </button>

        <span className="font-['Playfair_Display'] font-bold text-slate-700 min-w-[100px] text-center">
          Hal. {currentPage === 0 ? 'Cover' : currentPage} / {totalPages - 1}
        </span>

        <button 
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${currentPage === totalPages - 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-teal-100 text-teal-800 hover:bg-teal-200'}`}
        >
          Next <ChevronRight size={20} />
        </button>
      </div>

      {/* 
        FLIPBOOK CONTAINER 
        - Requires relative positioning
        - Requires perspective for 3D effect
        - Requires fixed height matching the booklet page height to allow absolute positioning of children
      */}
      <div 
        className={`
          relative w-full max-w-4xl mx-auto 
          min-h-[1150px] /* Must match or exceed BookletPage min-height */
          mt-16 print:mt-0 
          transition-opacity duration-1000 
          [perspective:2000px] /* 3D Perspective */
          
          /* Print resets */
          print:perspective-none print:h-auto print:block
          ${showIntro ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}
        `}
      >

        {/* --- COVER PAGE (Index 0) --- */}
        <PageWrapper index={0} currentIndex={currentPage} totalPages={totalPages}>
          <BookletPage className="justify-center items-center text-center" accentColor="fill-red-600">
            <div className="flex-1 flex flex-col justify-center items-center border-4 border-double border-red-100 p-8 m-4 rounded-xl">
              
              <div className="mb-8">
                <img 
                  src="logo_sanggar.png" 
                  alt="Logo Sanggar Rumah Baba" 
                  className="h-32 md:h-40 w-auto object-contain mx-auto drop-shadow-sm"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'; 
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
        </PageWrapper>

        {/* --- PAGE 1: SEJARAH BETAWI (Index 1) --- */}
        <PageWrapper index={1} currentIndex={currentPage} totalPages={totalPages}>
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
        </PageWrapper>

        {/* --- PAGE 2: KESENIAN BETAWI (Index 2) --- */}
        <PageWrapper index={2} currentIndex={currentPage} totalPages={totalPages}>
          <BookletPage pageNumber={2} accentColor="fill-amber-600">
             <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-10 bg-amber-600"></div>
              <h2 className="text-3xl font-['Playfair_Display'] font-bold text-amber-800">Kesenian Betawi</h2>
            </div>

            <p className="mb-4 text-slate-700 text-sm">
              Kesenian Betawi berkembang sebagai hasil perpaduan budaya yang kaya. Klik pada kartu untuk melihat detail dan mendengarkan contoh audio.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {kesenianList.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedKesenian(item)}
                  className="bg-white p-3 rounded-lg shadow-sm border border-stone-100 flex flex-col cursor-pointer group hover:shadow-md hover:border-amber-200 transition-all duration-300"
                >
                  <div className="h-28 w-full mb-3 overflow-hidden rounded bg-slate-100 relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                       <div className="bg-white/80 rounded-full p-2">
                         <Music size={20} className="text-amber-700" />
                       </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-amber-700 mb-1 border-b border-amber-100 pb-1 text-sm flex items-center justify-between">
                    {item.title}
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-normal group-hover:bg-amber-600 group-hover:text-white transition-colors">Info</span>
                  </h3>
                  <p className="text-xs text-slate-600 mb-1 flex-1">
                    {item.shortDesc}
                  </p>
                </div>
              ))}
            </div>
          </BookletPage>
        </PageWrapper>

        {/* --- PAGE 3: SILAT BETAWI (Index 3) --- */}
        <PageWrapper index={3} currentIndex={currentPage} totalPages={totalPages}>
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
        </PageWrapper>

        {/* --- PAGE 4: SANGGAR RUMAH BABA (Index 4) --- */}
        <PageWrapper index={4} currentIndex={currentPage} totalPages={totalPages}>
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
        </PageWrapper>

        {/* --- PAGE 5: GALERI KEGIATAN (Index 5) --- */}
        <PageWrapper index={5} currentIndex={currentPage} totalPages={totalPages}>
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
        </PageWrapper>

      </div>
    </div>
  );
};

export default App;