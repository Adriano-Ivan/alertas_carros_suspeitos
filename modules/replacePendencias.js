const linkCSS = require("./linkCSS");

module.exports = (template, retorno, dados, tipo) => {
  let templateRetornado = template;
  console.log(typeof dados);
  const itens = dados.map(
    (registro, index) =>
      `<li class='item-${tipo}'><div><div class='id-${tipo}'>${index + 1} id(${
        registro.id
      })</div></div> <p class='desc-${tipo}'>${
        registro[`${tipo === "tarefa" ? "descricao" : "descricao_observacao"}`]
      }</p><form action="/update_${tipo}/" method='GET'enctype="application/x-www-form-urlencoded" role='form'><input type='number' class='desaparecer' name='id-registro-${tipo}'value=${
        registro.id
      }><button class='edicao-${tipo}'>↘</button></form><form action = '/delete_${tipo}/'method='post' enctype="application/x-www-form-urlencoded"><input type='number' class='desaparecer' name='id-registro-${tipo}' value=${
        registro.id
      }><button class='exclusao-${tipo}'>x</button></form></li>`
  );
  const listagem = `<ul class='lista-${tipo}'>${itens.join("")}</ul>`;
  const telaComLista = retorno.replace(
    `{%${tipo === "tarefa" ? "TAREFAS" : "OBSERVAÇÕES"}%}`,
    listagem
  );
  templateRetornado = templateRetornado
    .replace(
      /{%ELEMENT_OF_REPR%}/g,

      telaComLista
    )
    .replace(/{%ESTILO_CSS%}/g, linkCSS());
  //console.log("EITA...");
  return templateRetornado;
};
