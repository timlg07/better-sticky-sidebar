// only to switch between different sticky behaviours for the demo.

/**
 * @param {Element} elem
 */
function regListener(elem) {
    elem.addEventListener('click', event => {
        const classPrefix = 'sticky-'
        const sidebar = document.querySelector('.sidebar')

        removePrefixedClasses(sidebar, classPrefix)
        sidebar.classList.add(classPrefix + elem.dataset.stickyBehaviour)
    })
}

/**
 * @param {Element} elem
 * @param {string} prefix
 */
function removePrefixedClasses(elem, prefix) {
    elem.classList.forEach(c => {
        if (c.startsWith(prefix)) {
            elem.classList.remove(c)
        }
    })
}

document.querySelectorAll('[data-sticky-behaviour]').forEach(regListener)