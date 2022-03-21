/**
 * Make your sidebar sticky!
 * The container element should take up all the space available for the sidebar in the document (width and height).
 * The sidebar element should be the (only) child element of the sidebar-container. All this script does with your
 * sidebar is assigning a pixel value to the custom CSS property `--push-down`. This value is the current offset that
 * your sidebar should have from its original position - apply it to the `top` property and use relative positioning.
 * That's all you need. If you have a sticky/fixed header on your page (which is not in the document flow due to its
 * position) you can specify it as third argument and its height will get accounted for in the calculation process.
 * 
 * @param {string} sidebarContainerSelector The CSS/query-selector for your sidebar container element
 * @param {string} sidebarSelector The CSS/query-selector for your sidebar element
 * @param {string} stickyHeaderSelector The CSS/query-selector for your sticky/fixed header
 * @param {Number} marginTop Space between the top of the browser (or bottom of the sticky header if given) and the sidebar.
 * @param {Number} marginBottom Space between the bottom of the browser viewport and the sidebar.
 * 
 * @returns {Function} A function that can be called to enforce the boundaries and therefore prohibit overflow. It should
 *                     be called when the height of the sidebar changes without scrolling being involved.
 */
function betterStickySidebar({
        sidebarContainerSelector, 
        sidebarSelector, 
        stickyHeaderSelector = null, 
        marginTop = 0, 
        marginBottom = 0
    }) 
{
    let prevScrollY = window.scrollY;
    let currentSidebarTop = 0;

    const getStickyHeaderHeight = (selector => {
        const stickyHeaderElem = document.querySelector(selector);
        return () => stickyHeaderElem?.offsetHeight || 0;
    })(stickyHeaderSelector);

    const sidebar = document.querySelector(sidebarSelector);
    const sidebarContainer = document.querySelector(sidebarContainerSelector);
    if (sidebar == null || sidebarContainer == null) throw new Error('invalid selector');

    const updateSidebarPosition = (newTop = currentSidebarTop) => {
        const lowerLimit = 0;
        const upperLimit = sidebarContainer.getBoundingClientRect().height - sidebar.getBoundingClientRect().height;
        const newClampedTop = Math.min(Math.max(lowerLimit, newTop), upperLimit);

        if (currentSidebarTop === newClampedTop) return;
        currentSidebarTop = newClampedTop;

        requestAnimationFrame(() => {
            sidebar.style.setProperty('--push-down', currentSidebarTop + 'px');
        });
    }

    const isSmallerThanViewport = () => {
        const availableViewportHeight = window.innerHeight - getStickyHeaderHeight();
        return sidebar.clientHeight <= availableViewportHeight;
    }

    /*
     * No throttling is used here, because the scroll element is only fired when the browser
     * recalculates the layout, which is exactly when we want to recalculate the sidebar position as well.
     * (more information: https://stackoverflow.com/a/44779316/6336728)
     */
    window.addEventListener('scroll', e => {
        const alwaysStickToTop = isSmallerThanViewport();
        if (window.scrollY < prevScrollY || alwaysStickToTop) {
            limitByViewportTop(alwaysStickToTop); 
        } else {
            limitByViewportBottom();
        }
        prevScrollY = window.scrollY;
    });

    function limitByViewportTop(force = false) {
        const delta = sidebar.getBoundingClientRect().top - getStickyHeaderHeight() - marginTop;
        const abovesidebar = delta > 0;

        // We are scrolling above the element => reduce the top space to keep it sticked to the top
        if (abovesidebar || force) {
            updateSidebarPosition(currentSidebarTop - delta);
        } else {
            // check bounds
            updateSidebarPosition();
        }
    }

    function limitByViewportBottom() {
        const browserBottom = window.innerHeight;
        const sidebarBottom = sidebar.getBoundingClientRect().top + sidebar.offsetHeight;
        const delta = browserBottom - sidebarBottom - marginBottom;
        const belowsidebar = delta > 0;

        // We are scrolling below the element & it would scroll out of the viewport. 
        // => increase top space to keep it sticked to the bottom
        if (belowsidebar) {
            updateSidebarPosition(currentSidebarTop + delta);
        } else {
            // check bounds
            updateSidebarPosition();
        }
    }

    return () => updateSidebarPosition();
}
