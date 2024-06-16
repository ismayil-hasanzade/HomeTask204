for (let i = 0; i < 9; i++) {
  let line = ""; // Her satır için boş bir string başlatılır
  // İç döngü, her satırda kaç tane yıldız olacağını belirler
  for (let j = 0; j < 9 - i; j++) {
    line += "* "; // Yıldız ve bir boşluk eklenir
  }

  console.log(line);
}
