window.prevScrollY = window.scrollY;
window.curr_top = 0;
window.stickyHeader = document.querySelector('header');
window.onscroll = function (e) {
    if (window.scrollY < this.prevScrollY) {
        scrollUpwards();
    } else {
        scrollDownwards();
    }
    this.prevScrollY = window.scrollY;
}

function scrollUpwards() {
    // Figure out where the new window will be after scroll
    let aside = document.querySelector('.sidebar');
    let aside_cont = document.querySelector('.sidebar-container');
    const delta = aside.getBoundingClientRect().top - window.stickyHeader.offsetHeight;
    let aboveAside = delta > 0;
    // If we are going above the element then we know we must stick it to the top
    if (aboveAside) {
        window.curr_top = Math.max(window.curr_top - delta, 0);
        aside.style.setProperty('--push-down', window.curr_top + 'px');
    }
}

function scrollDownwards() {
    // Figure out where the new window will be after scroll
    let aside = document.querySelector('.sidebar');
    let aside_cont = document.querySelector('.sidebar-container');
    let browser_bottom = window.innerHeight;
    let aside_bottom = aside.getBoundingClientRect().top + aside.offsetHeight;
    const delta = browser_bottom - aside_bottom;
    let belowAside = delta > 0;
    // If we are going below the element then we know we must stick it to the bottom.
    if (belowAside) {
        const available_top_space = aside_cont.getBoundingClientRect().height - aside.getBoundingClientRect().height;
        window.curr_top = Math.min(window.curr_top + delta, available_top_space);
        aside.style.setProperty('--push-down', window.curr_top + 'px');
    }
}