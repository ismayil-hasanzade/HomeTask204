const table = document.createElement("table");
table.className = "table";
const thead = document.createElement("thead");
const root = document.getElementById("root");
const tr = document.createElement("tr");
const tbody = document.createElement("tbody");

let th = document.createElement("th");
th.innerText = "#";
tr.append(th);

fetch(`https://randomuser.me/api/?results=55`)
  .then((res) => res.json())
  .then((data) => {
    const headersSet = new Set();

    const combineObjectValues = (obj) => {
      let combinedValues = "";
      for (const key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          combinedValues += combineObjectValues(obj[key]) + ", ";
        } else {
          combinedValues += obj[key] + ", ";
        }
      }
      return combinedValues.slice(0, -2); // Son virgül ve boşluğu kaldır
    };

    data.results.forEach((element, index) => {
      const bodytr = document.createElement("tr");
      const indexTd = document.createElement("td");
      indexTd.innerText = index + 1;
      bodytr.append(indexTd);

      for (const property in element) {
        if (!headersSet.has(property)) {
          const th = document.createElement("th");
          th.innerText = property;
          tr.append(th);
          headersSet.add(property);
          console.log(property);
        }

        const bodytd = document.createElement("td");
        if (
          property === "picture" &&
          typeof element[property] === "object" &&
          element[property] !== null
        ) {
          const img = document.createElement("img");
          img.src = element[property].large || element[property].thumbnail; // Tercihen büyük resim kullan, yoksa küçük resmi kullan
          bodytd.appendChild(img);
        } else if (
          typeof element[property] === "object" &&
          element[property] !== null
        ) {
          const combinedValues = combineObjectValues(element[property]);
          bodytd.innerText = combinedValues;
        } else {
          bodytd.innerText = element[property];
        }
        bodytr.append(bodytd);
      }
      tbody.append(bodytr);
    });
    thead.append(tr);
    table.append(thead);
    table.append(tbody);
    root.appendChild(table);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
