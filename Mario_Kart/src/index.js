const player1 = {
    NOME : "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}

const player2 = {
    NOME : "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
}

const player3 = {
    NOME : "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
}

const player4 = {
    NOME : "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
}

const player5 = {
    NOME : "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
}
const player6 = {
    NOME : "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
}

function rollDice(){
    return Math.floor(Math.random() * 6) + 1;

}




async function getRandomBlock() {
    let random = Math.round(1 * Math.random());
    let result
    switch (true) {
        case random < 0.33:
            result = "Reta";
            break;
        case random < 0.66:
            result = "Curva";
            break;
        default:
            result = "Confronto";
    }
    return result;
}


async function logRollResult(player1, speed1, player2, speed2) {
    const player1Roll = rollDice();
    const player2Roll = rollDice();

    console.log(`🎲 ${player1.NOME} rolou ${player1Roll}`);
    console.log(`🎲 ${player2.NOME} rolou ${player2Roll}`);

    const total1 = speed1 + player1Roll;
    const total2 = speed2 + player2Roll;
    let description = '';

    if (total1 > total2) {
        const pontosAntes = player2.PONTOS;
        player1.PONTOS++;
        player2.PONTOS = Math.max(0, pontosAntes - 1);
        const perdeu = pontosAntes > 0 ? 1 : 0;
        description = `\n🏆 Vencedor: ${player1.NOME} ganhou 1 ponto e ${player2.NOME} perdeu ${perdeu} ponto${perdeu === 1 ? '' : 's'}`;
    } else if (total2 > total1) {
        const pontosAntes = player1.PONTOS;
        player2.PONTOS++;
        player1.PONTOS = Math.max(0, pontosAntes - 1);
        const perdeu = pontosAntes > 0 ? 1 : 0;
        description = `\n🏆 Vencedor: ${player2.NOME} ganhou 1 ponto e ${player1.NOME} perdeu ${perdeu} ponto${perdeu === 1 ? '' : 's'}`;
    } else {
        description = `\n🤝 Empate! Nenhum jogador ganhou ou perdeu pontos.`;
    }

    console.log(`Velocidade de ${player1.NOME}: ${player1Roll} + ${speed1} = ${total1}`);
    console.log(`Velocidade de ${player2.NOME}: ${player2Roll} + ${speed2} = ${total2}`);
    console.log(description);
}


async function playRaceEngine(player1, player2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`\n🏁🚦${`-`.repeat(30)}🚦🏁`);
        console.log(`\n🏎️ Rodada ${round} - ${player1.NOME} vs ${player2.NOME}`);
        
        let block = await getRandomBlock();
        console.log(`🏁 Bloco: ${block}`);
        
        switch (block) {
            case "Reta":
                await logRollResult(player1, player1.VELOCIDADE, player2, player2.VELOCIDADE);

                break;
            case "Curva":
                await logRollResult(player1, player1.MANOBRABILIDADE, player2, player2.MANOBRABILIDADE);
                break;

            case "Confronto":
                await logRollResult(player1, player1.PODER, player2, player2.PODER);
                break;
        }

        console.log(`${player1.NOME} - Pontos: ${player1.PONTOS}`);
        console.log(`${player2.NOME} - Pontos: ${player2.PONTOS}`);
    }
    console.log(`\n🏁 Corrida finalizada!🏁`);
    console.log(`${`🏁-`.repeat(15)}`);
    console.log(`${player1.NOME} - Pontos: ${player1.PONTOS}`);
    console.log(`${player2.NOME} - Pontos: ${player2.PONTOS}`);
    if (player1.PONTOS > player2.PONTOS) {
        console.log(`\n🏆 ${player1.NOME} é o vencedor!`);
    } else if (player2.PONTOS > player1.PONTOS) {
        console.log(`\n🏆 ${player2.NOME} é o vencedor!`);
    } else {
        console.log(`\n🤝 Empate! Ambos os jogadores são vencedores!`);
    }
}

function sortearCorredores(players) {
    if (players.length < 2) {
        throw new Error("É necessário pelo menos 2 jogadores para sortear.");
    }
    const copia = [...players];

    // Embaralha o array
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    // Retorna os dois primeiros da lista embaralhada
    return [copia[0], copia[1]];
}



(async function main(){
    const players = [player1, player2, player3, player4, player5, player6];

    const [corredorA, corredorB] = sortearCorredores(players);
    console.log(`Sorteados: ${corredorA.NOME} vs ${corredorB.NOME}`);
    await playRaceEngine(corredorA, corredorB);

})();

