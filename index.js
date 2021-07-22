const add = document.getElementById("add");

//UpdateStorage
const updateLocalStorage = () => {
  const store = document.querySelectorAll("textarea");
  const notes = [];
  store.forEach((note) => {
    return notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

//Add a Note
const addnote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  let now = new Date();
  const data = `
             
      <div class="card bg-dark text-white" style="width: 18rem;">
      <div class="card-body">
        <p class="time" va>${now.getDate()}-${
    now.getMonth() + 1
  }-${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}</p>
        <div class="content ${text ? "" : "hidden"}"></div>
        
        <textarea class="textarea text-white  ${
          text ? "hidden" : ""
        } " placeholder="Take a note..."></textarea>
        <div class="operation d-grid gap-2 d-md-flex justify-content-md-end mt-1">
          <button class="edit border-0 btn-primary me-md-2 rounded-circle" title="Edit"><i class="far fa-edit"></i></button>
          
          <button class="delete border-0 btn-primary rounded-circle"  title="Delete"><i class="far fa-trash-alt"></i></button>
          
        </div>
      </div>
      </div>`;
  note.insertAdjacentHTML("afterbegin", data);

  const edit = note.querySelector(".edit");
  const deletebutton = note.querySelector(".delete");
  const content = note.querySelector(".content");
  const textarea = note.querySelector("textarea");

  //delete
  deletebutton.addEventListener("click", () => {
    note.remove();

    updateLocalStorage();
  });
  //toggle using edit button
  textarea.value = text;
  content.innerHTML = text;
  edit.addEventListener("click", () => {
    content.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  textarea.addEventListener("change", (event) => {
    const val = event.target.value;
    content.innerHTML = val;

    updateLocalStorage();
  });

  document.getElementById("allnotes").appendChild(note);
};

//getting databack
const data = JSON.parse(localStorage.getItem("notes"));

if (data) {
  data.forEach((note) => addnote(note));
}
add.addEventListener("click", () => addnote());

//Search
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("note");
  Array.from(noteCards).forEach(function (element) {
    let cards = element.getElementsByClassName("content")[0].innerText;
    if (cards.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
