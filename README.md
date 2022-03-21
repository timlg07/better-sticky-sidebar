# Better-Sticky-Sidebar

## Demo
https://tim-greller.de/git/better-sticky-sidebar/

## Usage

1. **Include the script:**
    ```html
    <script src="sidebar.js" defer></script>
    ```
 2. **Your sidebar should have a container and a content element:**
    ```html
    <aside class="sidebar-container">
        <div class="sidebar">
            ...
        </div>
    </aside>
    ```
3. **Call the script:**
    ```html
    <script>
    window.addEventListener('DOMContentLoaded', e => {
        betterStickySidebar({
            sidebarContainerSelector: '.sidebar-container', 
            sidebarSelector: '.sidebar', 
            stickyHeaderSelector: 'header', // optional
            marginTop: 32,   // optional
            marginBottom: 32 // optional
        });
    });
    </script>
    ```
    (More information in the documentation comment of the function)
4. **Use the value provided by the script:**
   ```html
   <style>
   .sidebar {
       position: relative;
       top: var(--push-down);
   }
   </style>
   ```
