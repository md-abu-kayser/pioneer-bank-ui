// JavaScript Start:
// --------------------------------------------------------------->
const state = {
  currentUser: null,
  balance: 1240,
  deposit: 0,
  withdraw: 0,
  transactions: [
    {
      id: 1,
      date: "Oct 15, 2023",
      description: "Initial Balance",
      amount: 1240,
      type: "credit",
      status: "completed",
    },
  ],
  theme: "light",
  isLoggedIn: false,
};

// DOM Elements
const domElements = {
  navLogin: document.getElementById("nav-login"),
  mobileLogin: document.getElementById("mobile-login"),
  bannerLogin: document.getElementById("banner-login"),
  bannerSignup: document.getElementById("banner-signup"),

  // Auth Areas
  loginArea: document.getElementById("login-area"),
  signupArea: document.getElementById("signup-area"),
  transactionArea: document.getElementById("transaction-area"),

  // Auth Buttons
  showSignupBtn: document.getElementById("show-signup"),
  showLoginBtn: document.getElementById("show-login"),
  loginBtn: document.getElementById("login-btn"),
  signupBtn: document.getElementById("signup-btn"),

  // Login Form
  loginEmail: document.getElementById("login-email"),
  loginPassword: document.getElementById("login-password"),
  loginEmailError: document.getElementById("login-email-error"),
  loginPasswordError: document.getElementById("login-password-error"),

  // Signup Form
  signupFirstname: document.getElementById("signup-firstname"),
  signupLastname: document.getElementById("signup-lastname"),
  signupEmail: document.getElementById("signup-email"),
  signupPassword: document.getElementById("signup-password"),
  signupConfirmPassword: document.getElementById("signup-confirm-password"),
  signupTerms: document.getElementById("signup-terms"),
  signupFirstnameError: document.getElementById("signup-firstname-error"),
  signupLastnameError: document.getElementById("signup-lastname-error"),
  signupEmailError: document.getElementById("signup-email-error"),
  signupPasswordError: document.getElementById("signup-password-error"),
  signupConfirmPasswordError: document.getElementById(
    "signup-confirm-password-error",
  ),
  signupTermsError: document.getElementById("signup-terms-error"),

  // Transaction Elements
  depositAmount: document.getElementById("depositAmount"),
  withdrawAmount: document.getElementById("withdrawAmount"),
  addDeposit: document.getElementById("addDeposit"),
  addWithdraw: document.getElementById("addWithdraw"),
  currentDeposit: document.getElementById("currentDeposit"),
  currentWithdraw: document.getElementById("currentWithdraw"),
  currentBalance: document.getElementById("currentBalance"),
  depositError: document.getElementById("deposit-error"),
  withdrawError: document.getElementById("withdraw-error"),
  transactionHistory: document.getElementById("transaction-history"),
  userName: document.getElementById("user-name"),

  // Theme
  themeButtons: document.querySelectorAll(".theme-btn"),

  // Modal
  logoutModal: document.getElementById("logout-modal"),
  confirmLogout: document.getElementById("confirm-logout"),

  // Navigation Links
  navLinks: document.querySelectorAll(".nav-link"),
};

// Utility
const utils = {
  formatCurrency: (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  },

  // Show notification
  showToast: (message, type = "info") => {
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
      existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="flex items-center">
        <i class="fas ${
          type === "success"
            ? "fa-check-circle text-success"
            : type === "error"
              ? "fa-exclamation-circle text-error"
              : "fa-info-circle text-info"
        } mr-2"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 200);
    }, 3000);
  },

  // Validate email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate password
  validatePassword: (password) => {
    return password.length >= 6;
  },

  // Get current date
  getCurrentDate: () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },

  // Generate unique ID
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },
};

