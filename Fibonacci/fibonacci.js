// Kullanıcıdan N değerini al
let N = parseInt(prompt("İlk N Fibonacci sayısını hesaplamak için N değerini girin:"));
// Fibonacci dizisini hesapla
function fibonacci(N) {
    let fib = [0, 1]; // İlk iki Fibonacci sayısı
    for (let i = 2; i < N; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib.slice(0, N); // İlk N Fibonacci sayısını döndür
}
// Fibonacci dizisini al ve ekrana yazdır
let fibNumbers = fibonacci(N);
console.log(`İlk ${N} Fibonacci sayisi: ${fibNumbers.join(', ')}`);
