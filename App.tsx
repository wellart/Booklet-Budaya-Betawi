import React from 'react';
import { BookletPage } from './components/BookletPage';
import { Printer, MapPin, Award } from 'lucide-react';

const App: React.FC = () => {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-100 font-['Lato'] py-8 print:py-0 print:bg-white">
      
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

      <div className="flex flex-col gap-8 print:gap-0 mt-16 print:mt-0">

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
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-teal-800">Sejarah Betawi</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div className="md:col-span-2 text-justify text-slate-700 leading-relaxed space-y-4">
              <p>
                <span className="font-bold text-teal-700 text-lg">Suku Betawi</span> merupakan etnis yang terbentuk dari percampuran berbagai bangsa dan suku yang pernah bermukim di Batavia sejak abad ke-17. Kehadiran masyarakat Betawi tidak bisa dilepaskan dari sejarah panjang kolonialisme, migrasi, dan perdagangan internasional di wilayah Batavia.
              </p>
              <p>
                Asal-usul masyarakat Betawi berasal dari perpaduan suku Sunda, Jawa, Melayu, Bali, Bugis, Makassar, Ambon, Arab, Tionghoa, India, hingga Belanda. Pada masa VOC, Batavia menjadi kota pelabuhan besar yang menarik banyak pendatang. Para pendatang ini kemudian berinteraksi, berbaur, menikah, dan melahirkan sebuah identitas baru yang kini dikenal sebagai orang Betawi.
              </p>
            </div>
            <div className="md:col-span-1">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                 <img 
                  src="https://picsum.photos/300/400?random=3" 
                  alt="Batavia Lama" 
                  className="w-full h-48 object-cover rounded mb-3 shadow-sm"
                />
                <p className="text-xs text-orange-800 italic text-center">
                  Ilustrasi suasana Batavia tempo dulu, tempat bertemunya berbagai etnis.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-teal-500 mb-6">
            <h3 className="font-bold text-lg mb-2 text-teal-700">Identitas yang Kuat</h3>
            <p className="text-slate-700 leading-relaxed text-sm">
              Secara historis, istilah “Betawi” baru menguat pada abad ke-19 ketika kolonial Belanda mulai mencatat keberadaan penduduk lokal asli Batavia. Bahasa Betawi yang merupakan campuran Melayu, Sunda, dan pengaruh kosakata Portugis serta Tionghoa juga semakin menandai identitas mereka. Karakter khas mereka meliputi keramahan, solidaritas kampung, religiusitas, serta sikap tegas yang dikenal sebagai ciri “jagoan Betawi”.
            </p>
          </div>
          
          <p className="text-slate-700 leading-relaxed mt-auto border-t pt-4">
             Hingga kini, masyarakat Betawi menjadi bagian penting dari identitas Jakarta, meski urbanisasi dan modernisasi membuat banyak budaya Betawi harus terus dilestarikan agar tidak punah.
          </p>
        </BookletPage>

        {/* --- PAGE 2: KESENIAN BETAWI --- */}
        <BookletPage pageNumber={2} accentColor="fill-amber-600">
           <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-10 bg-amber-600"></div>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-amber-800">Kesenian Betawi</h2>
          </div>

          <p className="mb-6 text-slate-700">
            Kesenian Betawi berkembang sebagai hasil perpaduan budaya yang kaya. Berikut adalah beberapa kesenian ikonik:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lenong */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
              <h3 className="font-bold text-amber-700 mb-2 border-b pb-2">1. Lenong</h3>
              <p className="text-sm text-slate-600 mb-2">
                Seni teater tradisional dengan dialog spontan dan humor.
              </p>
              <ul className="text-xs list-disc list-inside text-slate-500 ml-2">
                <li><strong>Lenong Denes</strong> (Bangsawan)</li>
                <li><strong>Lenong Preman</strong> (Humoris/Bebas)</li>
              </ul>
            </div>

             {/* Gambang Kromong */}
             <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
              <h3 className="font-bold text-amber-700 mb-2 border-b pb-2">2. Gambang Kromong</h3>
              <p className="text-sm text-slate-600">
                Perpaduan musik etnis Betawi dan Tionghoa. Instrumen khas berupa gambang, kromong, tehyan, dan alat musik gesek lainnya.
              </p>
            </div>

            {/* Tanjidor & Ondel-ondel */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100 md:col-span-2 flex gap-4">
              <div className="flex-1">
                 <h3 className="font-bold text-amber-700 mb-2">3. Tanjidor</h3>
                 <p className="text-sm text-slate-600">Musik orkes tiup peninggalan zaman kolonial Belanda.</p>
              </div>
              <div className="w-px bg-slate-200"></div>
              <div className="flex-1">
                 <h3 className="font-bold text-amber-700 mb-2">4. Ondel-Ondel</h3>
                 <p className="text-sm text-slate-600">Boneka raksasa ikon Betawi yang melambangkan penjaga kampung.</p>
              </div>
            </div>

            {/* Tari & Kuliner */}
             <div className="md:col-span-2 grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <img src="https://picsum.photos/200/300?random=4" alt="Tari Topeng" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="col-span-2 flex flex-col justify-center">
                   <h3 className="font-bold text-amber-700 mb-1">5. Tari Topeng Betawi</h3>
                   <p className="text-sm text-slate-600 mb-3">Mengandung nilai filosofi kehidupan dengan karakter topeng Panji, Jingga, dan Romo.</p>
                   
                   <h3 className="font-bold text-amber-700 mb-1">6. Seni Kuliner</h3>
                   <p className="text-sm text-slate-600">Kerak telor, soto Betawi, asinan, semur jengkol, dodol, dan bir pletok.</p>
                </div>
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

      </div>
    </div>
  );
};

export default App;