document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    fullname: form.fullname.value,
    email: form.email.value,
    username: form.username.value,
    password: form.password.value,
    confirmPassword: form.confirmPassword.value,
    location: form.location?.value || "",
    skill: form.skill?.value || "",
  };

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert(result.message);
      window.location.href = "auth.html";
    } else {
      alert(result.message || "Registration failed");
    }
  } catch (err) {
    alert("Something went wrong. Please try again.");
    console.error(err);
  }
});
