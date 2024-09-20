const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
  value: "Tomar 3L de água por dia",
  checked: false
}

let metas = [meta]

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite uma meta:" })

  if (meta.length == 0) {
    console.log("A meta não pode ser vazia.")
    return cadastrarMeta()
  }

  metas.push({ value: meta, checked: false })
}

const listarMeta = async () => {
  const respostas = await checkbox({
    message: "a seta seleciona a meta, a tecla de espaço marca ou desmarca a meta, e a tecla enter finaliza /",
    choices: [...metas],
    instructions: false
  })

  if (respostas.length == 0) {
    console.log("Nenhuma opção escolhida")
    return
  }

  metas.forEach((m) => {
    m.checked = false
  })

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })
    meta.checked = true
  })

  console.log("CONCLUÍDA!")
}


const start = async () => {

  while (true) {

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastro"
        }, {
          name: "Listar meta",
          value: "listar"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    })

    switch (opcao) {
      case "cadastro":
        await cadastrarMeta()
        console.log(metas)
        break
      case "listar":
        await listarMeta()
        break
      case "sair":
        return
    }
  }
}

start()