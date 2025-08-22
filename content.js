// --- Criar botão flutuante ---
function criarBotao() {
  if (document.getElementById("btn-orcamentos")) return;

  const botao = document.createElement("div");
  botao.id = "btn-orcamentos";
  botao.innerHTML = "$"; // pode trocar por SVG depois
  botao.style.position = "fixed";
  botao.style.left = "10px";   // gruda na lateral esquerda
  botao.style.bottom = "200px"; // 200px acima do rodapé
  botao.style.width = "50px";
  botao.style.height = "50px";
  botao.style.background = "#25D366"; // verde WhatsApp
  botao.style.borderRadius = "50%";
  botao.style.display = "flex";
  botao.style.alignItems = "center";
  botao.style.justifyContent = "center";
  botao.style.fontSize = "22px";
  botao.style.color = "white";
  botao.style.cursor = "pointer";
  botao.style.zIndex = "9999999";
  botao.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

  document.body.appendChild(botao);

  botao.addEventListener("click", togglePainel);
}

// --- Criar painel lateral ---
function criarPainel() {
  if (document.getElementById("painel-orcamentos")) return;

  const painel = document.createElement("div");
  painel.id = "painel-orcamentos";
  painel.style.position = "fixed";
  painel.style.top = "0";
  painel.style.right = "0";
  painel.style.width = "400px";
  painel.style.height = "100%";
  painel.style.background = "white";
  painel.style.boxShadow = "0 0 15px rgba(0,0,0,0.5)";
  painel.style.zIndex = "9998";
  painel.style.display = "none";

  const iframe = document.createElement("iframe");
  iframe.src = chrome.runtime.getURL("orcamentos.html");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  painel.appendChild(iframe);
  document.body.appendChild(painel);
}

// --- Alternar exibição ---
function togglePainel() {
  const painel = document.getElementById("painel-orcamentos");
  if (!painel) return;

  painel.style.display = painel.style.display === "none" ? "block" : "none";
}

// Inicia quando o DOM já carregou
window.addEventListener("load", () => {
  criarBotao();
  criarPainel();
});
