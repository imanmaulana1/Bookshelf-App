function getLinkItems() {
  const linkItems = document.querySelectorAll('.link-item');

  return linkItems;
}

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

const navLinks = document.querySelector('.nav-links');
navLinks.innerHTML = linkItem;

const linkItems = getLinkItems();
linkItems.forEach((item) => {
  item.addEventListener('click', function () {
    const items = getLinkItems();
    items.forEach((item) => {
      item.classList.remove('active');
    });

    this.classList.add('active');
  });
});

const collapseBtn = document.querySelector('.collapse');
collapseBtn.addEventListener('click', () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('show');
  sidebar.style.transition = 'all .4s ease';
});

const dateObj = new Date().toUTCString();
console.log(dateObj);

const currentDate = document.getElementById('#today');
console.log(currentDate);
currentDate.innerText = dateObj.slice(0, 16);
