module.exports = Player.forEach((status) => {
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
});
