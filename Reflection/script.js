
// Dosya yükleme input elementine bir event listener ekleyin
document
  .getElementById("fileInput")
  .addEventListener("change", handleFileUpload);
  
// Dosya yüklendiğinde çağrılan fonksiyon
function handleFileUpload(event) {
  const file = event.target.files[0]; // Yüklenen dosyayı al
  if (file) {
    const reader = new FileReader(); // FileReader nesnesi oluştur
    reader.onload = function (e) {
      const content = e.target.result; // Dosya içeriğini al
      processFileContent(content); // İçeriği işle
    };
    reader.readAsText(file); // Dosyayı metin olarak oku
  }
}

// Dosya içeriğini işleyen fonksiyon
function processFileContent(content) {
  const lines = content.split("\n"); // İçeriği satırlara böl
  const people = lines.map((line) => {
    const [firstName, lastName, age] = line.split(",").map(item => item.trim()); // Her satırı virgülle ayır ve boşlukları temizle
    console.log(`Parsed Data - FirstName: ${firstName}, LastName: ${lastName}, Age: ${age}`); // Debug için logla
    return new Person(firstName, lastName, parseInt(age)); // Person nesnesi oluştur
  });
  displayDataInTable(people); // Verileri tabloya göster
  document.getElementById("saveButton").style.display = "block"; // Kaydet butonunu göster
}

// Person sınıfı
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  static createFromReflection(data) {
    const person = new Person();
    Object.keys(data).forEach(key => {
      Reflect.set(person, key, data[key]);
    });
    return person;
  }
}

// Verileri tabloya gösteren fonksiyon
function displayDataInTable(people) {
  const tableBody = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Mevcut verileri temizle

  people.forEach((person) => {
    const row = document.createElement("tr"); // Yeni bir satır oluştur
    for (const prop in person) {
      const cell = document.createElement("td"); // Yeni bir hücre oluştur
      cell.textContent = person[prop]; // Hücreye veri ekle
      row.appendChild(cell); // Satıra hücreyi ekle
    }
    tableBody.appendChild(row); // Tabloya satırı ekle
  });
}

// Kaydet butonuna event listener ekleyin
document.getElementById("saveButton").addEventListener("click", saveData);

// Verileri JSON Server'a kaydeden fonksiyon
function saveData() {
  const tableBody = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  const rows = Array.from(tableBody.getElementsByTagName("tr")); // Tablodaki satırları al

  const people = rows.map((row) => {
    const cells = row.getElementsByTagName("td"); // Her satırdaki hücreleri al
    const data = {
      firstName: cells[0].textContent,
      lastName: cells[1].textContent,
      age: parseInt(cells[2].textContent)
    };
    return Person.createFromReflection(data); // Reflection ile yeni Person nesnesi oluştur
  });

  fetch("http://localhost:3000/posts", {
    method: "POST", // POST isteği gönder
    headers: {
      "Content-Type": "application/json", // JSON olarak gönder
    },
    body: JSON.stringify(people), // Verileri JSON olarak ekle
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data); // Başarılı olursa konsola yaz
    })
    .catch((error) => {
      console.error("Error:", error); // Hata olursa konsola yaz
    });
}
