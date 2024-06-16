function createPyramid(char, height) {
  // Dış döngü, her satır için çalışır (0'dan height-1'e kadar)
  for (let i = 0; i < height; i++) {
    let line = ""; // Her satır için boş bir string başlatılır
    
    // Boşlukları ekle (piramit şekli için)
    for (let j = 0; j < height - i - 1; j++) {
      line += " "; // Her boşluk eklenir
    }
    
    // Artan karakterleri ekle
    for (let k = 0; k <= i; k++) {
      line += String.fromCharCode(char.charCodeAt(0) + k); // Karakter eklenir
    }
    
    // Azalan karakterleri ekle
    for (let k = i - 1; k >= 0; k--) {
      line += String.fromCharCode(char.charCodeAt(0) + k); // Karakter eklenir
    }
    
    console.log(line); // Satır ekrana yazdırılır
  }
}

createPyramid("A", 5);
