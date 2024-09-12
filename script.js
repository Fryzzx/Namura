// script.js

let profileDropdownList = document.querySelector(".profile-dropdown-list");
let profileBtn = document.querySelector(".profile-dropdown-btn");

const toggle = ()=> profileDropdownList.classList.toggle("active");

window.addEventListener('click',function(e){
    if(!profileBtn.contains(e.target))profileDropdownList.classList.remove("active")
})

document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");

    const firstCardWidth = carousels[0].querySelector("li").offsetWidth;
    const scrollDuration = 5000; // Duration for autoplay

    let isDragging = false, startX, startScrollLeft;

    const initializeCarousel = (carousel, leftBtn, rightBtn) => {
        // const carouselChildrens = [...carousel.children];
        // const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

        // // Duplicate cards for infinite scroll
        // carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        //     carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        // });
        // carouselChildrens.slice(0, cardPerView).forEach(card => {
        //     carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        // });

        // // Scroll to hide duplicates
        // carousel.scrollLeft = carousel.offsetWidth;

        // Event listeners for navigation buttons
        leftBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: -firstCardWidth, behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: firstCardWidth, behavior: "smooth" });
        });

        // Dragging functionality
        carousel.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
            carousel.classList.add("dragging");
        });

        carousel.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const x = e.pageX;
            carousel.scrollLeft = startScrollLeft - (x - startX);
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            carousel.classList.remove("dragging");
            checkCarouselBounds(carousel);
        });

        // Autoplay functionality
        let timeoutId;
        const autoPlay = () => {
            timeoutId = setInterval(() => {
                carousel.scrollBy({ left: firstCardWidth, behavior: "smooth" });
                checkCarouselBounds(carousel);
            }, scrollDuration);
        }

        const checkCarouselBounds = (carousel) => {
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft <= 0) {
                carousel.scrollLeft = maxScrollLeft - firstCardWidth;
            } else if (carousel.scrollLeft >= maxScrollLeft) {
                carousel.scrollLeft = firstCardWidth;
            }
        }

        autoPlay();

        // Pause autoplay on mouse enter and resume on mouse leave
        carousel.parentElement.addEventListener("mouseenter", () => clearInterval(timeoutId));
        carousel.parentElement.addEventListener("mouseleave", autoPlay);
    }

    carousels.forEach((carousel, index) => {
        const leftBtn = document.querySelector(`#left-${index + 1}`);
        const rightBtn = document.querySelector(`#right-${index + 1}`);
        initializeCarousel(carousel, leftBtn, rightBtn);
    });
});
