function getLinkItems() {
  const linkItems = document.querySelectorAll('.link-item');

  return linkItems;
}

function printNavSidebar() {
  let linkItem = '';

  const navSidebar = [
    {
      icon: 'ri-home-6-line',
      name: 'All Books',
    },
    {
      icon: 'ri-book-open-line',
      name: 'Read',
    },
    {
      icon: 'ri-book-line',
      name: 'Unread',
    },
  ];

  navSidebar.map((item, idx) => {
    linkItem += `<li class="link-item ${idx == 0 ? 'active' : ''}">
                  <div class="item-name">
                      <i class="${item.icon}"></i>
                      <h3>${item.name}</h3>
                  </div>
                  <span class="item-length">2</span>
                  </li>`;
  });

  return linkItem;
}

function getCurrentDate() {
  const dateObj = new Date().toUTCString();

  return dateObj.slice(0, 16);
}

function filterAllBook() {
  headerTitle.innerText = 'All Books';
}

function filterReadBook() {
  headerTitle.innerText = 'Read';
}

function filterUnreadBook() {
  headerTitle.innerText = 'Unread';
}

const headerTitle = document.getElementById('#title');

const navLinks = document.querySelector('.nav-links');
navLinks.innerHTML = printNavSidebar();

const collapseBtn = document.querySelector('.collapse');
collapseBtn.addEventListener('click', () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('show');
  sidebar.style.transition = 'all .4s ease';
});

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
