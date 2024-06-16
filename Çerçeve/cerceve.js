let rows = 7;    
let columns = 7;
for (let i = 0; i < rows; i++) {
    let line = ''; // Her satır için boş bir string başlatılır
    // İç döngü, her sütun için çalışır (0'dan columns-1'e kadar)
    for (let j = 0; j < columns; j++) {
        // İlk ve son satır veya ilk ve son sütun ise yıldız ekler
        if (i === 0 || i === rows - 1 || j === 0 || j === columns - 1) {
            line += '* ';
        } else {
            line += '  '; // Diğer durumlarda boşluk ekler
        }
    }
    console.log(line);
}
