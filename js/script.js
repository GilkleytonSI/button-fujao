// Variável para controlar o estado de fuga
let estaFugindo = false;

function verificarProximidade(e) {
    const botaoNao = document.getElementById("nao");
    const rect = botaoNao.getBoundingClientRect();
    const botaoX = rect.left + rect.width / 2;
    const botaoY = rect.top + rect.height / 2;
    
    // Distância entre o cursor e o centro do botão
    const distancia = Math.sqrt(Math.pow(e.clientX - botaoX, 2) + Math.pow(e.clientY - botaoY, 2));
    
    // Se o cursor estiver a menos de 100px do botão e não estiver fugindo ainda
    if (distancia < 100 && !estaFugindo) {
        fugirDaTela();
    }
}

function fugirDaTela() {
    estaFugindo = true;
    const botaoNao = document.getElementById("nao");
    
    // Tamanhos da janela e do botão
    const larguraJanela = window.innerWidth;
    const alturaJanela = window.innerHeight;
    const botaoLargura = botaoNao.offsetWidth;
    const botaoAltura = botaoNao.offsetHeight;
    
    // Posição aleatória garantindo que o botão não saia da tela
    const maxX = larguraJanela - botaoLargura;
    const maxY = alturaJanela - botaoAltura;
    
    // Gerar posição aleatória com preferência para o lado oposto
    const atualX = parseInt(botaoNao.style.left) || 0;
    const novoX = atualX < larguraJanela/2 ? 
                 Math.floor(Math.random() * maxX * 0.7 + maxX * 0.3) : 
                 Math.floor(Math.random() * maxX * 0.7);
    
    const atualY = parseInt(botaoNao.style.top) || 0;
    const novoY = atualY < alturaJanela/2 ? 
                 Math.floor(Math.random() * maxY * 0.7 + maxY * 0.3) : 
                 Math.floor(Math.random() * maxY * 0.7);
    
    // Aplicar a nova posição com animação
    botaoNao.style.transition = "left 0.5s ease-out, top 0.5s ease-out";
    botaoNao.style.left = novoX + "px";
    botaoNao.style.top = novoY + "px";
    
    // Resetar após a animação
    setTimeout(() => {
        estaFugindo = false;
        botaoNao.style.transition = "";
    }, 500);
}

// Event listeners
document.addEventListener("mousemove", verificarProximidade);
document.getElementById("nao").addEventListener("touchstart", function(e) {
    e.preventDefault();
    fugirDaTela();
});

function parabens() {
    // Melhorando o alerta para mobile
    var painel = document.querySelector(".painel");
    painel.innerHTML = `
        <h1>Parabéns! ❤️</h1>
        <img src="images/ursinho.gif" alt="Ursinho feliz" style="max-width: 70%;">
        <h3>Você fez uma ótima escolha!</h3>
        <p>Te amo muito! 😘</p>
    `;
    painel.style.padding = "30px 20px";
    
    // Opcional: tocar um som comemorativo
    // new Audio('sounds/celebração.mp3').play();
}