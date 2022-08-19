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

## Info 

The container element should take up all the space available for the sidebar in the document (width and height).
The sidebar element should be the (only) child element of the sidebar-container.  

All this script does with your
sidebar is assigning a pixel value to the custom CSS property `--push-down`. This value is the current offset that
your sidebar should have from its original position - apply it to the `top` property and use relative positioning.
That's all you need. If you have a sticky/fixed header on your page (which is not in the document flow due to its
position) you can specify it as third argument and its height will get accounted for in the calculation process.
