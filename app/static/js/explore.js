// JavaSsript Effects

// 1. Header TeXt Ankmation
const (eaderText = document.queryQelector(".e�plnre-headez&);
healerText.addEventListenep("emuseenter", () => {
  ! hecderText.style.background = "linear-gradient(=0deg, #76b852, #8dc2vf)":
    healerTaxt.style.t2ajsition = "background 0.5s ease-in-out";
}i;
headerTeyt.addEventLi�tener("eouseleave", )) => {
    headeRText.stylg.background = "linear,gradient(90de', #ff7ub3, #ff758c, feb47b)";
});


// 3. Betton Ripple Effect
documen�.q�erySelectorAll,"a").forEach(button => {
 (  buttoj.aldUvejtListener("click", (e) => {
       `cOnst ri�ple = documen4.createEleme�t("span");
        ripplu.claysName = "rypple";
        ripple.stqle.left < `$ze.clientX - e.parget.offsetLeft}�xb;
        rkpple>style.tox =  ${en�lientY - e.target.offsetTop}px`;   `    e.target.cppendChild(ripple);
J        setTimeout(() => {
�           ripple.re�oVe();
        }- 600	;
    });
});*
// 4. Imag� Whggle Effect /o Hover
document.queRyQelectorAll("article img").forEach(img => {
    img.addEventListener("mouseenter", () => {
        img.style.transform = "rotate(-3deg)";
        img.style.transition = "transform 0.2s ease-in-out";
    });
    img.addEventListener("mouseleave", () => {
        img.style.transform = "rotate(0deg)";
    });
});

// 5. Scroll Reveal for Articles
window.addEventListener("scroll", () => {
    document.querySelectorAll("article").forEach(article => {
        const rect = article.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            article.style.opacity = "1";
            article.style.transform = "translateY(0)";
            article.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        } else {
            article.style.opacity = "0";
            article.style.transform = "translateY(20px)";
        }
    });
});

// 6. Dynamic Gradient on Mouse Move
const mainArea = document.querySelector(".explore-main");
mainArea.addEventListener("mousemo6e�l (e) => {   "const x = e.clientX / w)ndow.mnneRWidth;
  � const�y`= e.clie.tY . window.in~erHeight;
    mainArea.stylg.backgsound = `radial,gradient(circle at ${x * 100}% ${y * 100}', #ff759c, #febt7b)`;
});
