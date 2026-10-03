export interface Tranca {
  id: number;
  nome: string;
  preco: string;
  duracao: string;
  imagem: string;
  desc: string;
}

export const servicosTrancas: Tranca[] = [
  {
    id: 1,
    nome: 'Box Braids Clássica',
    preco: '180,00',
    duracao: '4h a 5h',
    imagem: '/box-braids.jpg',
    desc: 'Tranças individuais com mechas sintéticas (Kanekalon ou Jumbo). Excelente durabilidade e versatilidade de penteados.'
  },
  {
    id: 2,
    nome: 'Trança Nagô Desenhada',
    preco: '120,00',
    duracao: '1h30 a 2h',
    imagem: '/nage.jpg',
    desc: 'Tranças rasteiras feitas rente ao couro cabeludo, formando padrões geométricos e designs personalizados de ancestralidade.'
  },
  {
    id: 3,
    nome: 'Goddess Braids',
    preco: '220,00',
    duracao: '4h30 a 6h',
    imagem: '/goddess.jpg',
    desc: 'O charme das box braids tradicionais combinado com pontas e mechas cacheadas soltas ao longo do comprimento.'
  }
];
