function fazerLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    if (usuario && senha) {
        localStorage.setItem("usuarioLogado", true); // Salva o status de login
        alert("Login realizado com sucesso!");
        window.location.href = "index.html"; // Redireciona para o index.html
    } else {
        alert("Por favor, preencha todos os campos!");
    }
}
