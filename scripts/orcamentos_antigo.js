function formatarNumero(num) {
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
}

function calcularTotal() {

}

document.addEventListener("DOMContentLoaded", function () {
    let alturaCM = 0;
    let larguraCM = 0;
    const materiais = {
        "LONA 380 GF": { "1": 70.00, "2": 60.00, "3": 55.00 },
        "LONA 440 GF": { "1": 75.00, "2": 65.00, "3": 60.00 },
        "LONA BACKLIGHT": { "1": 120.00, "2": 110.00, "3": 100.00 },
        "LONA FOSCA SEM TRAMA": { "1": 120.00, "2": 110.00, "3": 100.00 },
        "PAPEL OUTDOOR": { "1": 33.00, "2": 33.00, "3": 33.00 },
        "VINIL AVERY": { "1": 90.00, "2": 68.00, "3": 65.00 },
        "VINIL BLACKOUT": { "1": 100.00, "2": 75.00, "3": 70.00 },
        "VINIL ESPELHADO": { "1": 120.00, "2": 120.00, "3": 120.00 },
        "VINIL FOSCO": { "1": 100.00, "2": 90.00, "3": 85.00 },
        "VINIL PERFURADO": { "1": 120.00, "2": 120.00, "3": 120.00 },
        "VINIL RECORTADO": { "1": 120.00, "2": 100.00, "3": 85.00 },
        "VINIL TRANSPARENTE": { "1": 76.00, "2": 76.00, "3": 76.00 },
        // "ARMAÇÃO METALON" :{}
    };

    const materiaisComVerniz = ["LONA 380 GF", "LONA 440 GF", "LONA BACKLIGHT", "LONA FOSCA SEM TRAMA", "VINIL AVERY", "VINIL BLACKOUT", "VINIL FOSCO", "VINIL RECORTADO"];

    const materialSelect = document.getElementById("material");
    const larguraInput = document.getElementById("largura"); //RECEBE O VALOR DE LARGURA INSERIDO
    const alturaInput = document.getElementById("altura");
    const quantidadeInput = document.getElementById("quantidade");
    const calcularBtn = document.getElementById("calcular");
    const resultadoDiv = document.getElementById("resultado");
    const vernizCheckbox = document.getElementById("verniz");
    const vernizContainer = document.getElementById("verniz-container");

    Object.keys(materiais).forEach(material => {
        const option = document.createElement("option");
        option.value = material;
        option.textContent = material;
        materialSelect.appendChild(option);
    });

    materialSelect.addEventListener("change", function () {
        vernizContainer.style.display = materiaisComVerniz.includes(materialSelect.value) ? "block" : "none";
    });

    calcularBtn.addEventListener("click", function () {
        const material = materialSelect.value;
        const largura = parseFloat(larguraInput.value) / 100;  //CONVERTE O VALOR DE LARGURA INSERIDO DE CENTÍMETROS PARA METROS
        const altura = parseFloat(alturaInput.value) / 100;
        const quantidade = parseInt(quantidadeInput.value, 10);
        const areaTotal = largura * altura * quantidade;

        if (isNaN(largura) || isNaN(altura) || isNaN(quantidade) || largura <= 0 || altura <= 0 || quantidade <= 0) {
            resultadoDiv.innerHTML = "<p style='color: red;'>Preencha todos os campos corretamente!</p>";
            return;
        }

        let precoPorMetro = materiais[material]["1"];
        if (areaTotal >= 1) {
            precoPorMetro = materiais[material]["3"];
        } else if (areaTotal >= 0.5) {
            precoPorMetro = materiais[material]["2"];
        }

        if (vernizCheckbox.checked && materiaisComVerniz.includes(material)) {
            precoPorMetro += 15;
        }

        let precoTotal = areaTotal * precoPorMetro;
        const precoPorUnidade = precoTotal / quantidade;
    
        let resultadoTexto = `
        <textarea style="display: block; margin: auto; margin-top: 5px; width: 92%; height: 90%;">1 unidade do(a) ${material}${vernizCheckbox.checked ? " com verniz aplicado" : ""} no tamanho de ${formatarNumero(largura * 100)}x${formatarNumero(altura * 100)}cm custa R$${precoTotal.toFixed(2)}</textarea>
        `;

        if (quantidade > 1) {
            resultadoTexto = `
        <textarea style="display: block; margin: auto; margin-top: 5px; width: 92%; height: 90%;">${quantidade} unidades do(a) ${material}${vernizCheckbox.checked ? " com verniz aplicado" : ""} no tamanho de ${formatarNumero(largura * 100)}x${formatarNumero(altura * 100)}cm custam R$${precoTotal.toFixed(2)}.

Cada unidade sai por R$${formatarNumero(precoPorUnidade)}</textarea>
        `;
        }

        if (material == "PAPEL OUTDOOR") {
            alturaCM = formatarNumero((altura * 100));
            larguraCM = formatarNumero((largura * 100));
            if (areaTotal < 1) {
                precoTotal = 33;
            }
            if (quantidade > 1){
                resultadoTexto = `
                <textarea style="display: block; margin: auto; margin-top: 5px; width: 92%; height: 90%;">*${quantidade} unidades* do *PAPEL OUTDOOR* no tamanho de *${alturaCM}x${larguraCM}cm* custam *R$${precoTotal.toFixed(2)}*
                
Cada unidade sai por R$${(precoTotal/quantidade).toFixed(2)}</textarea>
                `;
            } else {
            resultadoTexto = `
            <textarea style="display: block; margin: auto; margin-top: 5px; width: 92%; height: 90%;">*1 unidade* do *PAPEL OUTDOOR* no tamanho de *${alturaCM}x${larguraCM}cm* custa R$${precoTotal.toFixed(2)}</textarea>
            `;
            }
        } 
        
        resultadoDiv.innerHTML = resultadoTexto;
        resultadoDiv.style.backgroundColor = "white";
        resultadoDiv.style.color = "black";
    });

});