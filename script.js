const passwordInput = document.querySelector("#password");
const visibilityToggle = document.querySelector("#visibility-toggle");
const strengthMeter = document.querySelector("#strength-meter");
const strengthMessage = document.querySelector("#strength-message");
const requirements = [...document.querySelectorAll("[data-rule]")];

const checks = {
  length: (password) => password.length >= 8,
  long: (password) => password.length >= 12,
  lower: (password) => /[a-z]/.test(password),
  upper: (password) => /[A-Z]/.test(password),
  number: (password) => /\d/.test(password),
  symbol: (password) => /[^A-Za-z0-9]/.test(password),
};

const strengthLabels = ["", "Very weak", "Weak", "Fair", "Strong", "Very strong"];

function updateStrength() {
  const password = passwordInput.value;

  if (!password) {
    requirements.forEach((item) => item.classList.remove("is-met"));
    strengthMeter.removeAttribute("data-level");
    strengthMeter.setAttribute("aria-label", "Password strength: not checked");
    strengthMessage.textContent = "Not checked";
    return;
  }

  let score = 0;
  requirements.forEach((item) => {
    const rule = item.dataset.rule;
    const met = checks[rule](password);
    item.classList.toggle("is-met", met);
    if (met) score += 1;
  });

  const level = Math.max(1, Math.min(5, score));
  const label = strengthLabels[level];
  strengthMeter.dataset.level = String(level);
  strengthMeter.setAttribute("aria-label", `Password strength: ${label.toLowerCase()}`);
  strengthMessage.textContent = label;
}

passwordInput.addEventListener("input", updateStrength);

visibilityToggle.addEventListener("click", () => {
  const isPasswordHidden = passwordInput.type === "password";
  passwordInput.type = isPasswordHidden ? "text" : "password";
  visibilityToggle.setAttribute("aria-pressed", String(isPasswordHidden));
  visibilityToggle.setAttribute(
    "aria-label",
    isPasswordHidden ? "Hide password" : "Show password",
  );
});
