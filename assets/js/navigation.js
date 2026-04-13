// Navigation synchronization script
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".main-navbar");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navbarMenu = document.querySelector(".navbar-menu");

  // Mobile menu toggle
  if (mobileToggle && navbarMenu) {
    mobileToggle.addEventListener("click", function () {
      mobileToggle.classList.toggle("active");
      navbarMenu.classList.toggle("mobile-open");
    });

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileToggle.classList.remove("active");
        navbarMenu.classList.remove("mobile-open");
      });
    });
  }

  // Navbar scroll effect
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Set active nav link based on current page
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    // Get current file name
    let currentFile = currentPath.split("/").pop();

    // If path is empty or just '/', set to index.html
    if (
      currentFile === "" ||
      currentPath === "/" ||
      currentPath.endsWith("/")
    ) {
      currentFile = "index.html";
    }

    // Remove .html extension for comparison if needed
    const currentPage = currentFile.replace(".html", "");

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      if (href) {
        const linkPage = href.replace(".html", "");

        // Check if link matches current page
        if (
          linkPage === currentPage ||
          href === currentFile ||
          (currentFile === "index.html" &&
            (href === "index.html" || href === "./" || href === "/"))
        ) {
          link.classList.add("active");
        }
      }
    });
  }

  // Set active link on page load
  setActiveNavLink();

  // Also handle cases where navigation might be updated dynamically
  window.addEventListener("popstate", setActiveNavLink);
});
