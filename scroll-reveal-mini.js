/**
 * koncept dla lazy load imgs
 * @see https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
 * 
 * użycie window.requestAnimationFrame()
 * @see https://gomakethings.com/debouncing-events-with-requestanimationframe-for-better-performance/
 * * */


document.addEventListener('DOMContentLoaded', function () {
    let scrollElements = document.querySelectorAll('.lazy');
    let throttleTimeout;

    /* IE fallback */
    function lazyload () {
        if (throttleTimeout) {
            window.cancelAnimationFrame(throttleTimeout);
        }

        throttleTimeout = window.requestAnimationFrame(function () {
            let scrollTop = window.pageYOffset;
            scrollElements.forEach(function (element) {
                if (element.offsetTop < (window.innerHeight + scrollTop)) {
                    element.classList.add('showDelayed');
                }
            });
            if (scrollElements.length == 0) {
                document.removeEventListener('scroll', lazyload);
                window.removeEventListener('resize', lazyload);
                window.removeEventListener('orientationChange', lazyload);
            }
        });
    }

    if ('IntersectionObserver' in window) {
        let elementObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let element = entry.target;
                    element.classList.add('showDelayed');
                    elementObserver.unobserve(element);
                }
            });
        });

        scrollElements.forEach(function (element) {
            elementObserver.observe(element);
        });
    } else {
        /* IE 11 */
        document.addEventListener('scroll', lazyload);
        window.addEventListener('resize', lazyload);
        window.addEventListener('orientationChange', lazyload);
    }
});
