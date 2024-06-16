for (let i = 0; i < 8; i++) {
    let line = ''; // Her satır için boş bir string başlatılır
    // 0'dan 8'e kadar olan sayılar için iç döngü (her satırda 9 yıldız için çalışır)
    for (let j = 0; j < 9; j++) {
        line += '* '; // Yıldız ve bir boşluk eklenir
    }
    console.log(' ' + line);
}
