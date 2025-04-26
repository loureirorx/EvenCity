// Global variables
let calendario = [];
let favoritos = [];
const eventos = [
    { id: 1, nome: "Festival de Música", data: "10 de Abril", local: "Copacabana", categoria: "Música", imagem: "/api/placeholder/400/200", descricao: "O maior festival de música do Rio de Janeiro com artistas nacionais e internacionais." },
    { id: 2, nome: "Feira de Artesanato", data: "15 de Abril", local: "Centro", categoria: "Arte", imagem: "/api/placeholder/400/200", descricao: "Exposição e venda de produtos artesanais de todo o Brasil." },
    { id: 3, nome: "Exposição de Fotografia", data: "20 de Abril", local: "Ipanema", categoria: "Arte", imagem: "/api/placeholder/400/200", descricao: "Coletânea de fotografias de paisagens naturais do Rio de Janeiro." },
    { id: 4, nome: "Show Internacional", data: "25 de Abril", local: "Maracanã", categoria: "Música", imagem: "/api/placeholder/400/200", descricao: "Show de uma das maiores bandas internacionais da atualidade." },
    { id: 5, nome: "Feira de Livros", data: "30 de Abril", local: "Centro Cultural", categoria: "Cultura", imagem: "/api/placeholder/400/200", descricao: "Exposição e venda de livros com autógrafos de autores renomados." },
    { id: 6, nome: "Festival de Rock", data: "5 de Maio", local: "Parque Lage", categoria: "Música", imagem: "/api/placeholder/400/200", descricao: "Festival de rock com bandas nacionais e internacionais." },
    { id: 7, nome: "Feira de Startups", data: "10 de Maio", local: "Barra da Tijuca", categoria: "Negócios", imagem: "/api/placeholder/400/200", descricao: "Encontro de startups e investidores do Rio de Janeiro." },
    { id: 8, nome: "Exposição de Arte Moderna", data: "15 de Maio", local: "MAM", categoria: "Arte", imagem: "/api/placeholder/400/200", descricao: "Exposição de arte moderna com obras de artistas contemporâneos." },
    { id: 9, nome: "Show de Jazz", data: "20 de Maio", local: "Teatro Municipal", categoria: "Música", imagem: "/api/placeholder/400/200", descricao: "Show de jazz com músicos renomados do cenário nacional." },
    { id: 10, nome: "Congresso de Inovação", data: "25 de Maio", local: "Centro de Convenções", categoria: "Negócios", imagem: "/api/placeholder/400/200", descricao: "Congresso sobre inovação e tecnologia com palestrantes internacionais." }
];

const lugares = [
    { nome: "Bar do Rio", tipo: "Bares", distancia: "200m", avaliacao: 4.5, imagem: "/api/placeholder/150/150" },
    { nome: "Museu de Arte Moderna", tipo: "Cultura", distancia: "500m", avaliacao: 4.8, imagem: "/api/placeholder/150/150" },
    { nome: "Restaurante Sabor Carioca", tipo: "Gastronomia", distancia: "300m", avaliacao: 4.3, imagem: "/api/placeholder/150/150" },
    { nome: "Café Vista Mar", tipo: "Cafés", distancia: "150m", avaliacao: 4.7, imagem: "/api/placeholder/150/150" },
    { nome: "Livraria Cultura", tipo: "Livrarias", distancia: "350m", avaliacao: 4.6, imagem: "/api/placeholder/150/150" }
];

// Inicializar todos os componentes do site quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
    carregarEventos();
    carregarLugares();
    carregarCalendario();
    carregarFavoritos();
    configuraçãoTema();
    
    // Configurar ouvintes de eventos para elementos interativos
    configurarEventos();
});

// Função para configurar todos os listeners de eventos
function configurarEventos() {
    // Configurar pesquisa ao digitar (com debounce)
    const pesquisaInput = document.getElementById("pesquisa");
    if (pesquisaInput) {
        pesquisaInput.addEventListener("input", debounce(buscarEventos, 300));
    }

    // Configurar envio de mensagem no fórum
    const enviarBtn = document.querySelector(".forum button");
    if (enviarBtn) {
        enviarBtn.addEventListener("click", enviarMensagem);
    }

    // Configurar seletor de tema
    const temaSelect = document.getElementById("tema");
    if (temaSelect) {
        temaSelect.addEventListener("change", mudarTema);
    }

    // Configurar botão de recomendação
    const recomendarBtn = document.querySelector(".recomendacoes button");
    if (recomendarBtn) {
        recomendarBtn.addEventListener("click", recomendarEvento);
    }

    // Configurar botão de transporte
    const transporteBtn = document.querySelector(".transporte button");
    if (transporteBtn) {
        transporteBtn.addEventListener("click", buscarTransporte);
    }

    // Configurar botão de adicionar evento
    const adicionarBtn = document.querySelector(".calendario button");
    if (adicionarBtn) {
        adicionarBtn.addEventListener("click", adicionarEventoManual);
    }

    // Configurar botão de alternar modo
    const alternarBtn = document.querySelector(".modo-usuario button");
    if (alternarBtn) {
        alternarBtn.addEventListener("click", alternarModo);
    }
}

