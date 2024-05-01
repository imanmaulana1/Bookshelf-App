function printNavSidebar() {
  const datas = localStorage.getItem('values')
    ? JSON.parse(localStorage.getItem('values'))
    : [];

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
      length: datas.filter((data) => data.isComplete == 1).length,
    },
    {
      icon: 'ri-book-line',
      name: 'Unread',
      length: datas.filter((data) => data.isComplete == 0).length,
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

function hideSidebar() {
  return () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
    sidebar.style.transition = 'all .4s ease';
  };
}

function showModal(idModal) {
  return document.getElementById(`${idModal}`).classList.add('show');
}

function closeModal() {
  const addModal = document.getElementById('add-modal');
  addModal.classList.remove('show');

  const updateModal = document.getElementById('update-modal');
  updateModal.classList.remove('show');
}

// FILTER SHELF FEATURE

function filterAllBook() {
  headerTitle.innerText = 'All Books';

  const datas = localStorage.getItem('values')
    ? JSON.parse(localStorage.getItem('values'))
    : [];

  showData(datas);
}

function filterReadBook() {
  headerTitle.innerText = 'Read';

  const datas = localStorage.getItem('values')
    ? JSON.parse(localStorage.getItem('values'))
    : [];

  const readBook = datas.filter((data) => data.isComplete == 1);

  showData(readBook);
}

function filterUnreadBook() {
  headerTitle.innerText = 'Unread';

  const datas = localStorage.getItem('values')
    ? JSON.parse(localStorage.getItem('values'))
    : [];

  const unReadBook = datas.filter((data) => data.isComplete == 0);

  showData(unReadBook);
}

// CRUD FEATURE

function showData(values) {
  let value = '';

  values.map((data) => {
    value += `
        <div class="card">
          <header class="card-header">
            <div class="card-title">
              <h2>${data.title}</h2>
              <h3>${data.author}</h3>
            </div>
            <span class="card-shelf ${
              data.isComplete == 1 ? 'success' : 'danger'
            }">${data.isComplete == 1 ? 'Read' : 'Unread'}
            </span>
          </header>
          <section class="card-desc">
            <p>${data.note}</p>
          </section>
          <footer class="card-footer">
            <p class="card-time">${data.time}</p>
            <div class="card-cta">
              <button class="btn btn-delete"><i class="ri-delete-bin-line"></i></button>
              <button class="btn btn--update" onclick="showModal('update-modal')"><i class="ri-edit-line"></i></button>
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

function addData(e) {
  let today = new Date();

  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  let yyyy = today.getFullYear();

  dd = dd < 10 ? `0${dd}` : dd;

  mm = mm < 10 ? `0${mm}` : mm;

  today = `${dd}-${mm}-${yyyy}`;

  const payload = {
    title: e.target['title'].value,
    author: e.target['author'].value,
    year: parseInt(e.target['year'].value),
    note: e.target['note'].value,
    isComplete: e.target['check'].checked,
    time: today,
  };

  console.log(payload);

  const datas = localStorage.getItem('values')
    ? JSON.parse(localStorage.getItem('values'))
    : [];

  datas.push(payload);

  localStorage.setItem('values', JSON.stringify(datas));
}

// =============================================== //

const headerTitle = document.getElementById('#title');

const navLinks = document.querySelector('.nav-links');
navLinks.innerHTML = printNavSidebar();

const collapseBtn = document.querySelector('.collapse');
collapseBtn.addEventListener('click', hideSidebar());

const currentDate = document.getElementById('#today');
currentDate.innerText = getCurrentDate();

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

    switch (idx) {
      case 0:
        filterAllBook();
        break;
      case 1:
        filterReadBook();
        break;
      case 2:
        filterUnreadBook();
        break;
      default:
        break;
    }
  });
});

const btnAddBooks = document.querySelectorAll('.add');
btnAddBooks.forEach((btnAddBook) => {
  btnAddBook.addEventListener('click', () => {
    showModal('add-modal');
  });
});

const btnEditBooks = document.querySelectorAll('.btn--update');
btnEditBooks.forEach((btnEditBook) => {
  btnEditBook.addEventListener('click', () => {
    showModal('update-modal');
  });
});

const btnCancelBooks = document.querySelectorAll('.btn--cancel');
btnCancelBooks.forEach((btnCancelBook) => {
  btnCancelBook.addEventListener('click', () => {
    closeModal();
  });
});

// Submit save book
const formSaveBook = document.getElementById('form-save-book');
formSaveBook.addEventListener('submit', addData);

// Show data when page is load
const datas = localStorage.getItem('values')
  ? JSON.parse(localStorage.getItem('values'))
  : [];

document.onload = showData(datas);