// Form Validation
const formValidation = {
  validateLoginForm: () => {
    let isValid = true;
    const email = domElements.loginEmail.value.trim();
    const password = domElements.loginPassword.value.trim();

    // Validate email
    if (!email) {
      domElements.loginEmailError.textContent = "Email is required";
      domElements.loginEmailError.classList.remove("hidden");
      domElements.loginEmail.classList.add("input-error");
      isValid = false;
    } else if (!utils.validateEmail(email)) {
      domElements.loginEmailError.textContent =
        "Please enter a valid email address";
      domElements.loginEmailError.classList.remove("hidden");
      domElements.loginEmail.classList.add("input-error");
      isValid = false;
    } else {
      domElements.loginEmailError.classList.add("hidden");
      domElements.loginEmail.classList.remove("input-error");
      domElements.loginEmail.classList.add("input-success");
    }

    // Validate password
    if (!password) {
      domElements.loginPasswordError.textContent = "Password is required";
      domElements.loginPasswordError.classList.remove("hidden");
      domElements.loginPassword.classList.add("input-error");
      isValid = false;
    } else if (!utils.validatePassword(password)) {
      domElements.loginPasswordError.textContent =
        "Password must be at least 6 characters";
      domElements.loginPasswordError.classList.remove("hidden");
      domElements.loginPassword.classList.add("input-error");
      isValid = false;
    } else {
      domElements.loginPasswordError.classList.add("hidden");
      domElements.loginPassword.classList.remove("input-error");
      domElements.loginPassword.classList.add("input-success");
    }

    return isValid;
  },

  // Signup Rorm validation
  validateSignupForm: () => {
    let isValid = true;
    const firstname = domElements.signupFirstname.value.trim();
    const lastname = domElements.signupLastname.value.trim();
    const email = domElements.signupEmail.value.trim();
    const password = domElements.signupPassword.value.trim();
    const confirmPassword = domElements.signupConfirmPassword.value.trim();
    const terms = domElements.signupTerms.checked;

    // Validate First Name
    if (!firstname) {
      domElements.signupFirstnameError.classList.remove("hidden");
      domElements.signupFirstname.classList.add("input-error");
      isValid = false;
    } else {
      domElements.signupFirstnameError.classList.add("hidden");
      domElements.signupFirstname.classList.remove("input-error");
      domElements.signupFirstname.classList.add("input-success");
    }

    // Validate Last Name
    if (!lastname) {
      domElements.signupLastnameError.classList.remove("hidden");
      domElements.signupLastname.classList.add("input-error");
      isValid = false;
    } else {
      domElements.signupLastnameError.classList.add("hidden");
      domElements.signupLastname.classList.remove("input-error");
      domElements.signupLastname.classList.add("input-success");
    }

    // Validate email
    if (!email) {
      domElements.signupEmailError.textContent = "Email is required";
      domElements.signupEmailError.classList.remove("hidden");
      domElements.signupEmail.classList.add("input-error");
      isValid = false;
    } else if (!utils.validateEmail(email)) {
      domElements.signupEmailError.textContent =
        "Please enter a valid email address";
      domElements.signupEmailError.classList.remove("hidden");
      domElements.signupEmail.classList.add("input-error");
      isValid = false;
    } else {
      domElements.signupEmailError.classList.add("hidden");
      domElements.signupEmail.classList.remove("input-error");
      domElements.signupEmail.classList.add("input-success");
    }

    // Validate password
    if (!password) {
      domElements.signupPasswordError.textContent = "Password is required";
      domElements.signupPasswordError.classList.remove("hidden");
      domElements.signupPassword.classList.add("input-error");
      isValid = false;
    } else if (!utils.validatePassword(password)) {
      domElements.signupPasswordError.textContent =
        "Password must be at least 6 characters";
      domElements.signupPasswordError.classList.remove("hidden");
      domElements.signupPassword.classList.add("input-error");
      isValid = false;
    } else {
      domElements.signupPasswordError.classList.add("hidden");
      domElements.signupPassword.classList.remove("input-error");
      domElements.signupPassword.classList.add("input-success");
    }

    // Validate Confirm Password
    if (!confirmPassword) {
      domElements.signupConfirmPasswordError.textContent =
        "Please confirm your password";
      domElements.signupConfirmPasswordError.classList.remove("hidden");
      domElements.signupConfirmPassword.classList.add("input-error");
      isValid = false;
    } else if (password !== confirmPassword) {
      domElements.signupConfirmPasswordError.textContent =
        "Passwords do not match";
      domElements.signupConfirmPasswordError.classList.remove("hidden");
      domElements.signupConfirmPassword.classList.add("input-error");
      isValid = false;
    } else {
      domElements.signupConfirmPasswordError.classList.add("hidden");
      domElements.signupConfirmPassword.classList.remove("input-error");
      domElements.signupConfirmPassword.classList.add("input-success");
    }

    // Validate terms
    if (!terms) {
      domElements.signupTermsError.classList.remove("hidden");
      isValid = false;
    } else {
      domElements.signupTermsError.classList.add("hidden");
    }

    return isValid;
  },

  // Clear form validation
  clearFormValidation: () => {
    domElements.loginEmailError.classList.add("hidden");
    domElements.loginPasswordError.classList.add("hidden");
    domElements.loginEmail.classList.remove("input-error", "input-success");
    domElements.loginPassword.classList.remove("input-error", "input-success");

    // Clear signup form
    domElements.signupFirstnameError.classList.add("hidden");
    domElements.signupLastnameError.classList.add("hidden");
    domElements.signupEmailError.classList.add("hidden");
    domElements.signupPasswordError.classList.add("hidden");
    domElements.signupConfirmPasswordError.classList.add("hidden");
    domElements.signupTermsError.classList.add("hidden");

    domElements.signupFirstname.classList.remove(
      "input-error",
      "input-success",
    );
    domElements.signupLastname.classList.remove("input-error", "input-success");
    domElements.signupEmail.classList.remove("input-error", "input-success");
    domElements.signupPassword.classList.remove("input-error", "input-success");
    domElements.signupConfirmPassword.classList.remove(
      "input-error",
      "input-success",
    );
  },
};