// Função para carregar eventos na página
function carregarEventos() {
    const listaEventos = document.getElementById("lista-eventos");
    if (!listaEventos) return;

    listaEventos.innerHTML = '';

    eventos.forEach((evento, index) => {
        const div = document.createElement("div");
        div.className = "evento fade-in";
        div.setAttribute("data-id", evento.id);
        div.setAttribute("data-categoria", evento.categoria);
        
        const isFavorito = verificarFavorito(evento.id);
        const favoritoClass = isFavorito ? "favorito ativo" : "favorito";
        const favoritoText = isFavorito ? "❤️ Salvo" : "🤍 Salvar";

        div.innerHTML = `
            <div class="evento-imagem">
                <img src="${evento.imagem}" alt="${evento.nome}">
            </div>
            <div class="evento-conteudo">
                <h3>${evento.nome}</h3>
                <p class="evento-meta">📅 ${evento.data} | 📍 ${evento.local} | 🏷️ ${evento.categoria}</p>
                <p class="evento-descricao">${evento.descricao}</p>
                <div class="evento-acoes">
                    <span class="${favoritoClass}" data-id="${evento.id}" onclick="toggleFavorito(${evento.id})">${favoritoText}</span>
                    <button class="btn-detalhes" onclick="verDetalhes(${evento.id})">Ver Detalhes</button>
                </div>
            </div>
        `;
        listaEventos.appendChild(div);
    });

    // Adicionar animação de fade-in com atraso para cada evento
    const eventosElements = document.querySelectorAll('.evento');
    eventosElements.forEach((elemento, index) => {
        elemento.style.animationDelay = `${index * 0.1}s`;
    });
}

// Função para verificar se um evento está nos favoritos
function verificarFavorito(id) {
    return favoritos.some(evento => evento.id === id);
}

// Função para alternar evento como favorito
function toggleFavorito(id) {
    const evento = eventos.find(ev => ev.id === id);
    if (!evento) return;

    const index = favoritos.findIndex(ev => ev.id === id);
    
    if (index === -1) {
        // Adicionar aos favoritos
        favoritos.push(evento);
        mostrarNotificacao("❤️ Evento adicionado aos favoritos!");
    } else {
        // Remover dos favoritos
        favoritos.splice(index, 1);
        mostrarNotificacao("Evento removido dos favoritos");
    }

    // Salvar favoritos atualizados
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    
    // Atualizar interface
    carregarEventos();
    carregarFavoritos();
}

// Função para mostrar detalhes de um evento específico
function verDetalhes(id) {
    const evento = eventos.find(ev => ev.id === id);
    if (!evento) return;

    // Aqui você pode implementar um modal ou navegação para a página de detalhes
    const modal = document.createElement("div");
    modal.className = "modal-detalhes";
    modal.innerHTML = `
        <div class="modal-conteudo">
            <span class="fechar-modal" onclick="fecharModal()">&times;</span>
            <h2>${evento.nome}</h2>
            <img src="${evento.imagem}" alt="${evento.nome}" class="modal-imagem">
            <p class="evento-meta">📅 ${evento.data} | 📍 ${evento.local} | 🏷️ ${evento.categoria}</p>
            <p class="evento-descricao">${evento.descricao}</p>
            <div class="evento-acoes-modal">
                <button onclick="adicionarAoCalendario('${evento.nome}', '${evento.data}')">Adicionar à Agenda</button>
                <button onclick="toggleFavorito(${evento.id})">
                    ${verificarFavorito(evento.id) ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
                </button>
            </div>
        </div>
    `;
    
    // Remover modais existentes
    const modalExistente = document.querySelector(".modal-detalhes");
    if (modalExistente) {
        modalExistente.remove();
    }
    
    document.body.appendChild(modal);
    document.body.classList.add("modal-aberto");
}

