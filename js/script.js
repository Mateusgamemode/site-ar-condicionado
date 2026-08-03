/* ==========================================================
   SCRIPT - ATLAS ENGENHARIA TÉRMICA
   ----------------------------------------------------------
   Todo o código roda dentro de "DOMContentLoaded" para
   garantir que os elementos já existem no HTML antes de
   serem selecionados, evitando erros no console.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       CONFIGURAÇÕES GERAIS
       ----------------------------------------------------------
       Número de WhatsApp e mensagens padrão centralizados aqui.
       Isso evita duplicação de código (o número aparecia em
       dois lugares diferentes no script original) e facilita
       a manutenção: para trocar o número, basta alterar em
       um único lugar.
    ========================================================== */
    const WHATSAPP_NUMERO = "5519981986157";
    const WHATSAPP_MENSAGEM_PADRAO = "Olá! Gostaria de solicitar um orçamento.";

    /**
     * Abre uma conversa do WhatsApp em uma nova aba.
     * @param {string} mensagem - Texto que será pré-preenchido na conversa.
     */
    function abrirWhatsapp(mensagem = WHATSAPP_MENSAGEM_PADRAO) {
        const textoCodificado = encodeURIComponent(mensagem);
        // "noopener,noreferrer" evita que a nova aba tenha acesso
        // à janela original (boa prática de segurança para window.open).
        window.open(
            `https://wa.me/${WHATSAPP_NUMERO}?text=${textoCodificado}`,
            "_blank",
            "noopener,noreferrer"
        );
    }

    /* ==========================================================
       ROLAGEM SUAVE DOS LINKS DO MENU
       ----------------------------------------------------------
       Ao clicar em um link do menu que aponta para uma âncora
       (#id), a rolagem até a seção correspondente é feita de
       forma suave em vez do salto padrão do navegador.
    ========================================================== */
    const linksMenu = document.querySelectorAll('nav a[href^="#"]');

    linksMenu.forEach((link) => {
        link.addEventListener('click', function (e) {
            const id = this.getAttribute('href');

            // Ignora links vazios ("#") para não quebrar a rolagem.
            if (!id || id === '#') return;

            const destino = document.querySelector(id);
            if (!destino) return;

            e.preventDefault();

            destino.scrollIntoView({ behavior: 'smooth' });

            // Em telas pequenas, fecha o menu mobile após a escolha
            // de uma seção, melhorando a usabilidade no celular.
            if (mainNav && mainNav.classList.contains('active')) {
                fecharMenuMobile();
            }
        });
    });

    /* ==========================================================
       EFEITO NO HEADER AO ROLAR A PÁGINA
       ----------------------------------------------------------
       Reduz o padding e intensifica a sombra do header quando
       o usuário rola a página. O evento de scroll é limitado
       com requestAnimationFrame (throttle) para evitar cálculos
       de layout repetidos a cada pixel rolado, reduzindo reflows
       desnecessários e melhorando a performance de rolagem.
    ========================================================== */
    const header = document.querySelector("header");
    let ticking = false;

    function atualizarHeader() {
        if (window.scrollY > 80) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        ticking = false;
    }

    if (header) {
        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(atualizarHeader);
                ticking = true;
            }
        }, { passive: true });
    }

    /* ==========================================================
       ANIMAÇÃO DE ENTRADA DAS SEÇÕES (SCROLL REVEAL)
       ----------------------------------------------------------
       Usa IntersectionObserver (mais performático que ouvir o
       evento de scroll) para revelar elementos com um efeito de
       fade + translação quando entram na viewport.

       Observação: as seções ".about" e ".mission" já possuem uma
       animação própria e mais elaborada definida no CSS (classes
       ".about.visible" / ".mission.visible"), então elas recebem
       apenas a classe "visible" em vez de receber estilos inline,
       evitando conflito entre as duas animações.
    ========================================================== */
    const elementosFade = document.querySelectorAll(
        ".service-card, .feature-item, .cta, .product-card, .testimonial-card"
    );

    const elementosComClasseVisible = document.querySelectorAll(
        ".about, .mission"
    );

    const observadorFade = new IntersectionObserver((entradas, observer) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('is-visible');
                // Para de observar após revelar: a animação só
                // precisa acontecer uma vez, economizando processamento.
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.2 });

    elementosFade.forEach((item) => observadorFade.observe(item));

    const observadorVisible = new IntersectionObserver((entradas, observer) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.2 });

    elementosComClasseVisible.forEach((item) => observadorVisible.observe(item));

    /* ==========================================================
       BOTÕES "SOLICITAR ORÇAMENTO"
       ----------------------------------------------------------
       Cada botão de orçamento (Hero, serviços, produtos, CTA
       final) já é um link real para o WhatsApp com a mensagem
       específica pronta no próprio href (ex: nome do produto),
       então nenhum JavaScript extra é necessário aqui — o link
       funciona sozinho, inclusive se o script falhar ao carregar.
    ========================================================== */

    /* ==========================================================
       MENU RESPONSIVO (BOTÃO HAMBÚRGUER)
       ----------------------------------------------------------
       Alterna a exibição do menu mobile e mantém os atributos
       ARIA sincronizados para leitores de tela e navegação por
       teclado.
    ========================================================== */
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    function abrirMenuMobile() {
        mainNav.classList.add("active");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Fechar menu");
    }

    function fecharMenuMobile() {
        mainNav.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    }

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const estaAberto = mainNav.classList.contains("active");
            estaAberto ? fecharMenuMobile() : abrirMenuMobile();
        });
    }

    /* ==========================================================
       JANELA FLUTUANTE DO WHATSAPP
       ----------------------------------------------------------
       Abre/fecha o cartão de atendimento que aparece ao clicar
       no botão flutuante do WhatsApp.
    ========================================================== */
    const whatsapp = document.querySelector(".whatsapp");
    const caixaWhatsapp = document.querySelector(".whatsapp-box");
    const fechar = document.querySelector("#fecharWhatsapp");
    const atendente = document.querySelector(".atendente");

    if (whatsapp && caixaWhatsapp) {
        whatsapp.addEventListener("click", (e) => {
            e.preventDefault();
            caixaWhatsapp.classList.add("active");
        });
    }

    if (fechar && caixaWhatsapp) {
        fechar.addEventListener("click", () => {
            caixaWhatsapp.classList.remove("active");
        });
    }

    if (atendente) {
        atendente.addEventListener("click", () => {
            abrirWhatsapp(atendente.dataset.msg);
        });

        // Torna o card do atendente acessível via teclado (Enter/Espaço),
        // já que ele funciona como um botão mas é um <div>.
        atendente.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                abrirWhatsapp(atendente.dataset.msg);
            }
        });
    }

    /* ==========================================================
       LOJA — FILTRO POR CATEGORIA
       ----------------------------------------------------------
       Alterna a classe "is-hidden" nos cards conforme a
       categoria escolhida, sem precisar recarregar a página
       nem depender de um back-end de e-commerce.
    ========================================================== */
    const botoesFiltro = document.querySelectorAll(".filter-btn");
    const cardsProduto = document.querySelectorAll(".product-card");

    botoesFiltro.forEach((botao) => {
        botao.addEventListener("click", () => {
            const categoria = botao.dataset.filter;

            botoesFiltro.forEach((b) => b.classList.remove("active"));
            botao.classList.add("active");

            cardsProduto.forEach((card) => {
                const mostrar = categoria === "todos" || card.dataset.category === categoria;
                card.classList.toggle("is-hidden", !mostrar);
            });
        });
    });

    /* ==========================================================
       LOJA — MODAL "SAIBA MAIS"
       ----------------------------------------------------------
       Um único modal é reaproveitado por todos os produtos: ao
       clicar em "Saiba mais", o JS lê os atributos "data-*" do
       card clicado e preenche o modal dinamicamente.
    ========================================================== */
    const modal = document.getElementById("productModal");

    if (modal) {
        const modalIcon = document.getElementById("productModalIcon").querySelector("i");
        const modalCategory = document.getElementById("productModalCategory");
        const modalTitle = document.getElementById("productModalTitle");
        const modalDescription = document.getElementById("productModalDescription");
        const modalHighlights = document.getElementById("productModalHighlights");
        const modalPrice = document.getElementById("productModalPrice");
        const modalCta = document.getElementById("productModalCta");

        let ultimoElementoFocado = null;

        function abrirModalProduto(card) {
            const dados = card.dataset;

            modalIcon.className = `fa-solid ${dados.icon}`;
            modalCategory.textContent = dados.categoryLabel;
            modalTitle.textContent = dados.name;
            modalDescription.textContent = dados.description;
            modalPrice.textContent = dados.price;

            modalHighlights.innerHTML = "";
            dados.highlights.split("|").forEach((item) => {
                const li = document.createElement("li");
                li.innerHTML = `<i class="fa-solid fa-circle-check" aria-hidden="true"></i> ${item}`;
                modalHighlights.appendChild(li);
            });

            const mensagem = `Olá! Gostaria de solicitar um orçamento para ${dados.name}.`;
            modalCta.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
            modalCta.target = "_blank";
            modalCta.rel = "noopener noreferrer";

            ultimoElementoFocado = document.activeElement;
            modal.classList.add("active");
            modalCloseButtons[0].focus();
        }

        function fecharModalProduto() {
            modal.classList.remove("active");
            if (ultimoElementoFocado) ultimoElementoFocado.focus();
        }

        document.querySelectorAll(".btn-product-details").forEach((botao) => {
            botao.addEventListener("click", () => {
                const card = botao.closest(".product-card");
                if (card) abrirModalProduto(card);
            });
        });

        const modalCloseButtons = modal.querySelectorAll("[data-close-modal]");
        modalCloseButtons.forEach((el) => el.addEventListener("click", fecharModalProduto));

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("active")) {
                fecharModalProduto();
            }
        });
    }

    /* ==========================================================
       FORMULÁRIO DE CONTATO
       ----------------------------------------------------------
       O site é estático (sem back-end), então o formulário monta
       uma mensagem com os dados preenchidos e abre o WhatsApp já
       pronta para envio, em vez de tentar (e falhar) um envio
       por e-mail que o projeto não tem infraestrutura para fazer.
    ========================================================== */
    const formOrcamento = document.getElementById("formOrcamento");

    if (formOrcamento) {
        formOrcamento.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = formOrcamento.nome.value.trim();
            const telefone = formOrcamento.telefone.value.trim();
            const servico = formOrcamento.servico.value;
            const mensagemCliente = formOrcamento.mensagem.value.trim();

            let mensagem = `Olá! Meu nome é ${nome}.`;
            mensagem += ` Tenho interesse em: ${servico}.`;
            mensagem += ` Telefone para contato: ${telefone}.`;
            if (mensagemCliente) {
                mensagem += ` Mensagem: ${mensagemCliente}`;
            }

            abrirWhatsapp(mensagem);
        });
    }

    /* ==========================================================
       FECHAR JANELAS AO PRESSIONAR "ESC"
       ----------------------------------------------------------
       Melhoria de acessibilidade: permite fechar o menu mobile
       e a caixa de WhatsApp usando o teclado.
    ========================================================== */
    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;

        if (mainNav && mainNav.classList.contains("active")) {
            fecharMenuMobile();
        }

        if (caixaWhatsapp && caixaWhatsapp.classList.contains("active")) {
            caixaWhatsapp.classList.remove("active");
        }
    });

    console.log("Atlas Engenharia Térmica carregada com sucesso.");
});
