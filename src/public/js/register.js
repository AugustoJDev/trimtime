document.getElementById('register-submit').addEventListener('click', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
  
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
  
    emailError.textContent = '';
    passwordError.textContent = '';
  
    // Verificar se o e-mail está no formato correto
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      emailError.textContent = 'Por favor, insira um e-mail válido.';
      return;
    }
  
    // Verificar se a senha tem 8 dígitos ou mais
    if (password.length < 8) {
      passwordError.textContent = 'A senha deve ter pelo menos 8 caracteres.';
      return;
    }
  
    try {
      // Enviar dados para o backend
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (response.ok) {
        alert('Registro bem-sucedido!');
        // Redirecionar ou realizar outras ações após o registro bem-sucedido
      } else {
        alert('Erro ao registrar! Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      alert('Erro ao registrar! Tente novamente mais tarde.');
    }
  });