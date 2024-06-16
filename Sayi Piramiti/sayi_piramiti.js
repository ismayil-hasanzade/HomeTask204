let rows = 4; // Piramidin yüksekliğini belirler
let number = 1; // Başlangıç sayısını belirler

// Dış döngü, her satır için çalışır (0'dan 3'e kadar, toplam 4 satır)
for (let i = 0; i < rows; i++) {
  let line = ""; // Her satır için boş bir string başlatılır
  // Önceki satırlara göre gereken boşluk sayısını belirler ve ekler
  for (let j = 0; j < rows - i - 1; j++) {
    line += " "; // Her boşluk eklenir
  }
  // Satırdaki sayıları ekler
  for (let k = 0; k <= i; k++) {
    line += number + " "; // Sayı ve bir boşluk eklenir
    number++; // Sayı bir artırılır
  }

  console.log(line);
}
