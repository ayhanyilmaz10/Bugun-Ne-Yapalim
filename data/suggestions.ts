export interface Suggestion {
  text: string;
  category: "sport" | "creative" | "social" | "home" | "mindful" | "nature";
}

export const suggestions: Suggestion[] = [
  // 🏃 Spor & Sağlık
  { text: "10 dakika yürüyüş yap 🚶", category: "sport" },
  { text: "15 dakika dans et 💃", category: "sport" },
  { text: "Esneme hareketleri yap 🤸", category: "sport" },
  { text: "20 şınav çek 💪", category: "sport" },
  { text: "Merdiven çık, asansör kullanma 🏃", category: "sport" },
  { text: "5 dakika ip atla 🪢", category: "sport" },
  { text: "Plank pozisyonunda 1 dakika dur 🧘", category: "sport" },
  { text: "Bisiklete bin 🚴", category: "sport" },
  { text: "Yüzmeye git 🏊", category: "sport" },
  { text: "Yoga videosu takip et 🧘‍♀️", category: "sport" },

  // 🎨 Yaratıcılık
  { text: "Bir resim çiz 🎨", category: "creative" },
  { text: "Günlük yaz ✍️", category: "creative" },
  { text: "Bir şiir yaz 📝", category: "creative" },
  { text: "Origami yap 🦢", category: "creative" },
  { text: "Mandala boya 🎭", category: "creative" },
  { text: "Fotoğraf çek ve düzenle 📸", category: "creative" },
  { text: "Yeni bir tarif dene 🍳", category: "creative" },
  { text: "El işi projesi başlat 🧶", category: "creative" },
  { text: "Kendi playlistini oluştur 🎵", category: "creative" },
  { text: "Bir hikaye yaz 📖", category: "creative" },

  // 👥 Sosyal Aktiviteler
  { text: "Birine mesaj at 💬", category: "social" },
  { text: "Eski bir arkadaşını ara 📞", category: "social" },
  { text: "Bir arkadaşına teşekkür et 🙏", category: "social" },
  { text: "Aile üyelerinle video görüşmesi yap 📱", category: "social" },
  { text: "Komşunla sohbet et 🏠", category: "social" },
  { text: "Birine iltifat et 💕", category: "social" },
  { text: "Arkadaşlarınla oyun oyna 🎮", category: "social" },
  { text: "Birlikte yemek pişir 👨‍🍳", category: "social" },
  { text: "Eski fotoğraflara bak ve paylaş 🖼️", category: "social" },
  { text: "Birine sürpriz yap 🎁", category: "social" },

  // 🏠 Ev İşleri
  { text: "Masanı toparla 🧹", category: "home" },
  { text: "Dolabını düzenle 👕", category: "home" },
  { text: "Bulaşıkları yıka 🍽️", category: "home" },
  { text: "Çöp kutusunu boşalt 🗑️", category: "home" },
  { text: "Yatağını topla 🛏️", category: "home" },
  { text: "Çiçekleri sula 🌱", category: "home" },
  { text: "Pencerelerini sil 🪟", category: "home" },
  { text: "Eski kıyafetlerini bağışla 👗", category: "home" },
  { text: "Buzdolabını temizle 🧊", category: "home" },
  { text: "Telefonundaki gereksiz uygulamaları sil 📱", category: "home" },

  // 🧠 Zihinsel Gelişim
  { text: "1 sayfa kitap oku 📖", category: "mindful" },
  { text: "5 dakika meditasyon yap 🧘", category: "mindful" },
  { text: "Derin nefes al, 5 kez tekrarla 🌸", category: "mindful" },
  { text: "Bugün için 3 şükür sebebi yaz 📝", category: "mindful" },
  { text: "Bir podcast dinle 🎧", category: "mindful" },
  { text: "Yeni bir kelime öğren 📚", category: "mindful" },
  { text: "TED Talk izle 🎤", category: "mindful" },
  { text: "Bulmaca veya sudoku çöz 🧩", category: "mindful" },
  { text: "Yabancı dil çalış 🌍", category: "mindful" },
  { text: "Haftalık hedeflerini yaz 🎯", category: "mindful" },

  // 🌿 Doğa & Açık Hava
  { text: "Pencereyi aç, temiz hava al 🌬️", category: "nature" },
  { text: "Parkta yürüyüş yap 🌳", category: "nature" },
  { text: "Günbatımını izle 🌅", category: "nature" },
  { text: "Kuşları gözlemle 🐦", category: "nature" },
  { text: "Bahçede vakit geçir 🌻", category: "nature" },
  { text: "Yıldızlara bak 🌟", category: "nature" },
  { text: "Deniz veya göl kenarına git 🌊", category: "nature" },
  { text: "Piknik yap 🧺", category: "nature" },
  { text: "Ağaç altında kitap oku 🌲", category: "nature" },
  { text: "Doğada fotoğraf çek 📷", category: "nature" },

  // 🎉 Ekstra Öneriler
  { text: "Gülümse! 😊", category: "mindful" },
  { text: "Bir bardak su iç 💧", category: "sport" },
  { text: "Bir bardak çay/kahve yap ☕", category: "home" },
  { text: "Sevdiğin bir şarkıyı aç 🎵", category: "creative" },
  { text: "Favori filminin bir sahnesini izle 🎬", category: "creative" },
  { text: "Bugün yapacağın iyi bir şey planla 💫", category: "social" },
  { text: "Telefonunu 30 dakika bırak 📵", category: "mindful" },
  { text: "Çocukluk fotoğraflarına bak 👶", category: "social" },
  { text: "Motivasyon videosu izle 🚀", category: "mindful" },
  { text: "Hayalini kurduğun yeri araştır ✈️", category: "creative" },
];

export const categoryNames: Record<Suggestion["category"], string> = {
  sport: "🏃 Spor & Sağlık",
  creative: "🎨 Yaratıcılık",
  social: "👥 Sosyal",
  home: "🏠 Ev İşleri",
  mindful: "🧠 Zihinsel",
  nature: "🌿 Doğa",
};

// Ardışık aynı önerinin gelmesini engellemek için
let lastIndex: number = -1;

export function getRandomSuggestion(category?: Suggestion["category"]): string {
  const filtered = category
    ? suggestions.filter((s) => s.category === category)
    : suggestions;

  let newIndex: number;
  do {
    newIndex = Math.floor(Math.random() * filtered.length);
  } while (newIndex === lastIndex && filtered.length > 1);

  lastIndex = newIndex;
  return filtered[newIndex].text;
}

export function getSuggestionsByCategory(
  category: Suggestion["category"]
): Suggestion[] {
  return suggestions.filter((s) => s.category === category);
}
