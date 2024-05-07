// Function to read data
function showData(datas) {
  let value = '';

  datas.map((data) => {
    value += `
            <div class="card">
              <header class="card-header">
                <div class="card-title">
                  <h2>${data.title}</h2>
                  <h3>${data.author}</h3>
                </div>
                <span class="card-shelf ${
                  data.isComplete == 1 ? 'success' : 'danger'
                }" onclick="handleEdit(${data.id})">${
      data.isComplete == 1 ? 'Read' : 'Unread'
    }
                </span>
              </header>
              <section class="card-desc">
                <p>${data.note}</p>
              </section>
              <footer class="card-footer">
                <p class="card-time">${data.time}</p>
                <div class="card-cta">
                  <button class="btn btn--delete" onclick="handleDelete(${
                    data.id
                  })"><i class="ri-delete-bin-line"></i></button>
                  <button class="btn btn--update" onclick="handleUpdate(${
                    data.id
                  })"><i class="ri-edit-line"></i></button>
                </div>
              </footer>
            </div>
        `;

    return value;
  });

  let cardAddBook = `
                        <div class="card add-book">
                          <button class="add" onclick="showModal('add-modal')"><i class="ri-add-line"></i></button>
                        </div>
                        `;

  const cardWrapper = document.querySelector('.card-wrapper');
  cardWrapper.innerHTML =
    datas.length > 0 ? `${value} ${cardAddBook}` : cardAddBook;
}

// Function to add new data
function handleSubmit() {
  return (e) => {
    e.preventDefault();

    const idBook = new Date();
    const stringDate = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Jakarta',
    }).format(idBook);

    const payload = {
      id: idBook.getTime(),
      title: e.target['title'].value,
      author: e.target['author'].value,
      year: parseInt(e.target['year'].value),
      note: e.target['note'].value,
      isComplete: e.target['check'].checked,
      time: stringDate,
    };

    showToastNotification('Data has been successfully added.');

    datas.push(payload);
    localStorage.setItem('values', JSON.stringify(datas));
  };
}

// Function to edit status (read/unread)
function handleEdit(id) {
  showModal('edit-modal');

  const btnEdit = document.getElementById('btn-edit');
  btnEdit.addEventListener('click', () => {
    editData(id);
  });
}

function editData(id) {
  const index = datas.map((data) => data.id).indexOf(id);
  datas[index].isComplete = datas[index].isComplete == true ? false : true;

  localStorage.setItem('values', JSON.stringify(datas));
  showToastNotification(
    `Data successfully moved to ${
      datas[index].isComplete == true ? 'Read Shelf' : 'Unread Shelf'
    }`
  );
}

// Function to update data
function handleUpdate(id) {
  showModal('update-modal');

  const title = document.getElementById('title-update');
  const author = document.getElementById('author-update');
  const year = document.getElementById('year-update');
  const note = document.getElementById('note-update');
  const check = document.getElementById('check-update');

  datas
    .filter((data) => data.id == id)
    .map((data) => {
      title.value = data.title;
      author.value = data.author;
      year.value = data.year;
      note.value = data.note;
      check.checked = data.isComplete;
    });

  const btnUpdate = document.getElementById('form-update-book');
  btnUpdate.addEventListener('submit', updateData(id));
}

function updateData(id) {
  return (e) => {
    e.preventDefault();

    const index = datas.map((data) => data.id).indexOf(id);

    const datetime = new Date();
    const stringDate = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Jakarta',
    }).format(datetime);

    console.log(stringDate);

    const payload = {
      id: datas[index].id,
      title: e.target['title'].value,
      author: e.target['author'].value,
      year: parseInt(e.target['year'].value),
      note: e.target['note'].value,
      isComplete: e.target['check'].checked,
      time: stringDate,
    };

    datas[index] = payload;
    localStorage.setItem('values', JSON.stringify(datas));

    showToastNotification('Data has been successfully update.');
  };
}

// Function to delete data
function handleDelete(id) {
  showModal('delete-modal');

  const btnDelete = document.getElementById('btn-delete');
  btnDelete.addEventListener('click', () => {
    deleteData(id);
  });
}

function deleteData(id) {
  const result = datas.filter((item) => item.id !== id);
  localStorage.setItem('values', JSON.stringify(result));

  showToastNotification('Data successfully deleted');
}

// ================================================ \\

function showModal(idModal) {
  return document.getElementById(`${idModal}`).classList.add('show');
}

function closeModal() {
  const addModal = document.getElementById('add-modal');
  addModal.classList.remove('show');

  const updateModal = document.getElementById('update-modal');
  updateModal.classList.remove('show');

  const editModal = document.getElementById('edit-modal');
  editModal.classList.remove('show');

  const deleteModal = document.getElementById('delete-modal');
  deleteModal.classList.remove('show');
}

