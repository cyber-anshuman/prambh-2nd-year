/**
 * Blackout College Technology Club - Client Script
 * Learn. Build. Secure.
 *
 * Version: 1.0.4-staging
 * Note: Static client runtime. No external APIs or telemetry.
 */

// Developer Note:
// Staging configuration loaded.
// TODO: remove debug configuration and update endpoint routing before production deployment.

const APP_CONFIG = {
  version: '1.0.4',
  environment: 'development-staging',
  clubName: 'Blackout College Technology Club',
  apiPrefix: '/api/v1'
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNav();
  initContactForm();
  initLoginForm();
  initEventButtons();
  initDocumentUpload();
});


/**
 * Mobile Navigation Toggle & Accessibility
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('open');
      navMenu.classList.remove('open');
      toggleBtn.focus();
    }
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('open');
      navMenu.classList.remove('open');
    }
  });
}


/**
 * Active Navigation Indicator
 */
function initActiveNav() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    if (
      href === page ||
      (page === '' && href === 'index.html') ||
      (page === '/' && href === 'index.html')
    ) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}


/**
 * Client-Side Contact Form Validation
 */
function initContactForm() {
  const form = document.getElementById('contactForm');

  if (!form) return;

  const successAlert = document.getElementById('contactSuccessAlert');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    // Reset previous invalid states
    [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
      if (field) {
        field.classList.remove('is-invalid');
      }
    });

    // Validate Name
    if (!nameInput || !nameInput.value.trim()) {
      if (nameInput) {
        nameInput.classList.add('is-invalid');
      }

      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
      if (emailInput) {
        emailInput.classList.add('is-invalid');
      }

      isValid = false;
    }

    // Validate Subject
    if (!subjectInput || !subjectInput.value.trim()) {
      if (subjectInput) {
        subjectInput.classList.add('is-invalid');
      }

      isValid = false;
    }

    // Validate Message
    if (!messageInput || messageInput.value.trim().length < 10) {
      if (messageInput) {
        messageInput.classList.add('is-invalid');
      }

      isValid = false;
    }

    if (isValid) {
      if (successAlert) {
        successAlert.style.display = 'flex';
        successAlert.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }

      form.reset();

      // Automatically hide alert after 8 seconds
      setTimeout(() => {
        if (successAlert) {
          successAlert.style.display = 'none';
        }
      }, 8000);
    }
  });
}


/**
 * Student Portal Login Handling (UI Simulation)
 */
function initLoginForm() {
  const loginForm = document.getElementById('loginForm');

  if (!loginForm) return;

  const loginAlert = document.getElementById('loginAlert');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentIdInput = document.getElementById('studentId');
    const passwordInput = document.getElementById('studentPassword');

    let isValid = true;

    [studentIdInput, passwordInput].forEach(field => {
      if (field) {
        field.classList.remove('is-invalid');
      }
    });

    if (!studentIdInput || !studentIdInput.value.trim()) {
      if (studentIdInput) {
        studentIdInput.classList.add('is-invalid');
      }

      isValid = false;
    }

    if (!passwordInput || !passwordInput.value.trim()) {
      if (passwordInput) {
        passwordInput.classList.add('is-invalid');
      }

      isValid = false;
    }

    if (isValid) {
      // For this static preview stage, simulate a safe preview redirect
      if (loginAlert) {
        loginAlert.className = 'alert alert-info';

        loginAlert.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>

          <div>
            <strong>Notice:</strong>
            Authenticating demo session... Redirecting to portal dashboard.
          </div>
        `;

        loginAlert.style.display = 'flex';
      }

      setTimeout(() => {
        window.location.href = 'portal.html?access=granted';
      }, 1200);
    }
  });
}


/**
 * Event Registration Interaction
 */
function initEventButtons() {
  const regButtons = document.querySelectorAll('.event-register-btn');

  regButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const eventTitle =
        btn.getAttribute('data-event-title') || 'this event';

      alert(
        `Registration for "${eventTitle}" requires student verification. Please log into the Student Portal.`
      );
    });
  });
}


/**
 * Task 5 - Document Upload Challenge
 *
 * This is a simulated client-side upload system.
 * No files are actually uploaded to a server.
 */
function initDocumentUpload() {
  const uploadButton = document.getElementById('upload-document-btn');
  const uploadInput = document.getElementById('document-upload');
  const uploadStatus = document.getElementById('upload-status');

  if (!uploadButton || !uploadInput || !uploadStatus) {
    return;
  }

  uploadButton.addEventListener('click', () => {
    const file = uploadInput.files[0];

    if (!file) {
      uploadStatus.textContent = 'Please select a file.';
      return;
    }

    const filename = file.name.toLowerCase();

    // Temporary validation used by the staging upload system.
    const blockedExtensions = [
      '.exe',
      '.js',
      '.php',
      '.sh'
    ];

    const isBlocked = blockedExtensions.some(ext =>
      filename.endsWith(ext)
    );

    if (isBlocked) {
      uploadStatus.textContent =
        'Upload rejected: this file type is not permitted.';

      return;
    }

    /*
     * Staging verification condition.
     *
     * The challenge intentionally contains a weak client-side
     * validation rule. Students are expected to inspect this
     * JavaScript and understand how the upload is handled.
     */
    if (filename === 'report.php.txt') {
      uploadStatus.innerHTML =
        '<strong>Upload accepted.</strong><br><br>' +
        'Temporary staging verification token: ' +
        '<code>THM{prambh_upload_bypass}</code>';

      return;
    }

    uploadStatus.textContent =
      'Upload accepted for review.';
  });
}
