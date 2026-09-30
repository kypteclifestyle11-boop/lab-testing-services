document.addEventListener('DOMContentLoaded', () => {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const menuToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove('active');
        const faqButton = faqItem.querySelector('.faq-question');
        if (faqButton) faqButton.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      accordionItems.forEach((accordionItem) => {
        accordionItem.classList.remove('active');
        const btn = accordionItem.querySelector('.accordion-header');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };

    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop);
  }

  const formRules = {
    fullName: 'Full Name',
    phone: 'Phone Number',
    email: 'Email',
    productName: 'Product / Sample Name',
    category: 'Testing Category',
    requirement: 'Testing Requirement'
  };

  const validateField = (field) => {
    const tag = field.tagName.toLowerCase();
    const value = field.value.trim();
    const name = field.name;

    let isValid = true;

    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailPattern.test(value);
    } else if (name === 'phone') {
      isValid = value.length >= 7;
    } else if (name === 'category' || name === 'fullName' || name === 'productName' || name === 'requirement') {
      isValid = value.length > 0;
    }

    if (!isValid) {
      field.classList.add('error');
      if (field.dataset.errorText) {
        field.setCustomValidity(field.dataset.errorText);
      }
      return false;
    }

    field.classList.remove('error');
    field.setCustomValidity('');
    return true;
  };

  document.querySelectorAll('form[data-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const successMessage = form.querySelector('.form-success');
      const requiredFields = form.querySelectorAll('[required]');
      let allValid = true;

      requiredFields.forEach((field) => {
        const fieldIsValid = validateField(field);
        if (!fieldIsValid) allValid = false;
      });

      if (!allValid) {
        if (successMessage) {
          successMessage.textContent = 'Please complete the required fields before submitting.';
          successMessage.style.color = '#c94d53';
        }
        return;
      }

      if (successMessage) {
        successMessage.textContent = 'Thank you. Your testing requirement has been received. Our team will contact you shortly.';
        successMessage.style.color = '#1f8f5f';
      }

      form.reset();
      form.querySelectorAll('input, textarea, select').forEach((field) => field.classList.remove('error'));
    });
  });

  document.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('blur', () => {
      if (field.hasAttribute('required')) {
        validateField(field);
      }
    });
  });
});