// Authentication
const auth = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const user = {
            id: utils.generateId(),
            email: email,
            firstName: email.split("@")[0],
            lastName: "User",
            joinDate: utils.getCurrentDate(),
          };
          resolve(user);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  },

  // Signup user
  signup: (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          userData.firstName &&
          userData.lastName &&
          userData.email &&
          userData.password
        ) {
          const user = {
            id: utils.generateId(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            joinDate: utils.getCurrentDate(),
          };
          resolve(user);
        } else {
          reject(new Error("Registration failed"));
        }
      }, 1500);
    });
  },

  // Logout user
  logout: () => {
    state.currentUser = null;
    state.isLoggedIn = false;

    // Reset form fields
    domElements.loginEmail.value = "";
    domElements.loginPassword.value = "";
    formValidation.clearFormValidation();

    // Show login form
    domElements.loginArea.classList.remove("hidden");
    domElements.signupArea.classList.add("hidden");
    domElements.transactionArea.classList.add("hidden");

    // Update UI
    ui.updateNavigation();

    utils.showToast("You have been logged out successfully", "info");
  },
};

// Transaction
const transactions = {
  addDeposit: (amount) => {
    if (amount <= 0) {
      domElements.depositError.textContent = "Please enter a valid amount";
      domElements.depositError.classList.remove("hidden");
      domElements.depositAmount.classList.add("input-error");
      return false;
    }

    // Update state
    state.deposit += amount;
    state.balance += amount;

    // Add transaction to history
    const transaction = {
      id: utils.generateId(),
      date: utils.getCurrentDate(),
      description: "Deposit",
      amount: amount,
      type: "credit",
      status: "completed",
    };

    state.transactions.unshift(transaction);

    // Update UI
    ui.updateTransactionUI();

    // Clear input
    domElements.depositAmount.value = "";
    domElements.depositError.classList.add("hidden");
    domElements.depositAmount.classList.remove("input-error");

    utils.showToast(
      `Successfully deposited ${utils.formatCurrency(amount)}`,
      "success",
    );

    return true;
  },

  // Add withdraw
  addWithdraw: (amount) => {
    if (amount <= 0) {
      domElements.withdrawError.textContent = "Please enter a valid amount";
      domElements.withdrawError.classList.remove("hidden");
      domElements.withdrawAmount.classList.add("input-error");
      return false;
    }

    if (amount > state.balance) {
      domElements.withdrawError.textContent = "Insufficient funds";
      domElements.withdrawError.classList.remove("hidden");
      domElements.withdrawAmount.classList.add("input-error");
      return false;
    }

    // Update state
    state.withdraw += amount;
    state.balance -= amount;

    // Add transaction to history
    const transaction = {
      id: utils.generateId(),
      date: utils.getCurrentDate(),
      description: "Withdrawal",
      amount: amount,
      type: "debit",
      status: "completed",
    };

    state.transactions.unshift(transaction);

    // Update UI
    ui.updateTransactionUI();

    // Clear input
    domElements.withdrawAmount.value = "";
    domElements.withdrawError.classList.add("hidden");
    domElements.withdrawAmount.classList.remove("input-error");

    utils.showToast(
      `Successfully withdrew ${utils.formatCurrency(amount)}`,
      "success",
    );

    return true;
  },
};

