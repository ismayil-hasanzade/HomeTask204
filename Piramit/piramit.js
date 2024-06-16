let rows = 5; // Piramidin yüksekliğini belirler
// Dış döngü, her satır için çalışır (0'dan 4'e kadar, toplam 5 satır)
for (let i = 0; i < rows; i++) {
  let line = ""; // Her satır için boş bir string başlatılır
  // Önceki satırlara göre gereken boşluk sayısını belirler ve ekler
  for (let j = 0; j < rows - i - 1; j++) {
    line += " "; // Her boşluk eklenir
  }
  // Satırdaki yıldızları ekler
  for (let k = 0; k < 2 * i + 1; k++) {
    line += "*"; // Yıldız eklenir
  }
  
  console.log(line); 
}