// Função para fechar o modal de detalhes
function fecharModal() {
    const modal = document.querySelector(".modal-detalhes");
    if (modal) {
        modal.classList.add("desaparecer");
        setTimeout(() => {
            modal.remove();
            document.body.classList.remove("modal-aberto");
        }, 300);
    }
}

// Função para buscar eventos (com filtro)
function buscarEventos() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();
    const eventosElements = document.querySelectorAll(".evento");

    if (termo === "") {
        // Mostrar todos os eventos
        eventosElements.forEach(evento => {
            evento.style.display = "flex";
        });
        return;
    }

    // Filtrar eventos
    eventosElements.forEach(evento => {
        const conteudo = evento.textContent.toLowerCase();
        const categoria = evento.getAttribute("data-categoria").toLowerCase();
        
        if (conteudo.includes(termo) || categoria.includes(termo)) {
            evento.style.display = "flex";
        } else {
            evento.style.display = "none";
        }
    });
}

// Função para alternar entre modos turista e local
function alternarModo() {
    const modoAtual = localStorage.getItem("modo") || "turista";
    const novoModo = modoAtual === "turista" ? "local" : "turista";
    
    // Salvar o novo modo
    localStorage.setItem("modo", novoModo);
    
    // Atualizar a interface
    document.body.classList.remove(`modo-${modoAtual}`);
    document.body.classList.add(`modo-${novoModo}`);
    
    // Atualizar botão
    const botao = document.querySelector(".modo-usuario button");
    if (botao) {
        botao.innerHTML = `🌍 Alternar para ${novoModo === "turista" ? "Local" : "Turista"}`;
    }
    
    // Mostrar notificação
    mostrarNotificacao(`Modo alterado para ${novoModo === "turista" ? "Turista" : "Local"}!`);
    
    // Recarregar recomendações baseadas no novo modo
    carregarRecomendacoes(novoModo);
}

// Função para carregar recomendações baseadas no modo do usuário
function carregarRecomendacoes(modo) {
    const eventosRecomendados = modo === "turista" 
        ? eventos.filter(ev => ["Música", "Cultura", "Arte"].includes(ev.categoria))
        : eventos.filter(ev => ["Música", "Negócios", "Gastronomia"].includes(ev.categoria));
    
    // Implementar lógica para mostrar recomendações específicas
    const recomendacoesDiv = document.getElementById("resultado-recomendacao");
    if (recomendacoesDiv) {
        const recomendacao = eventosRecomendados[Math.floor(Math.random() * eventosRecomendados.length)];
        recomendacoesDiv.innerHTML = `
            <div class="recomendacao-card">
                <h4>Recomendado para você</h4>
                <p>${recomendacao.nome}</p>
                <button onclick="verDetalhes(${recomendacao.id})">Ver Detalhes</button>
            </div>
        `;
    }
}

// Função para enviar mensagem no fórum
function enviarMensagem() {
    const mensagemInput = document.getElementById("novaMensagem");
    const mensagem = mensagemInput.value.trim();
    
    if (mensagem === "") return;
    
    const mensagensDiv = document.getElementById("mensagens");
    const dataHora = new Date().toLocaleString();
    const usuario = localStorage.getItem("nomeUsuario") || "Usuário";
    
    const mensagemElement = document.createElement("div");
    mensagemElement.className = "mensagem fade-in";
    mensagemElement.innerHTML = `
        <div class="mensagem-cabecalho">
            <span class="mensagem-usuario">${usuario}</span>
            <span class="mensagem-data">${dataHora}</span>
        </div>
        <div class="mensagem-conteudo">
            ${mensagem}
        </div>
    `;
    
    mensagensDiv.appendChild(mensagemElement);
    mensagemInput.value = "";
    
    // Salvar mensagens no localStorage
    salvarMensagensForum();
    
    // Rolar para a última mensagem
    mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
}

// Função para salvar mensagens do fórum
function salvarMensagensForum() {
    const mensagens = document.querySelectorAll(".mensagem");
    const mensagensArray = [];
    
    mensagens.forEach(mensagem => {
        mensagensArray.push(mensagem.innerHTML);
    });
    
    localStorage.setItem("mensagensForum", JSON.stringify(mensagensArray));
}

