window.addEventListener('load', () => {
setTimeout(() => {
    document.querySelector('main').style.opacity = '1';
    const header = document.getElementById("header");
    header.innerHTML = `
        <div id="container">
            <nav id="desktop">
                <a href="index.html">Início</a>
                <a href="links.html">Links</a>
                <a href="telefones.html">Telefones</a>
                <a href="produtos.html">Produtos</a>
                <a href="ferramentas.html">Ferramentas</a>
                <a href="paginas/armacao_metalon/index.html">Armação Metalon</a>
            </nav>

            <div id="logo">
                <img src="imagens/logo01.png" alt="">
            </div>
        </div>
        `;
}, 100);
});
