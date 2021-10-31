const BREAKPOINT    = 767.98;
const drawersToggle = document.getElementsByClassName('btn-drawer-toggle');

for (let toggle of drawersToggle) {
    toggle.addEventListener('click', handleDrawerToggle);
}

window.addEventListener('resize', () => {
    let width = document.body.clientWidth;

    if (width >= BREAKPOINT) {
        for (let toggle of drawersToggle) {
            closeDrawer(toggle);
        }
    }
});

function openDrawer(toggle) {
    if (!toggle.classList.contains('open')) {
        let icon           = toggle.querySelector('i');
        let drawerSelector = toggle.getAttribute('data-toggle');
        let drawer         = document.querySelector(drawerSelector);
        let header         = document.getElementById('header');

        toggle.classList.add('open');
        drawer.classList.remove('hidden');
        drawer.classList.add('slide-lt-rt');
        icon.classList.add('fa-times');
        icon.classList.remove('fa-bars');
        header.classList.add('navbar-dark');
    }

}

function closeDrawer(toggle) {
    if (toggle.classList.contains('open')) {
        let icon           = toggle.querySelector('i');
        let drawerSelector = toggle.getAttribute('data-toggle');
        let drawer         = document.querySelector(drawerSelector);
        let header         = document.getElementById('header');

        toggle.classList.remove('open');
        drawer.classList.add('hidden');
        drawer.classList.remove('slide-lt-rt');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        header.classList.remove('navbar-dark');
    }
}

function handleDrawerToggle(e) {
    let toggle         = e.currentTarget;

    if (toggle.classList.contains('open')) {
        closeDrawer(toggle);
    } else {
        openDrawer(toggle);
    }
}