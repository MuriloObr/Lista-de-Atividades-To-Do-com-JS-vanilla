let presets = {};

const load = window.addEventListener("load", loaded);
const addBt = document.querySelector(".bt-add").addEventListener("click", addLista);
const resetBt = document.querySelector(".bt-reset").addEventListener("click", resetLista);
const saveBt = document.querySelector(".bt-save").addEventListener("click", salvarPreset);
document.querySelector(".dropdown").addEventListener("click", carregarPreset);
const DropBar = document.querySelector(".dropdown").addEventListener("input", carregarPreset);
const listChange = document.querySelector(".lista").addEventListener("change", changeVerify)

const inpL = document.querySelectorAll(".to-do__text");
const checkL = document.querySelectorAll(".to-do__check");
function changeVerify() {
    const preName = document.querySelector(".dropdown").value;
    salvarAtual(preName);
    console.log(preName);
}

function construtorEl(tag, classe = "", tipo = "none") {//Função para criar elementos
    const novoEl = document.createElement(tag);
    novoEl.className = classe;
    novoEl.type = tipo;
    return novoEl;
}
function addLista() {
    valorZero();

    const parent = document.querySelector(".lista");

    //Cria list item
    const newLi = construtorEl("li", "to-do");
    //Cria checkbox de li
    const newInCheck = construtorEl("input", "to-do__check", "checkbox");
    //Cria text input de li
    const newInText = construtorEl("input", "to-do__text", "text");
    //Escreve os novos elementos
    parent.appendChild(newLi);
    newLi.appendChild(newInCheck);
    newLi.appendChild(newInText);
}

function resetLista() {
    valorZero();

    const checksEl = document.querySelectorAll(".to-do");

    for (let item of checksEl) {//Deleta todos os elementos com classe to-do
        console.log("Deletando " + item);
        item.remove();
    }

    addLista();//Adiciona uma linha no final da exec
    
}

function salvarPreset() {
    valorZero();

    const dropBox = document.querySelector(".dropdown");
    const presetName = document.querySelector(".presset").value;

    const newOpt = construtorEl("option");
    newOpt.innerText = presetName;//Altera o texto da opc para o valor digitado
    dropBox.appendChild(newOpt);

    salvarAtual(presetName);
    resetLista();
}
function salvarAtual(name) {
    valorZero();

    if (typeof(name) === "string") {
        let textos_checks = [];
        let objTxT;
        const txtList = Array.prototype.slice.call(document.querySelectorAll(".to-do__text"));
        const checkedOrNot = document.querySelectorAll(".to-do__check");
        for (let txt of txtList) {// Salva o valor de cada linha em um array
            textos_checks.push(`${txt.value},${checkedOrNot[txtList.indexOf(txt)].checked}`);
        }

        objTxT = {[name]:textos_checks};

        presets = Object.assign(presets, objTxT);
        
        localStorage.setItem("presets", JSON.stringify(presets));
        console.log(presets);
    }
}

function carregarPreset() {
    valorZero();

    const pre = JSON.parse(localStorage.getItem("presets"));
    const preKeys = Object.keys(pre);

    const dropVal = document.querySelector(".dropdown").value;

    const preList = preKeys.find((val => {return val === dropVal}));
    console.log(pre[preList]);

    resetLista()//Reseta os valores e remove o ultimo input do reset
    document.querySelectorAll(".to-do")[0].remove();

    for (let set of pre[preList]) {
        const setList = set.split(",");//Divide a lista pela vírgula, logo os valores serão [valorInput, valorCheckbox]

        const docList = document.querySelector(".lista");

        const to_do = construtorEl("li", "to-do");

        const preCh = construtorEl("input", "to-do__check", "checkbox");
        preCh.checked = JSON.parse(setList[1]);
        const preIn = construtorEl("input", "to-do__text", "text");
        preIn.value = setList[0];
        
        docList.appendChild(to_do);
        to_do.appendChild(preCh);
        to_do.appendChild(preIn);
    }

}

function loaded() {
    valorZero();

    const pre = JSON.parse(localStorage.getItem("presets"));
    const preKeys = Object.keys(pre);

    for (let ob in pre) {//Salva os valores do localStorage no obj presets, pois ele inicia vazio
        let objStore = {[ob]:pre[ob]}
        presets = Object.assign(presets, objStore);
        console.log(presets);
    }
    for (let key of preKeys) {//Adiciona as keys(presets) nas options do select
        const newOpt = construtorEl("option");
        newOpt.value, newOpt.innerText = key;
        document.querySelector(".dropdown").appendChild(newOpt);
    }
}

function valorZero() {
    console.log("Trigger");
    const z = document.querySelectorAll("option");
    console.log(z);
    for (let v of z) {
        if (v.value === "") {
            console.log(v);
            v.remove();
        }
    }
}