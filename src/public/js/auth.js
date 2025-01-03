function isTokenValid(token) {
  if (!token) return false;

  try {
    // Decodificando o token (sem verificar a assinatura aqui)
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Checando a expiração (se o token tiver um campo 'exp')
    const isExpired = payload.exp && payload.exp < Math.floor(Date.now() / 1000);
    
    return !isExpired;
  } catch (e) {
    return false;
  }
}

// Função para checar o status de login e redirecionar conforme necessário
function checkLogin() {
  const token = localStorage.getItem('token');

  if (isTokenValid(token)) {
    // Se o token for válido, redirecionar para a página protegida
    setTimeout(() => {
      window.location.href = 'user'; // Redireciona para outra página protegida
    }); // Espera 2 segundos antes do redirecionamento
  } else {
    // Se o token não for válido ou não existir, exibe a página de login
    document.getElementById('loginPage').style.display = 'block';
    setupLoginForm();
  }
}

// Função para configurar o formulário de login
function setupLoginForm() {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      try {
        // Enviar credenciais para o backend
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          // Armazenar o token no localStorage
          localStorage.setItem('token', data.token);
          alert('Login bem-sucedido!');

          // Após o login bem-sucedido, redireciona o usuário
          window.location.href = 'user'; // Ou para a página desejada
        } else {
          alert('Erro ao fazer login! Nome ou senha errados...');
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Erro ao fazer login! Tente novamente mais tarde.');
      }
    });
  }
}

// Chama a função checkLogin quando o script for carregado
checkLogin();