// Função para carregar mensagens do fórum
function carregarMensagensForum() {
    const mensagensDiv = document.getElementById("mensagens");
    if (!mensagensDiv) return;
    
    const mensagensSalvas = JSON.parse(localStorage.getItem("mensagensForum") || "[]");
    
    mensagensDiv.innerHTML = "";
    
    mensagensSalvas.forEach(mensagem => {
        const mensagemElement = document.createElement("div");
        mensagemElement.className = "mensagem";
        mensagemElement.innerHTML = mensagem;
        mensagensDiv.appendChild(mensagemElement);
    });
}

// Função para adicionar evento manual ao calendário
function adicionarEventoManual() {
    const modal = document.createElement("div");
    modal.className = "modal-formulario";
    modal.innerHTML = `
        <div class="modal-conteudo">
            <span class="fechar-modal" onclick="fecharModal()">&times;</span>
            <h2>Adicionar Evento à Agenda</h2>
            <form id="form-evento">
                <div class="campo-formulario">
                    <label for="nome-evento">Nome do Evento:</label>
                    <input type="text" id="nome-evento" required>
                </div>
                <div class="campo-formulario">
                    <label for="data-evento">Data:</label>
                    <input type="text" id="data-evento" placeholder="DD/MM/AAAA" required>
                </div>
                <div class="campo-formulario">
                    <label for="local-evento">Local:</label>
                    <input type="text" id="local-evento">
                </div>
                <div class="campo-formulario">
                    <label for="notas-evento">Notas:</label>
                    <textarea id="notas-evento"></textarea>
                </div>
                <button type="submit">Adicionar à Agenda</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.classList.add("modal-aberto");
    
    // Configurar o formulário
    const formulario = document.getElementById("form-evento");
    formulario.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const nome = document.getElementById("nome-evento").value;
        const data = document.getElementById("data-evento").value;
        const local = document.getElementById("local-evento").value;
        const notas = document.getElementById("notas-evento").value;
        
        adicionarAoCalendario(nome, data, local, notas);
        fecharModal();
    });
}

// Função para adicionar evento ao calendário
function adicionarAoCalendario(nome, data, local = "", notas = "") {
    if (!nome || !data) return;
    
    const novoEvento = {
        id: Date.now(),
        nome,
        data,
        local,
        notas
    };
    
    calendario.push(novoEvento);
    localStorage.setItem("calendario", JSON.stringify(calendario));
    
    atualizarCalendario();
    mostrarNotificacao("Evento adicionado à sua agenda!");
}

// Função para atualizar o calendário
function atualizarCalendario() {
    const lista = document.getElementById("lista-calendario");
    if (!lista) return;
    
    lista.innerHTML = "";
    
    if (calendario.length === 0) {
        const mensagem = document.createElement("li");
        mensagem.className = "calendario-vazio";
        mensagem.textContent = "Você ainda não tem eventos na sua agenda";
        lista.appendChild(mensagem);
        return;
    }
    
    calendario.forEach(evento => {
        const item = document.createElement("li");
        item.className = "item-calendario";
        item.setAttribute("data-id", evento.id);
        
        item.innerHTML = `
            <div class="evento-calendario-info">
                <h4>${evento.nome}</h4>
                <p>📅 ${evento.data}${evento.local ? ` | 📍 ${evento.local}` : ''}</p>
                ${evento.notas ? `<p class="evento-notas">${evento.notas}</p>` : ''}
            </div>
            <div class="evento-calendario-acoes">
                <span onclick="removerDoCalendario(${evento.id})">🗑️</span>
            </div>
        `;
        
        lista.appendChild(item);
    });
}

// Função para remover evento do calendário
function removerDoCalendario(id) {
    const index = calendario.findIndex(evento => evento.id === id);
    
    if (index !== -1) {
        calendario.splice(index, 1);
        localStorage.setItem("calendario", JSON.stringify(calendario));
        atualizarCalendario();
        mostrarNotificacao("Evento removido da sua agenda");
    }
}

// Função para carregar o calendário do localStorage
function carregarCalendario() {
    calendario = JSON.parse(localStorage.getItem("calendario") || "[]");
    atualizarCalendario();
}

// Função para carregar favoritos do localStorage
function carregarFavoritos() {
    favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
}

// Função para exibir lugares próximos
function carregarLugares() {
    const lista = document.getElementById("lugares-recomendados");
    if (!lista) return;
    
    lista.innerHTML = "";
    
    lugares.forEach(lugar => {
        const item = document.createElement("div");
        item.className = "lugar fade-in";
        item.innerHTML = `
            <div class="lugar-imagem">
                <img src="${lugar.imagem}" alt="${lugar.nome}">
            </div>
            <div class="lugar-info">
                <h4>${lugar.nome}</h4>
                <p>${lugar.tipo}</p>
                <p class="lugar-meta">
                    <span>📍 ${lugar.distancia}</span>
                    <span>⭐ ${lugar.avaliacao}</span>
                </p>
            </div>
        `;
        lista.appendChild(item);
    });
}

// Função para recomendar eventos
function recomendarEvento() {
    const preferencia = document.getElementById("preferencia").value;
    const recomendacaoDiv = document.getElementById("resultado-recomendacao");
    
    if (!recomendacaoDiv) return;
    
    const recomendados = eventos.filter(evento => evento.categoria === preferencia);
    
    if (recomendados.length === 0) {
        recomendacaoDiv.innerHTML = `
            <div class="recomendacao-vazia">
                <p>⚠️ Ainda não temos eventos para essa categoria.</p>
            </div>
        `;
        return;
    }
    
    // Selecionar dois eventos aleatórios
    const eventosAleatorios = shuffle(recomendados).slice(0, 2);
    
    recomendacaoDiv.innerHTML = `
        <h3>Recomendações para você</h3>
        <div class="recomendacoes-container">
            ${eventosAleatorios.map(evento => `
                <div class="recomendacao-card fade-in">
                    <img src="${evento.imagem}" alt="${evento.nome}">
                    <h4>${evento.nome}</h4>
                    <p>${evento.data} | ${evento.local}</p>
                    <button onclick="verDetalhes(${evento.id})">Detalhes</button>
                </div>
            `).join('')}
        </div>
    `;
}

// Função para buscar transporte
function buscarTransporte() {
    const localUsuario = document.getElementById("localUsuario").value;
    const resultadoDiv = document.getElementById("resultado-transporte");
    
    if (!localUsuario) {
        resultadoDiv.innerHTML = `
            <div class="alerta-erro">
                ⚠️ Digite seu local para ver a melhor rota!
            </div>
        `;
        return;
    }
    
    // Pegar um destino aleatório de evento
    const eventoAleatorio = eventos[Math.floor(Math.random() * eventos.length)];
    const destinoEvento = `${eventoAleatorio.local}, Rio de Janeiro`;
    
    const url = `https://www.google.com/maps/dir/${encodeURIComponent(localUsuario)}/${encodeURIComponent(destinoEvento)}`;
    
    resultadoDiv.innerHTML = `
        <div class="resultado-rota">
            <h4>Rota para: ${eventoAleatorio.nome}</h4>
            <p>De: ${localUsuario}</p>
            <p>Para: ${eventoAleatorio.local}</p>
            <a href="${url}" target="_blank" class="botao-mapa">
                🗺️ Ver rota no Google Maps
            </a>
        </div>
    `;
}

