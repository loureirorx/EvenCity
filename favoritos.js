document.addEventListener("DOMContentLoaded", function() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    console.log("Eventos Favoritos Carregados:", favoritos); // Teste no console
    const lista = document.getElementById("lista-favoritos");

    lista.innerHTML = "";

    if (favoritos.length === 0) {
        lista.innerHTML = "<p>⚠️ Nenhum evento favorito salvo.</p>";
        return;
    }

    favoritos.forEach((evento, index) => {
        const item = document.createElement("li");
        item.innerHTML = `🎟️ <strong>${evento.nome}</strong> - ${evento.data} - ${evento.local} <button onclick="removerFavorito(${index})">❌ Remover</button>`;
        lista.appendChild(item);
    });
});

// Função para remover favoritos
function removerFavorito(index) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos.splice(index, 1);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    location.reload(); // Atualiza a página para refletir a mudança
}
