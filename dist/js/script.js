const navLinks = document.querySelector('.nav-links');
let linkItem = '';

const navSidebar = [
  {
    icon: 'ri-home-6-line',
    name: 'All Books',
  },
  {
    icon: 'ri-book-open-line',
    name: 'Selesai Dibaca',
  },
  {
    icon: 'ri-book-line',
    name: 'Belum Dibaca',
  },
];

navSidebar.map((item) => {
  linkItem += `<li class="link-item">
        <div class="item-name">
            <i class="${item.icon}"></i>
            <h3>${item.name}</h3>
        </div>
        <span class="item-length">2</span>
    </li>`;
});

navLinks.innerHTML = linkItem;
