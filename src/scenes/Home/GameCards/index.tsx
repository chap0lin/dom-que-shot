import euNunca from '../../../assets/game-covers/eu-nunca.png';
import Bang from '../../../assets/game-covers/bang-bang.png';
import Vrum from '../../../assets/game-covers/vrum.png';
import OEscolhido from '../../../assets/game-covers/o-escolhido.png';
import Medusa from '../../../assets/game-covers/medusa.png';

type GameCardsProps = {
  image: string;
  title: string;
  id: number;
  color: string;
  description: string;
};

export const gameCards: GameCardsProps[] = [
  {
    image: euNunca,
    title: 'Eu nunca...',
    id: 1,
    color: '#8877DF',
    description: `É o "Eu Nunca" de sempre. O jogador da vez fala uma frase
    começada por "Eu Nunca" e quem já tiver feito o que ele
    falar deve virar uma dose. Aparecem sugestões para os pouco criativos.`,
  },
  {
    image: Bang,
    title: 'Bang Bang!',
    id: 2,
    color: '#800080',
    description: `3, 2, 1, BANG! Ao final da contagem regressiva, todos os jogadores verão
    um botão aparecer na tela de seus celulares. O último a conseguir apertar
    deve virar uma dose.`,
  },
  {
    image: Vrum,
    title: 'Vrum',
    id: 3,
    color: '#403A55',
    description: `Cada jogador na sua vez vai falar Vrum, IHHH ou ploft (é pra imitar um carro
    mesmo). 'Vrum' passa a vez para o próximo normalmente, 'IHHH' inverte o sentido
    da roda e 'Ploft' pula um jogador.`,
  },
  {
    image: OEscolhido,
    title: 'O Escolhido',
    id: 4,
    color: '#800080',
    description: `É um jogo de votação clássico. Vote em quem você acha que deve beber, e o mais
    votado vira uma dose. Se quiser votar em si mesmo está liberado.`,
  },
  {
    image: Medusa,
    title: 'Medusa',
    id: 5,
    color: '#403A55',
    description: `Todos abaixam a cabeça e assim ficam até o jogador da vez falar "Já". Aí todos
    erguem a cabeça e escolhem alguém da roda para encarar. Se dois jogadores se
    escolherem, aquele que falar "Medusa" por último tem de virar uma dose.`,
  },
];
