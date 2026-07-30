/* ==========================================================
   SCRIPT - ATLAS ENGENHARIA TÉRMICA
========================================================== */

/*
==========================================================
ROLAGEM SUAVE DOS LINKS
==========================================================
*/

const links = document.querySelectorAll('nav a');

links.forEach(link => {

    link.addEventListener('click', function (e) {

        e.preventDefault();

        const id = this.getAttribute('href');

        const destino = document.querySelector(id);

        if (destino) {

            destino.scrollIntoView({

                behavior: 'smooth'

            });

        }

    });

});


/*
==========================================================
EFEITO NO HEADER
==========================================================
*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.padding = "5px 0";

        header.style.boxShadow = "0 8px 20px rgba(0,0,0,.15)";

    } else {

        header.style.padding = "0";

        header.style.boxShadow = "0 2px 20px rgba(0,0,0,.08)";

    }

});


/*
==========================================================
ANIMAÇÃO DAS SEÇÕES
==========================================================
*/

const elementos = document.querySelectorAll(

    ".card, .about, .feature-grid div, .mission, .cta"

);

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.style.opacity = "1";

            entrada.target.style.transform = "translateY(0px)";

        }

    });

}, { threshold: .2 });


elementos.forEach((item) => {

    item.style.opacity = "0";

    item.style.transform = "translateY(40px)";

    item.style.transition = ".8s";

    observador.observe(item);

});





/*
==========================================================
BOTÃO SOLICITAR ORÇAMENTO
==========================================================
*/

const botoes = document.querySelectorAll(

    ".btn-primary,.btn-header"

);

botoes.forEach(botao => {

    botao.addEventListener("click", (e) => {

        e.preventDefault();

        const numero = "19981986157";

        const mensagem = encodeURIComponent(

            "Olá! Gostaria de solicitar um orçamento."

        );

        window.open(

            `https://wa.me/${numero}?text=${mensagem}`,

            "_blank"

        );

    });

});


/*
==========================================================
MENU RESPONSIVO
(Ainda vamos adicionar o botão hambúrguer)
==========================================================
*/

console.log("Atlas Engenharia Térmica carregada com sucesso.");


/*
==========================================================HAMBURGER==========================================================
*/
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    
});


/* ==========================================
JANELA WHATSAPP
========================================== */

const whatsapp = document.querySelector(".whatsapp");


const caixaWhatsapp = document.querySelector(".whatsapp-box");

const fechar = document.querySelector("#fecharWhatsapp");


whatsapp.addEventListener("click", (e) => {

    e.preventDefault();

    caixaWhatsapp.classList.add("active");

});


fechar.addEventListener("click", () => {

    caixaWhatsapp.classList.remove("active");

});

const atendente = document.querySelector(".atendente");

atendente.addEventListener("click", () => {

    const numero = "19981986157";

    const mensagem = encodeURIComponent(atendente.dataset.msg);

    window.open(
        `https://wa.me/${numero}?text=${mensagem}`,
        "_blank"
    );

});
