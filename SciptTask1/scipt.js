let value = parseInt(prompt("Sayı daxil edin"));
const price = 5;
let discount = 0;
let lastdiscount = 0;
let lastprice = 0;

if (!isNaN(value)) {
  if (value <= 100 && value > 0) {
    if (value < 20) {
      discount = 5;
    } else if (value <= 50) {
      discount = 10;
    } else if (value <= 100) {
      discount = 15;
    }
    lastdiscount = (price * discount * value) / 100;
    lastprice = price * value - lastdiscount;

    console.log(
      `
        Siparish adedi : ${value},
        Birim fiyati : ${price},
        Toplam tutar : ${price * value},
        Indirim orani : ${discount}%,
        Indirim tutari : ${lastdiscount},
        Odenecek tutar : ${lastprice}
        `
    );
  } else if (value > 100) {
    discount = 25;
    lastdiscount = (price * discount * value) / 100;
    lastprice = price * value - lastdiscount;

    console.log(
      `
        Siparish adedi : ${value},
        Birim fiyati : ${price},
        Toplam tutar : ${price * value},
        Indirim orani : ${discount}%,
        Indirim tutari : ${lastdiscount},
        Odenecek tutar : ${lastprice}
        `
    );
  } else {
    alert("Düzgün rəqəm daxil edin");
  }
} else {
  alert("Rəqəm daxil edin");
}
