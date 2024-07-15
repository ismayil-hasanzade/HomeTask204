const form = document.querySelector("form");
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const number = document.getElementById("number");
const mail = document.getElementById("email");
const table = document.querySelector("table");
const savebutton = document.querySelector(".savebutton");
const { Mask, MaskInput } = Maska;
const mediaQuery = window.matchMedia("(min-width: 468px)");
let url = "http://localhost:3000/posts";
let isEditing = false;
let editId = null;


new MaskInput("[data-maska]"); // masked input için

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: name.value.trim(),
    surname: surname.value.trim(),
    number: number.value,
    mail: mail.value.trim(),
  };

  fetch(isEditing ? `${url}/${editId}` : url, {
    method: isEditing ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      form.reset();
      isEditing = false;
      editId = null;
      getData();
    })
    .catch((error) => console.error(error));
});

async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    if (!mediaQuery.matches) {
      console.log("Test");
    } else {
      console.log("non");
    }
    const data = await response.json();
    table.innerHTML = "";
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const nametd = document.createElement("td");
    const surnametd = document.createElement("td");
    const numbertd = document.createElement("td");
    const mailtd = document.createElement("td");
    const ishlemtd = document.createElement("td");
    const tbody = document.createElement("tbody");
    nametd.innerText = "Adı";
    surnametd.innerText = "Soyadı";
    numbertd.innerText = "Telefon";
    mailtd.innerText = "Mail";
    ishlemtd.innerText = "İşlemler";
    tr.append(nametd, surnametd, numbertd, mailtd, ishlemtd);
    thead.append(tr);

    data.forEach((element) => {
      const tr = document.createElement("tr");
      const name = document.createElement("td");
      const surname = document.createElement("td");
      const number = document.createElement("td");
      const mail = document.createElement("td");
      const ishlem = document.createElement("td");
      name.innerText = element.name;
      surname.innerText = element.surname;
      number.innerText = element.number;
      mail.innerText = element.mail;
      const deletebtn = document.createElement("button");
      const updatebtn = document.createElement("button");
      deletebtn.setAttribute("id", "deletebtn");
      updatebtn.setAttribute("id", "updatebtn");

      ishlem.style.cssText = `
        display:flex;
        justify-content: center;
  justify-content: space-around;
  gap:3px;
      `;
      deletebtn.style.cssText = `
        background-color:red;
        width:50%;
        
        color:white;
        
        border-radius:10px;
        margin-right:3px 5px;
        
      `;
      updatebtn.style.cssText = `
        background-color:green;
        width:50%;
        color:white;
        
        border-radius:10px;
        
        
      `;
      deletebtn.innerText = "Sil";
      updatebtn.innerText = "Düzenle";
      ishlem.append(deletebtn, updatebtn);
      tr.append(name, surname, number, mail, ishlem);
      tbody.append(tr);

      deletebtn.addEventListener("click", () => {
        if (confirm("Silme Ishlemine eminmisiniz ? ")) {
          // Save it!
          fetch(`${url}/${element.id}`, {
            method: "DELETE",
          })
            .then((res) => res.text())
            .then((res) => {
              console.log(res);
              getData();
            })
            .catch((error) => console.error(error));
          console.log("Veri tabanından veri silindi");
        } else {
          // Do nothing!
          console.log("Silme ishlemi gercekleshmedi");
        }
      });

      updatebtn.addEventListener("click", () => {
        document.getElementById("name").value = element.name;
        document.getElementById("surname").value = element.surname;
        document.getElementById("number").value = element.number;
        document.getElementById("email").value = element.mail;
        isEditing = true;
        editId = element.id;
        const cancelbtn = document.querySelector(".cancelbutton");
        cancelbtn.style.display = "block";
        savebutton.innerText = "Guncelle";
        savebutton.style.cssText = `
        background-color:orange;
        color:black;
        `;
        cancelbtn.addEventListener("click", () => {
          document.getElementById("name").value = "";
          document.getElementById("surname").value = "";
          document.getElementById("number").value = "";
          document.getElementById("email").value = "";
          cancelbtn.style.display = "none";
          savebutton.innerText = "Kaydet";
          savebutton.style.cssText = `
          background-color:green;
          color:white;
          `;
        });
      });
    });

    table.appendChild(thead);

    table.appendChild(tbody);
  } catch (error) {
    console.error(error.message);
  }
}

getData();
