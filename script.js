const words = [
    "CRIS",
    "CJ",
    "AYUBAN",
    "PONG"
];

let index = 0;
const textElement = document.getElementById("changing-text");
const wrapperElement = document.getElementById("rotator-wrapper");

function calculateWordWidth(wordText) {
    const hiddenSpan = document.createElement("span");
    hiddenSpan.style.visibility = "hidden";
    hiddenSpan.style.position = "absolute";
    hiddenSpan.style.whiteSpace = "nowrap";
    hiddenSpan.style.fontFamily = '"Syne", sans-serif';
    hiddenSpan.style.fontWeight = "800";           
    hiddenSpan.style.fontSize = getComputedStyle(textElement).fontSize;        
    
    hiddenSpan.textContent = wordText;
    document.body.appendChild(hiddenSpan);
    const calculatedWidth = hiddenSpan.getBoundingClientRect().width;
    document.body.removeChild(hiddenSpan);
    
    return calculatedWidth;
}

function initTextRotator() {

    const initialWidth = calculateWordWidth(words[index]);
    wrapperElement.style.width = `${initialWidth}px`;

    setInterval(() => {
        textElement.classList.add("hidden");

        index = (index + 1) % words.length;
        const nextWord = words[index];
        const nextWidth = calculateWordWidth(nextWord);

        setTimeout(() => {
            wrapperElement.style.width = `${nextWidth}px`;
            textElement.textContent = nextWord;
            
            textElement.classList.remove("hidden");
        }, 300);

    }, 2200);
}

window.addEventListener("DOMContentLoaded", initTextRotator);



(function(){
    const viewport = document.querySelector('.slider-viewport');
    const container = document.getElementById('projectsContainer');
    const cards = container.querySelectorAll('.projects-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let scrollPos = 0;

    function getStep(){
        const gap = parseFloat(getComputedStyle(container).gap) || 0;
        return cards[0].getBoundingClientRect().width + gap;
    }

    function getMaxScroll(){
        return Math.max(0, container.scrollWidth - viewport.clientWidth);
    }

    function apply(){
        const maxScroll = getMaxScroll();
        scrollPos = Math.min(scrollPos, maxScroll);
        container.style.transform = `translateX(-${scrollPos}px)`;
        prevBtn.disabled = scrollPos <= 0;
        nextBtn.disabled = scrollPos >= maxScroll;
    }

    function next(){
        const maxScroll = getMaxScroll();
        scrollPos = Math.min(scrollPos + getStep(), maxScroll);
        apply();
    }

    function prev(){
        scrollPos = Math.max(scrollPos - getStep(), 0);
        apply();
    }

    prevBtn.addEventListener('click', next === next ? prev : prev);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });

    window.addEventListener('resize', apply);
    apply();
})();

//************* HERO FADE IN *************//
(function(){
    const preloader = document.getElementById('preloader');
    const hero = document.getElementById('hero');

    document.body.classList.add('no-scroll');

    function hidePreloader(){
        preloader.classList.add('loaded');
        document.body.classList.remove('no-scroll');
        hero.classList.add('hero-loaded');
    }

    window.addEventListener('load', () => {
        setTimeout(hidePreloader, 300);
    });

    if (document.readyState === 'complete') {
        setTimeout(hidePreloader, 300);
    }
})();

//*************** SECTIONS FADE IN ******************//

(function(){
    const faders = document.querySelectorAll('.fade-in, .fade-in-left');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer){
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    function markAlreadyPassedSections(){
        faders.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.bottom < window.innerHeight) {
                el.classList.add('visible');
                appearOnScroll.unobserve(el);
            } else {
                appearOnScroll.observe(el);
            }
        });
    }

    window.addEventListener('load', markAlreadyPassedSections);

    window.addEventListener('hashchange', markAlreadyPassedSections);
})();


//************* REFRESH SCROLL TO TOP *****************// 

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

window.addEventListener('load', function () {
    if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }
});

//********************** LOADER ******************//

(function(){
    const preloader = document.getElementById('preloader');
    document.body.classList.add('no-scroll');

    function hidePreloader(){
        preloader.classList.add('loaded');
        document.body.classList.remove('no-scroll');
    }

    window.addEventListener('load', () => {
        setTimeout(hidePreloader, 300);
    });

    if (document.readyState === 'complete') {
        setTimeout(hidePreloader, 300);
    }
})();

//******* FORM  ************//

let form = document.querySelector("form")

form.addEventListener("submit", function(e){

    e.preventDefault();
    form.reset();
})