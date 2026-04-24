// ============================================================
// dados.js — DADOS MOCKADOS DO CARDÁPIO
//
// Quando a API estiver pronta, SUBSTITUA este arquivo por:
//
//   const res = await fetch("http://ENDERECO-DO-BACK/cardapio");
//   const CARDAPIO = await res.json();
//
// O app.js não precisa de nenhuma alteração.
// O JSON do back deve ter a mesma estrutura abaixo,
// com "foto" e "fotoCat" contendo o caminho ou URL da imagem.
// ============================================================

const CARDAPIO = [
  {
    id: "entradas",
    titulo: "Entradas",
    barColor: "red",
    fotoCat: "src/entrada.png",         // foto da pill da categoria
    items: [
      {
        id: 1,
        nome: "Casquinha La Romana",
        descricao: "Massa crocante com queijo gorgonzola, parmesão e azeite.",
        preco: 19.90,
        foto: "src/casquinha.png"
      },
    ]
  },
  {
    id: "massas",
    titulo: "Massas Italianas",
    barColor: "green",
    fotoCat: "src/massas.png",
    items: [
      {
        id: 2,
        nome: "Lasanha",
        descricao: "Lasanha artesanal com camadas de molho bechamel e bolonhesa.",
        preco: 34.90,
        foto: "src/lasanha.png"
      },
      {
        id: 3,
        nome: "Gnocchi Tradicional",
        descricao: "Gnocchi de batata inglesa.",
        preco: 30.90,
        foto: "src/gnocchi.png"
      },
      {
        id: 4,
        nome: "Gnocchi Recheado",
        descricao: "Gnocchi de batata inglesa recheado com queijo mozzarella.",
        preco: 33.90,
        foto: "src/rechado.png"
      },
      {
        id: 5,
        nome: "Fettuccine Alfredo",
        descricao: "Massa fresca com molho cremoso de parmesão e manteiga.",
        preco: 38.90,
        foto: "src/macarrao.png"
      },
      {
        id: 6,
        nome: "Spaghetti",
        descricao: "Gnocchi de batata inglesa recheado com queijo mozzarella.",
        preco:26.90,
        foto: "src/spaghetti.png"
      }
    ]
  },
  {
    id: "pizza1",
    titulo: "Pizza Grande (8 fatias)",
    barColor: "red",
    fotoCat: "src/pizza.png",
    items: [
      {
        id: 7,
        nome: "Pizza - 1 sabor",
        descricao: "Pizzas com apenas um sabor.",
        preco: 49.90,
        foto: "src/pizza 1 sabor.png",
        modalCustom: "pizzagrande.html"
      },
      {
        id: 8,
        nome: "Pizza - 2 sabores",
        descricao: "Meio a Meio",
        preco: 49.90,
        foto: "src/meio a meio.png",
        modalCustom: "pizza2sabores.html"
      },
    ]
  },
  {
    id: "pizzas",
    titulo: "Pizza Pequena (Individual)",
    barColor: "red",
    fotoCat: "src/pizza.png",
    items: [
      {
        id: 9,
        nome: "Pizza Pequena",
        descricao: "Individual",
        preco: 17.90,
        foto: "src/pequena.png",
        modalCustom: "pizzapequena.html"
      },
    ]
    },

  {
    id: "bebidas",
    titulo: "Bebidas",
    barColor: "green",
    fotoCat: "src/bebida.png",
    items: [
      {
        id: 10,
        nome: "Água Mineral sem gás",
        preco: 3.90,
        foto: "src/agua.png"
      },
      {
        id: 11,
        nome: "Coca - Lata",
        preco: 6.90,
        foto: "src/cocalata.png"
      },
      {
        id: 12,
        nome: "Coca Tradicional - 1 Litro",
        preco: 13.90,
        foto: "src/coca1litro.png"
      },
      {
        id: 13,
        nome: "Cerveja",
        preco: 12.90,
        foto: "src/cerveja.png"
      },
      {
        id: 14,
        nome: "H2O Limoneto",
        preco: 8.90,
        foto: "src/limoneto.png"
      },
      {
        id: 15,
        nome: "Guaraná Antarctica",
        preco: 10.00,
        foto: "src/guarana.png"
      },
      {
        id: 16,
        nome: "Coca Zero - 1 Litro",
        preco: 13.90,
        foto: "src/cocazero.png"
      }
    ]
  },
  {
    id: "sobremesas",
    titulo: "Sobremesas",
    barColor: "green",
    fotoCat: "src/sobremesa.png",
    items: [
      {
        id: 17,
        nome: "Cheesecake de Frutas Vermelhas",
        preco: 19.90,
        foto: "src/sobremesa.png"
      }
    ]
  }
];