function printNavSidebar() {
  let linkItem = '';

  const navSidebar = [
    {
      icon: 'ri-home-6-line',
      name: 'All Books',
      length: datas.length,
    },
    {
      icon: 'ri-book-open-line',
      name: 'Read',
      length: datas.filter((item) => item.isComplete == true).length,
    },
    {
      icon: 'ri-book-line',
      name: 'Unread',
      length: datas.filter((item) => item.isComplete != true).length,
    },
  ];

  navSidebar.map((item, idx) => {
    linkItem += `<li class="link-item ${idx == 0 ? 'active' : ''}">
                    <div class="item-name">
                        <i class="${item.icon}"></i>
                        <h3>${item.name}</h3>
                    </div>
                    <span class="item-length">${item.length}</span>
                    </li>`;
  });

  return linkItem;
}

function getLinkItems() {
  const linkItems = document.querySelectorAll('.link-item');

  return linkItems;
}

function getCurrentDate() {
  const dateObj = new Date().toUTCString();

  return dateObj.slice(0, 16);
}

function getToday() {
  let today = new Date();

  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  let yyyy = today.getFullYear();

  dd = dd < 10 ? `0${dd}` : dd;

  mm = mm < 10 ? `0${mm}` : mm;

  today = `${dd}-${mm}-${yyyy}`;

  return today;
}

function hideSidebar() {
  return () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
    sidebar.style.transition = 'all .4s ease';
  };
}

// =============================================== //

// index link nav
let index = 0;

// Get data from localstorage if none return empty array
const datas = localStorage.getItem('values')
  ? JSON.parse(localStorage.getItem('values'))
  : [];

// Print current date HTML
const getCurrentDate = new Date().toUTCString().slice(0, 16);
const currentDate = document.getElementById('#today');
currentDate.innerText = getCurrentDate;

// Print navigation sidebar HTML
const navLinks = document.querySelector('.nav-links');
navLinks.innerHTML = printNavSidebar();

// Set link active on click
const linkItems = getLinkItems();
linkItems.forEach((item, idx) => {
  item.addEventListener('click', function () {
    const items = getLinkItems();
    items.forEach((item) => {
      item.classList.remove('active');
    });

    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('show');

    this.classList.add('active');

    const headerTitle = document.getElementById('#title');

    switch (idx) {
      case 0:
        index = 0;
        headerTitle.innerText = 'All Books';
        showData(datas);
        break;
      case 1:
        index = 1;
        headerTitle.innerText = 'Read';
        const readBook = datas.filter((item) => item.isComplete == true);
        showData(readBook);
        break;
      case 2:
        index = 2;
        headerTitle.innerText = 'Unread';
        const unReadBook = datas.filter((item) => item.isComplete != true);
        showData(unReadBook);
        break;
      default:
        break;
    }
  });
});

// Hide Sidebar (Tablet Screen)
const collapseBtn = document.querySelector('.collapse');
collapseBtn.addEventListener('click', hideSidebar());

// Show modal add book
const btnAddBooks = document.querySelectorAll('.add');
btnAddBooks.forEach((btnAddBook) => {
  btnAddBook.addEventListener('click', () => {
    showModal('add-modal');
  });
});

// Close All Modal
const btnCancelBooks = document.querySelectorAll('.btn--cancel');
btnCancelBooks.forEach((btnCancelBook) => {
  btnCancelBook.addEventListener('click', () => {
    closeModal();
  });
});

// Submit form add data
const myForm = document.getElementById('form-save-book');
myForm.addEventListener('submit', handleSubmit());

// Submit form search data
const searchForm = document.getElementById('form-search-book');
searchForm.addEventListener('submit', handleSearchData());

// Darkmode
const btnDarkMode = document.querySelectorAll('.darkmode');
btnDarkMode.forEach((item) => {
  item.addEventListener('click', function () {
    this.classList.toggle('ri-sun-line');
    if (!this.classList.contains('ri-sun-line')) {
      this.classList.add('ri-moon-line');

      document.documentElement.style.setProperty('--primary-clr', '#fafafa');
      document.documentElement.style.setProperty('--secondary-clr', '#ddd');
      document.documentElement.style.setProperty('--text-clr', '#292929');
      document.documentElement.style.setProperty(
        '--text-accent-clr',
        '#737373'
      );
      document.documentElement.style.setProperty('--card-clr', '#ebebeb');
      document.documentElement.style.setProperty('--hover-clr', '#b4b4b4');
    } else {
      document.documentElement.style.setProperty('--primary-clr', '#141414');
      document.documentElement.style.setProperty('--secondary-clr', '#1f1f1f');
      document.documentElement.style.setProperty('--text-clr', '#ffffff');
      document.documentElement.style.setProperty(
        '--text-accent-clr',
        '#ababab'
      );
      document.documentElement.style.setProperty('--card-clr', '#333333');
      document.documentElement.style.setProperty('--hover-clr', '#555555');
    }
  });
});

// Load all data when page is loaded
document.onload = showData(datas);
