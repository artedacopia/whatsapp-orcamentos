    const materiais = {
        "lona380": { "tab1": 70.00, "tab2": 60.00, "tab3": 55.00, "verniz": true, "recorte": false, "complemento": "da Lona 380g"},
        "lona440": { "tab1": 75.00, "tab2": 65.00, "tab3": 60.00, "verniz": true, "recorte": false, "complemento": "da Lona 440g"},
        "lonafront": { "tab1": 120.00, "tab2": 110.00, "tab3": 100.00, "verniz": true, "recorte": false, "complemento": "da Lona FrontLight"},
        "lonafosca": { "tab1": 120.00, "tab2": 110.00, "tab3": 100.00, "verniz": true, "recorte": false, "complemento": "da Lona Fosca"},
        "avery": { "tab1": 90.00, "tab2": 68.00, "tab3": 65.00, "verniz": true, "recorte": true, "complemento": "do Vinil Avery"},
        "blackout": { "tab1": 100.00, "tab2": 75.00, "tab3": 70.00, "verniz": true, "recorte": true, "complemento": "do Vinil Blackout"},
        "espelhado": { "tab1": 120.00, "tab2": 120.00, "tab3": 120.00, "verniz": false, "recorte": false, "complemento": "do Vinil Espelhado"},
        "fosco": { "tab1": 100.00, "tab2": 90.00, "tab3": 85.00, "verniz": true, "recorte": true, "complemento": "do Vinil Fosco"},
        "perfurado": { "tab1": 120.00, "tab2": 120.00, "tab3": 120.00, "verniz": false, "recorte": false, "complemento": "do Vinil Perfurado"},
        "transparente": { "tab1": 76.00, "tab2": 76.00, "tab3": 76.00, "verniz": false, "recorte": true, "complemento": "do Vinil Transparente"},
        "outdoor": { "tab1": 33.00, "tab2": 33.00, "tab3": 33.00, "verniz": false, "recorte": false, "complemento": "do Papel Outdoor"},
        "acabamentos": { "recorte1": 120.00, "recorte2": 100.00, "recorte3": 85.00, "verniz": 15.00}
        
    };

    function acabamento(){
        let material = document.querySelector("#material_opt").value;
        let verniz = document.querySelector("#boxverniz");
        let recorte = document.querySelector("#boxrecorte");
        let semacabamentos = document.querySelector("#semacabamentos");

        let permiteverniz = materiais[material].verniz;
        let permiterecorte = materiais[material].recorte;

        if (permiteverniz){
            verniz.style.display = "grid";
        } else {
            verniz.style.display = "none";
        }

        if (permiterecorte){
            recorte.style.display = "grid";
        } else {
            recorte.style.display = "none";
        }

        if (permiteverniz && permiterecorte || permiteverniz || permiterecorte){
            semacabamentos.style.display = "none";
        } else{
            semacabamentos.style.display = "grid";
        }
    }
    function calcular(){
        let verniz = document.querySelector("#boxverniz");
        let recorte = document.querySelector("#boxrecorte");
        let material = document.querySelector("#material_opt").value;
        let resultado = document.querySelector("#resultado");
        let quantidade = document.querySelector("#quantidade").value;
        let altura = document.querySelector("#altura").value / 100;
        let largura = document.querySelector("#largura").value / 100;
        let comverniz = document.querySelector("#verniz").checked;
        let comrecorte = document.querySelector("#recorte").checked;
        let complemento = materiais[material].complemento;
        let uni = "unidade";
        let fica = "custa";
        let m2unitario = altura*largura;
        let m2total = m2unitario*quantidade;
        let precom2 = 0;

        if (m2total >= 1){
            precom2 = materiais[material].tab3;
        } else if(m2total >= 0.5){
            precom2 = materiais[material].tab2;
        } else{
            precom2 = materiais[material].tab1;
        }

        if (comverniz){
            complemento += ` envernizado`;
            verniz.style.background = "green";
            verniz.style.color = "white";
            precom2 += 15;
        } else {
            verniz.style.background = "darkred";
            verniz.style.color = "white";
        }

        if (comrecorte){
            recorte.style.background = "green";
            recorte.style.color = "white";
            if (m2total >= 1){
                precom2 = materiais["acabamentos"].recorte3;
            } else if(m2total >= 0.5){
                precom2 = materiais["acabamentos"].recorte2;
            } else{
                precom2 = materiais["acabamentos"].recorte1;
            }
            if(comverniz){
                complemento += ` e recortado`;
                precom2 += 15;
            } else{
                complemento += ` recortado`
            }

        } else{
            recorte.style.background = "darkred";
            recorte.style.color = "white";
        }



        let total = quantidade * (altura*largura) * precom2;

        if(material == "outdoor" && m2total < 1){
            total = 33;
        }

        if(quantidade != 1){
            uni = "unidades";
            fica = "custam";
        }

        resultado.innerHTML = `<textarea>${quantidade} ${uni} ${complemento} no tamanho de ${altura*100}x${largura*100}cm ${fica} R$${total.toFixed(2)}</textarea>`;
    }

document.addEventListener("DOMContentLoaded", () => {
    const material = document.getElementById("material_opt");
    const verniz = document.getElementById("verniz");
    const recorte = document.getElementById("recorte");
    const quantidade = document.getElementById("quantidade");
    const altura = document.getElementById("altura");
    const largura = document.getElementById("largura");

    material.addEventListener("change", () => { acabamento(); calcular(); });
    verniz.addEventListener("change", calcular);
    recorte.addEventListener("change", calcular);
    quantidade.addEventListener("input", calcular);
    altura.addEventListener("input", calcular);
    largura.addEventListener("input", calcular);

  // primeira renderização
    acabamento();
    calcular();
});