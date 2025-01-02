document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.register-form');
    const passwordInput = document.getElementById('register-password');
    const emailInput = document.getElementById('register-email');
    const passwordError = document.getElementById('password-error');
    const emailError = document.getElementById('email-error');
  
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();

      let valid = true;
  
      // Verificação da senha
      if (!isValidPassword(passwordInput.value)) {
        passwordError.textContent = 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número.';
        valid = false;
      } else {
        passwordError.textContent = '';
      }
  
      // Verificação do e-mail
      checkEmailExists(emailInput.value).then(exists => {
        if (exists) {
          emailError.textContent = 'O e-mail já está registrado.';
          valid = false;
        } else {
          emailError.textContent = '';
        }
  
        if (valid) {
          registerForm.submit();
        }
      });
    });
  
    function isValidPassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return regex.test(password);
    }
  
    async function checkEmailExists(email) {
      // Simulação de verificação de e-mail no banco de dados
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      return data.exists;
    }
  });