// Função para mudar tema
function mudarTema() {
    const tema = document.getElementById("tema").value;
    
    // Remover classes de tema anteriores
    document.body.classList.remove("tema-claro", "tema-escuro", "tema-colorido");
    
    // Adicionar nova classe de tema
    document.body.classList.add(`tema-${tema}`);
    
    // Salvar preferência
    localStorage.setItem("temaSelecionado", tema);
    
    mostrarNotificacao(`Tema alterado para ${tema}!`);
}

// Função para carregar tema salvo
function configuraçãoTema() {
    const temaSalvo = localStorage.getItem("temaSelecionado") || "claro";
    
    document.body.classList.add(`tema-${temaSalvo}`);
    
    const temaSelect = document.getElementById("tema");
    if (temaSelect) {
        temaSelect.value = temaSalvo;
    }
    
    // Carregar modo
    const modoSalvo = localStorage.getItem("modo") || "turista";
    document.body.classList.add(`modo-${modoSalvo}`);
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem, tipo = "sucesso") {
    const notificacao = document.createElement("div");
    notificacao.className = `notificacao ${tipo}`;
    notificacao.innerHTML = mensagem;
    
    document.body.appendChild(notificacao);
    
    // Mostrar notificação
    setTimeout(() => {
        notificacao.classList.add("mostrar");
    }, 10);
    
    // Remover notificação
    setTimeout(() => {
        notificacao.classList.remove("mostrar");
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    }, 3000);
}

// Função debounce para evitar múltiplas chamadas
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Função para embaralhar array
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Detectar cliques fora do modal
document.addEventListener("click", function(event) {
    const modal = document.querySelector(".modal-detalhes, .modal-formulario");
    if (modal && event.target === modal) {
        fecharModal();
    }
});

// Adicionar listener para tecla ESC
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        fecharModal();
    }
});