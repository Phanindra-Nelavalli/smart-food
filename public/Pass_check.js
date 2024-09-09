document.getElementById("confirmpass").addEventListener("input", function () {
  const password = document.getElementById("password").value;
  const confirmPassword = this.value;
  const errorMessage = document.getElementById("error-message");

  if (password !== confirmPassword) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpass").value;

    if (password !== confirmPassword) {
      event.preventDefault(); // Prevent form submission
      document.getElementById("error-message").style.display = "block";
    }
  });
