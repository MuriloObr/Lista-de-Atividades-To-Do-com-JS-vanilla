let presets = {}
const presetEl = document.querySelector(".presset")

const load = window.addEventListener("load", loaded)
const addBt = document.querySelector(".bt-add")
addBt.addEventListener("click", addLista)

const resetBt = document.querySelector(".bt-reset")
resetBt.addEventListener("click", resetLista)

const saveBt = document.querySelector(".bt-save")
saveBt.addEventListener("click", salvarPreset)

document.querySelector(".dropdown").addEventListener("click", carregarPreset)

const DropBar = document.querySelector(".dropdown")
DropBar.addEventListener("input", carregarPreset)

const listChange = document.querySelector(".lista")
listChange.addEventListener("change", handleListChange)

const inpL = document.querySelectorAll(".to-do__text")
const checkL = document.querySelectorAll(".to-do__check")

function construtorEl(tag, classe = "", tipo = "none") {
  //Função para criar elementos
  const novoEl = document.createElement(tag)
  novoEl.className = classe
  novoEl.type = tipo
  return novoEl
}
function addLista() {
  const parent = document.querySelector(".lista")

  //Cria list item
  const newLi = construtorEl("li", "to-do")
  //Cria checkbox de li
  const newInCheck = construtorEl("input", "to-do__check", "checkbox")
  //Cria text input de li
  const newInText = construtorEl("input", "to-do__text", "text")
  //Escreve os novos elementos
  parent.appendChild(newLi)
  newLi.appendChild(newInCheck)
  newLi.appendChild(newInText)
}

function resetLista() {
  const checksEl = document.querySelectorAll(".to-do")

  checksEl.forEach((item) => {
    item.remove()
  })

  addLista()
}

function handleListChange() {
  const selectedPreset = DropBar.options[DropBar.selectedIndex].value
  salvarAtual(selectedPreset)
}

function salvarPreset() {
  const presetName = presetEl.value

  if (presetName.trim() === "")
    return handleSubmit("Seu preset Não possui Nome")

  const newOpt = construtorEl("option")
  newOpt.innerText = presetName
  DropBar.appendChild(newOpt)

  salvarAtual(presetName)
  resetLista()
  DropBar.value = "default"
  presetEl.value = ""
  handleSubmit("Seu preset foi salvo!", false)
}
function salvarAtual(name) {
  if (!typeof name === "string" || name === "default") return

  const txtList = [...document.querySelectorAll(".to-do__text")]

  const checkedOrNot = document.querySelectorAll(".to-do__check")
  const textos_checks = txtList.map(
    (listItem, index) => `${listItem.value},${checkedOrNot[index].checked}`
  )

  let objTxT = { [name]: textos_checks }

  Object.assign(presets, objTxT)

  localStorage.setItem("presets", JSON.stringify(presets))
}

function carregarPreset() {
  const pre = JSON.parse(localStorage.getItem("presets"))
  const preKeys = Object.keys(pre)

  const dropVal = document.querySelector(".dropdown").value

  const preList = preKeys.find((val) => {
    return val === dropVal
  })
  console.log(pre[preList])

  resetLista() //Reseta os valores e remove o ultimo input do reset
  document.querySelectorAll(".to-do")[0].remove()

  for (let set of pre[preList]) {
    const setList = set.split(",") //Divide a lista pela vírgula, logo os valores serão [valorInput, valorCheckbox]

    const docList = document.querySelector(".lista")

    const to_do = construtorEl("li", "to-do")

    const preCh = construtorEl("input", "to-do__check", "checkbox")
    preCh.checked = JSON.parse(setList[1])
    const preIn = construtorEl("input", "to-do__text", "text")
    preIn.value = setList[0]

    docList.appendChild(to_do)
    to_do.appendChild(preCh)
    to_do.appendChild(preIn)
  }
}

function loaded() {
  const pre = JSON.parse(localStorage.getItem("presets"))
  const preKeys = Object.keys(pre)

  for (let ob in pre) {
    //Salva os valores do localStorage no obj presets, pois ele inicia vazio
    let objStore = { [ob]: pre[ob] }
    presets = Object.assign(presets, objStore)
    console.log(presets)
  }
  for (let key of preKeys) {
    //Adiciona as keys(presets) nas options do select
    const newOpt = construtorEl("option")
    newOpt.value, (newOpt.innerText = key)
    document.querySelector(".dropdown").appendChild(newOpt)
  }
}

function handleSubmit(log, error = true) {
  const res = document.querySelector(".res")

  const resStyle = error ? { color: "red" } : { color: "green" }
  Object.assign(res.style, resStyle)

  res.textContent = log
}
