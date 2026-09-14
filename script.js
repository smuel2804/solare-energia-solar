const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");


// MENU MOBILE

menuToggle.addEventListener("click", () => {

  const isOpen = nav.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", isOpen);

  menuToggle.textContent = isOpen ? "✕" : "☰";

  document.body.classList.toggle("menu-open", isOpen);

});


document.querySelectorAll(".nav a").forEach(link => {

  link.addEventListener("click", () => {

    nav.classList.remove("active");

    menuToggle.textContent = "☰";

    menuToggle.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");

  });

});


// HEADER AO ROLAR

window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

});


// ANIMAÇÃO DE ENTRADA

const revealElements = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);


revealElements.forEach(element => {

  revealObserver.observe(element);

});


// CONTADORES

const counters = document.querySelectorAll(".counter");


const counterObserver = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = Number(counter.dataset.target);

      let current = 0;

      const duration = 1400;

      const steps = 60;

      const increment = target / steps;

      const interval = duration / steps;


      const updateCounter = setInterval(() => {

        current += increment;

        if (current >= target) {

          counter.textContent = target;

          clearInterval(updateCounter);

        } else {

          counter.textContent = Math.floor(current);

        }

      }, interval);


      counterObserver.unobserve(counter);

    });

  },

  {
    threshold: 0.6
  }

);


counters.forEach(counter => {

  counterObserver.observe(counter);

});


// SIMULADOR

const energyBill = document.querySelector("#energyBill");
const billRange = document.querySelector("#billRange");
const calculateBtn = document.querySelector("#calculateBtn");

const annualSaving = document.querySelector("#annualSaving");
const monthlySaving = document.querySelector("#monthlySaving");
const systemPower = document.querySelector("#systemPower");
const panelCount = document.querySelector("#panelCount");


function formatMoney(value) {

  return value.toLocaleString("pt-BR", {

    style: "currency",
    currency: "BRL",

    maximumFractionDigits: 0

  });

}


function calculateSolar() {

  let bill = Number(energyBill.value);


  if (!bill || bill < 100) {

    bill = 100;

    energyBill.value = 100;

  }


  const estimatedMonthlySaving = bill * 0.9;

  const estimatedAnnualSaving =
    estimatedMonthlySaving * 12;


  const estimatedPower =
    Math.max(1.5, bill / 120);


  const estimatedPanels =
    Math.ceil(estimatedPower / 0.55);


  monthlySaving.textContent =
    formatMoney(estimatedMonthlySaving);


  annualSaving.textContent =
    formatMoney(estimatedAnnualSaving);


  systemPower.textContent =
    `${estimatedPower.toFixed(1).replace(".", ",")} kWp`;


  panelCount.textContent =
    estimatedPanels;


  annualSaving.animate(

    [
      {
        transform: "scale(0.92)",
        opacity: 0.3
      },

      {
        transform: "scale(1)",
        opacity: 1
      }

    ],

    {
      duration: 350,
      easing: "ease"
    }

  );

}


billRange.addEventListener("input", () => {

  energyBill.value = billRange.value;

  calculateSolar();

});


energyBill.addEventListener("input", () => {

  const value = Number(energyBill.value);

  if (value >= 100 && value <= 3000) {

    billRange.value = value;

  }

});


calculateBtn.addEventListener("click", calculateSolar);


calculateSolar();


// FAQ

const faqItems = document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

  const question = item.querySelector(".faq-question");


  question.addEventListener("click", () => {

    const isActive =
      item.classList.contains("active");


    faqItems.forEach(otherItem => {

      otherItem.classList.remove("active");

    });


    if (!isActive) {

      item.classList.add("active");

    }

  });

});


// FORMULÁRIO WHATSAPP

const contactForm =
  document.querySelector("#contactForm");


contactForm.addEventListener("submit", event => {

  event.preventDefault();


  const name =
    document.querySelector("#name").value.trim();


  const phone =
    document.querySelector("#phone").value.trim();


  const bill =
    document.querySelector("#bill").value;


  const property =
    document.querySelector("#property").value;


  const message =
`Olá! Gostaria de solicitar uma simulação de energia solar.

Nome: ${name}
Telefone: ${phone}
Conta média: R$ ${bill}
Tipo de imóvel: ${property}`;


  // TROQUE PELO NÚMERO DESEJADO
  const whatsappNumber =
    "5511999999999";


  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


  window.open(
    whatsappURL,
    "_blank"
  );

});


// ANO AUTOMÁTICO

document.querySelector("#year").textContent =
  new Date().getFullYear();