// Dış döngü, her satır için çalışır ve i değeri satır sayısını belirtir (1'den 9'a kadar)
for (let i = 1; i <= 9; i++) {
    let line = ""; // Her satır için boş bir string başlatılır
    // İç döngü, her satırda kaç tane yıldız olacağını belirler
    for (let j = 1; j <= i; j++) {
        line += "* "; // Yıldız ve bir boşluk eklenir
    }
    console.log(line); 
}
