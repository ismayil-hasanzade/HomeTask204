class Person {
  constructor(name, address, email, phone, number, birthdate) {
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.number = number;
    this.birthdate = birthdate;
  }

  getAge() {
    const birthDateTimestamp = new Date(this.birthdate).getTime();
    const today = new Date().getTime();
    return parseInt((today - birthDateTimestamp) / (365 * 86_000_000));
  }
}

class User extends Person {
  constructor(name, address, email, phone, number, birthdate, company, job) {
    super(name, address, email, phone, number, birthdate);
    this.company = company;
    this.job = job;
  }
  isRetiared() {
    return this.getAge() > 65;
  }
}

const url = "http://localhost:3000/users";

let users = [];
let columns = [
  "name",
  "address",
  "email",
  "phone_number",
  "job",
  "company",
  "age",
  "retired",
];
let currentPage = 1;
let pageCount = 0;
let searchQuery = null;
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");
const searchInput = document.getElementById("search-input");
(async () => {
  let fetchRes = await fetch("http://localhost:3000/users");
  let data = await fetchRes.json();
  data.map((item) => {
    const user = new User(
      item.name,
      item.address,
      item.email,
      item.phone_number,
      item.number,
      item.birthdate,
      item.company,
      item.job
    );
    users.push(user);
  });
  pageCount = Math.ceil(users.length / 10);
  document.getElementById("page-count").innerText = pageCount;
  renderUsersTable();
})();
const tbody = document.getElementById("user-table-body");

function renderUsersTable() {
  tbody.innerHTML = "";
  let data = users;
  if (searchQuery) {
    data = data.filter((item) => {
      return (
        item.name.includes(searchQuery) || item.email.includes(searchQuery)
      );
    });
  }
  pageCount = Math.ceil(data.length / 10);
  document.getElementById("page-count").innerText = pageCount;
  if (pageCount <= 1) {
    nextButton.style.visibility = "hidden";
  } else {
    nextButton.style.visibility = "visible";
  }
  data.slice(10 * (currentPage - 1), 10 * currentPage).map((item) => {
    const tr = document.createElement("tr");
    const rowData = [
      item.name,
      item.address,
      item.email,
      item.phone,
      item.job,
      item.company,
      item.getAge(),
      item.isRetiared() ? "Yes" : "No",
    ];
    columns.map((columItem, columnIndex) => {
      const column = document.createElement("td");
      column.innerText = rowData[columnIndex];
      tr.append(column);
    });
    tbody.appendChild(tr);
  });
}

searchInput.addEventListener("keyup", () => {
  searchQuery = searchInput.value;
  renderUsersTable();
});

nextButton.addEventListener("click", () => {
  if (currentPage >= pageCount) {
    return;
  }
  currentPage++;
  if (currentPage > 1) {
    previousButton.style.visibility = "visible";
  }
  document.getElementById("current-page").innerText = currentPage;
  renderUsersTable();
  if (currentPage == pageCount) {
    nextButton.style.visibility = "hidden";
  }
});

previousButton.addEventListener("click", () => {
  if (currentPage == 1) {
    return;
  }
  currentPage--;
  if (currentPage < pageCount) {
    nextButton.style.visibility = "visible";
  }
  document.getElementById("current-page").innerText = currentPage;
  renderUsersTable();
  if (currentPage == 1) {
    previousButton.style.visibility = "hidden";
  }
});