// UI Update Functions
const ui = {
  updateTransactionUI: () => {
    domElements.currentDeposit.textContent = state.deposit.toFixed(2);
    domElements.currentWithdraw.textContent = state.withdraw.toFixed(2);
    domElements.currentBalance.textContent = state.balance.toFixed(2);

    // Update transaction history
    ui.updateTransactionHistory();
  },

  // Update transaction history
  updateTransactionHistory: () => {
    domElements.transactionHistory.innerHTML = "";

    state.transactions.forEach((transaction) => {
      const row = document.createElement("tr");
      row.className = "transaction-row";

      const amountClass =
        transaction.type === "credit" ? "text-success" : "text-error";
      const amountPrefix = transaction.type === "credit" ? "+" : "-";

      row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.description}</td>
        <td class="${amountClass} font-semibold">${amountPrefix}${utils.formatCurrency(
          transaction.amount,
        )}</td>
        <td><span class="badge badge-${
          transaction.status === "completed" ? "success" : "warning"
        }">${transaction.status}</span></td>
      `;

      domElements.transactionHistory.appendChild(row);
    });
  },

  // Update navigation
  updateNavigation: () => {
    if (state.isLoggedIn) {
      domElements.navLogin.innerHTML = `
        <i class="fas fa-user-circle mr-2"></i>
        ${state.currentUser.firstName}
        <i class="fas fa-chevron-down ml-2 text-xs"></i>
      `;
      domElements.navLogin.classList.remove("btn-primary");
      domElements.navLogin.classList.add("btn-ghost", "dropdown");

      // Add dropdown menu
      const existingDropdown = domElements.navLogin.nextElementSibling;
      if (
        existingDropdown &&
        existingDropdown.classList.contains("dropdown-content")
      ) {
        existingDropdown.remove();
      }

      const dropdownMenu = document.createElement("ul");
      dropdownMenu.className =
        "dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4";
      dropdownMenu.innerHTML = `
        <li><a href="#transaction-area"><i class="fas fa-tachometer-alt mr-2"></i> Dashboard</a></li>
        <li><a href="#"><i class="fas fa-cog mr-2"></i> Settings</a></li>
        <li><a href="#" id="nav-logout"><i class="fas fa-sign-out-alt mr-2"></i> Logout</a></li>
      `;

      domElements.navLogin.parentNode.appendChild(dropdownMenu);

      // Add logout event listener
      document.getElementById("nav-logout").addEventListener("click", (e) => {
        e.preventDefault();
        domElements.logoutModal.showModal();
      });
    } else {
      domElements.navLogin.innerHTML = "Login";
      domElements.navLogin.classList.remove("btn-ghost", "dropdown");
      domElements.navLogin.classList.add("btn-primary");

      const existingDropdown = domElements.navLogin.nextElementSibling;
      if (
        existingDropdown &&
        existingDropdown.classList.contains("dropdown-content")
      ) {
        existingDropdown.remove();
      }
    }
  },

  // Show loading state on button
  showButtonLoading: (button) => {
    const originalText = button.innerHTML;
    button.innerHTML = `
      <span class="loading"></span>
      Processing...
    `;
    button.disabled = true;

    return () => {
      button.innerHTML = originalText;
      button.disabled = false;
    };
  },

  // theme
  initTheme: () => {
    const savedTheme = localStorage.getItem("pioneer-bank-theme") || "light";
    state.theme = savedTheme;
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Update active theme button
    domElements.themeButtons.forEach((btn) => {
      if (btn.getAttribute("data-theme") === savedTheme) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  },

  // Change theme
  changeTheme: (theme) => {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pioneer-bank-theme", theme);

    // Update active theme button
    domElements.themeButtons.forEach((btn) => {
      if (btn.getAttribute("data-theme") === theme) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    utils.showToast(`Theme changed to ${theme}`, "info");
  },

  initScrollAnimations: () => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  },
};

// Event Listeners
const initEventListeners = () => {
  domElements.showSignupBtn.addEventListener("click", () => {
    domElements.loginArea.classList.add("hidden");
    domElements.signupArea.classList.remove("hidden");
    formValidation.clearFormValidation();
  });

  // Show Login Form
  domElements.showLoginBtn.addEventListener("click", () => {
    domElements.signupArea.classList.add("hidden");
    domElements.loginArea.classList.remove("hidden");
    formValidation.clearFormValidation();
  });

  // Login Button Event Handler
  domElements.loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!formValidation.validateLoginForm()) {
      return;
    }

    const email = domElements.loginEmail.value.trim();
    const password = domElements.loginPassword.value.trim();

    const resetButton = ui.showButtonLoading(domElements.loginBtn);

    auth
      .login(email, password)
      .then((user) => {
        state.currentUser = user;
        state.isLoggedIn = true;

        // Update UI
        domElements.userName.textContent = user.firstName;
        ui.updateNavigation();
        ui.updateTransactionUI();

        // Show transaction area
        domElements.loginArea.classList.add("hidden");
        domElements.signupArea.classList.add("hidden");
        domElements.transactionArea.classList.remove("hidden");

        // Scroll to transaction area
        document
          .getElementById("transaction-area")
          .scrollIntoView({ behavior: "smooth" });

        utils.showToast(`Welcome back, ${user.firstName}!`, "success");
      })
      .catch((error) => {
        utils.showToast(
          "Login failed. Please check your credentials.",
          "error",
        );
      })
      .finally(() => {
        resetButton();
      });
  });

  // Signup Button Event Handler
  domElements.signupBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!formValidation.validateSignupForm()) {
      return;
    }

    const userData = {
      firstName: domElements.signupFirstname.value.trim(),
      lastName: domElements.signupLastname.value.trim(),
      email: domElements.signupEmail.value.trim(),
      password: domElements.signupPassword.value.trim(),
    };

    const resetButton = ui.showButtonLoading(domElements.signupBtn);

    auth
      .signup(userData)
      .then((user) => {
        state.currentUser = user;
        state.isLoggedIn = true;

        // Update UI
        domElements.userName.textContent = user.firstName;
        ui.updateNavigation();
        ui.updateTransactionUI();

        // Show transaction area
        domElements.loginArea.classList.add("hidden");
        domElements.signupArea.classList.add("hidden");
        domElements.transactionArea.classList.remove("hidden");

        // Scroll to transaction area
        document
          .getElementById("transaction-area")
          .scrollIntoView({ behavior: "smooth" });

        utils.showToast(
          `Account created successfully! Welcome, ${user.firstName}!`,
          "success",
        );
      })
      .catch((error) => {
        utils.showToast("Registration failed. Please try again.", "error");
      })
      .finally(() => {
        resetButton();
      });
  });

  // Navigation login buttons
  [
    domElements.navLogin,
    domElements.mobileLogin,
    domElements.bannerLogin,
  ].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        document.getElementById("home").scrollIntoView({ behavior: "smooth" });
      });
    }
  });

  // Banner signup button
  if (domElements.bannerSignup) {
    domElements.bannerSignup.addEventListener("click", () => {
      document.getElementById("home").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        domElements.showSignupBtn.click();
      }, 500);
    });
  }

  // Deposit Button
  domElements.addDeposit.addEventListener("click", function () {
    const depositNumber = parseFloat(domElements.depositAmount.value);

    if (transactions.addDeposit(depositNumber)) {
    }
  });

  // Withdraw Button
  domElements.addWithdraw.addEventListener("click", function () {
    const withdrawNumber = parseFloat(domElements.withdrawAmount.value);

    if (transactions.addWithdraw(withdrawNumber)) {
    }
  });

  // Enter key for deposit and withdraw
  domElements.depositAmount.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      domElements.addDeposit.click();
    }
  });

  domElements.withdrawAmount.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      domElements.addWithdraw.click();
    }
  });

  // Theme buttons
  domElements.themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme");
      ui.changeTheme(theme);
    });
  });

  // Confirm logout
  domElements.confirmLogout.addEventListener("click", () => {
    auth.logout();
    domElements.logoutModal.close();
  });

  // Navigation links
  domElements.navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      domElements.navLinks.forEach((l) => l.classList.remove("active"));

      link.classList.add("active");

      // Close mobile menu if open
      const mobileMenu = document.querySelector(".dropdown-content");
      if (mobileMenu && mobileMenu.style.display === "block") {
        document.querySelector(".dropdown").click();
      }
    });
  });

  // Social login buttons
  document.querySelectorAll(".social-login").forEach((btn) => {
    btn.addEventListener("click", () => {
      const provider = btn.getAttribute("data-provider");
      utils.showToast(
        `${
          provider.charAt(0).toUpperCase() + provider.slice(1)
        } login would be implemented in a real application`,
        "info",
      );
    });
  });

  // Handle logo loading error
  document.querySelector("img")?.addEventListener("error", function () {
    this.style.display = "none";
    document.getElementById("logo-placeholder").style.display = "flex";
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // transaction UI
  ui.updateTransactionUI();
};

// Application
const initApp = () => {
  // theme
  ui.initTheme();

  // event listeners
  initEventListeners();

  // scroll animations
  ui.initScrollAnimations();
  const savedUser = localStorage.getItem("pioneer-bank-user");
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      state.currentUser = user;
      state.isLoggedIn = true;

      // Update UI
      domElements.userName.textContent = user.firstName;
      ui.updateNavigation();

      // Show transaction area
      domElements.loginArea.classList.add("hidden");
      domElements.signupArea.classList.add("hidden");
      domElements.transactionArea.classList.remove("hidden");
    } catch (error) {
      console.error("Error parsing saved user data:", error);
      localStorage.removeItem("pioneer-bank-user");
    }
  }

  console.log("Pioneer Bank application initialized successfully!");
};

document.addEventListener("DOMContentLoaded", initApp);

// JS End
// -------------------------------------------------
