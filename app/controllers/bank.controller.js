const Table = require("./table.js");
const Player = require("./jogador.js");
let start = 0;

exports.start = (req, res) => {
  Player.forEach((status) => {
    if (status.saldo > 0) {
      let randomnumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
      if (status.posicao + randomnumber >= 20) {
        randomnumber === 0
          ? (status.posicao = status.posicao + randomnumber - 19)
          : (status.posicao = status.posicao + randomnumber - 21);
        status.saldo = status.saldo + 100;
      } else {
        randomnumber === 0
          ? (status.posicao = status.posicao + randomnumber + 1)
          : (status.posicao = status.posicao + randomnumber - 1);
      }
      if (status.tipo === "impulsivo") {
        Table[status.posicao].jogador = 0;
        status.saldo = status.saldo - Table[status.posicao].valor;
      } else if (status.tipo === "exigente") {
        if (Table[status.posicao].aluguel > 50) {
          Table[status.posicao].jogador = 1;
          status.saldo = status.saldo - Table[status.posicao].valor;
        } else {
          Table[status.posicao].jogador === null
            ? null
            : (status.saldo = status.saldo - Table[status.posicao].aluguel);
        }
      } else if (status.tipo === "cauteloso") {
        if (status.saldo > 80) {
          Table[status.posicao].jogador = 2;
          status.saldo = status.saldo - Table[status.posicao].valor;
        } else {
          Table[status.posicao].jogador === null
            ? null
            : (status.saldo = status.saldo - Table[status.posicao].aluguel);
        }
      } else if (status.tipo === "aleatório") {
        if (randomnumber >= 4) {
          Table[status.posicao].jogador = 3;
        } else {
          Table[status.posicao].jogador === null
            ? (Table[status.posicao].jogador = null)
            : (status.saldo = status.saldo - Table[status.posicao].aluguel);
        }
      } else {
        console.log(error);
        res.status(500).send({
          Erro: "Jogador não encontrado!",
        });
      }
    }
  });

  let perdedoresDaRodada = Player.filter((status) => status.saldo <= 0);

  if (perdedoresDaRodada.length >= 1) {
    perdedoresDaRodada.forEach((status) => {
      Table = Table.map((value) => {
        return value.jogador === status.id ? (value.jogador = null) : "";
      });
    });

    if (perdedoresDaRodada.length >= 3) {
      res.status(200).send({
        Vencedor: vencedor,
        Jogadores: Player,
      });
      start = 1;
    } else {
      res.status(200).send({
        status: "Partida em andamento, jogue mais 1x",
        placar: Player,
      });
    }
  }
};
