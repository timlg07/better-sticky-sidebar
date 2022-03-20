function betterStickySidebar(sidebarContainerSelector, sidebarSelector, stickyHeaderSelector) {
    let prevScrollY = window.scrollY;
    let currentSidebarTop = 0;

    const getStickyHeaderHeight = (selector => {
        const stickyHeaderElem = document.querySelector(selector);
        return () => stickyHeaderElem?.offsetHeight || 0;
    })(stickyHeaderSelector);

    const sidebar = document.querySelector(sidebarSelector);
    const sidebarContainer = document.querySelector(sidebarContainerSelector);
    if (sidebar == null || sidebarContainer == null) throw new Error('invalid selector');

    const updateSidebarPosition = newTop => {
        currentSidebarTop = newTop
        sidebar.style.setProperty('--push-down', currentSidebarTop + 'px');
    }

    window.addEventListener('scroll', e => {
        if (window.scrollY < prevScrollY) {
            scrollUpwards();
        } else {
            scrollDownwards();
        }
        prevScrollY = window.scrollY;
    });

    function scrollUpwards() {
        const delta = sidebar.getBoundingClientRect().top - getStickyHeaderHeight();
        let abovesidebar = delta > 0;

        // We are scrolling above the element => reduce the top space to keep it sticked to the top
        if (abovesidebar) {
            const newTop = Math.max(currentSidebarTop - delta, 0);
            updateSidebarPosition(newTop);
        }
    }

    function scrollDownwards() {
        let browserBottom = window.innerHeight;
        let sidebarBottom = sidebar.getBoundingClientRect().top + sidebar.offsetHeight;
        const delta = browserBottom - sidebarBottom;
        let belowsidebar = delta > 0;

        // We are scrolling below the element & it would scroll out of the viewport. 
        // => increase top space to keep it sticked to the bottom
        if (belowsidebar) {
            const availableSidebarTopSpace = sidebarContainer.getBoundingClientRect().height - sidebar.getBoundingClientRect().height;
            const newTop = Math.min(currentSidebarTop + delta, availableSidebarTopSpace);
            updateSidebarPosition(newTop);
        }
    }
}
