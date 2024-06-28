let parametros = new URLSearchParams(window.location.search);
let id = parametros.get("id");
console.log(id);

anfitriaoLogado = JSON.parse(localStorage.getItem('anfitriaoLogado'));
console.log(anfitriaoLogado);
const informacoesAnfitriao = anfitriaoLogado.info;

document.getElementById('infoAnfitriao').innerHTML = `<strong>Informações do Anfitrião: </strong>` +  informacoesAnfitriao;

fetch(`http://localhost:3001/volunt?id=${id}`)
  .then(res => res.json())
  .then(data => {
    if(data){
      console.log(data); 
      let voluntariado = data[0];
      document.getElementById('titulo').innerHTML = voluntariado.nome;
      document.getElementById('imagem').src = voluntariado.imagem;
      document.getElementById('anfitriao').innerHTML = `<strong>Anfitrião: </strong>` + voluntariado.anfitriao;
      document.getElementById('descricao').innerHTML = `<strong>Descrição do Projeto: </strong>` + voluntariado.resumo;
      document.getElementById('horario').innerHTML = `<strong>Horário: </strong>` + voluntariado.horario;
      document.getElementById('localizacao').innerHTML = `<strong>Localização: </strong>` + voluntariado.localizacao;
      document.getElementById('dias').innerHTML = `<strong>Dias:</strong> ${obterSelecionados(voluntariado.dia.opcoes)}`;

    } else {
      console.error(`Voluntariado com ID ${id} não encontrado.`);
    }
  })
  .catch(err => console.error('Erro ao buscar voluntariados:', err));

function obterSelecionados(opcoes) {
  const selecionados = opcoes.map(opcao => opcao.nome).join(", ");
  return selecionados;
}
