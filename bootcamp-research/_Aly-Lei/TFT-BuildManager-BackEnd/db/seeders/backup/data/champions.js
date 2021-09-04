const { r } = require("./index-references");

const Champions = [
  {
    name: "Aatrox",
    cost: 4,
    image: "./set4/champions/TFT4_Aatrox.png",
  },
  {
    name: "Ahri",
    cost: 4,
    image: "./set4/champions/TFT4_Ahri.png",
  },
  {
    name: "Akali",
    cost: 3,
    image: "./set4/champions/TFT4_Akali.png",
  },
  {
    name: "Annie",
    cost: 2,
    image: "./set4/champions/TFT4_Annie.png",
  },
  {
    name: "Aphelios",
    cost: 2,
    image: "./set4/champions/TFT4_Aphelios.png",
  },
  {
    name: "Ashe",
    cost: 4,
    image: "./set4/champions/TFT4_Ashe.png",
  },
  {
    name: "Azir",
    cost: 5,
    image: "./set4/champions/TFT4_Azir.png",
  },
  {
    name: "Cassiopeia",
    cost: 4,
    image: "./set4/champions/TFT4_Cassiopeia.png",
  },
  {
    name: "Diana",
    cost: 1,
    image: "./set4/champions/TFT4_Diana.png",
  },
  {
    name: "Elise",
    cost: 1,
    image: "./set4/champions/TFT4_Elise.png",
  },
  {
    name: "Evelynn",
    cost: 3,
    image: "./set4/champions/TFT4_Evelynn.png",
  },
  {
    name: "Ezreal",
    cost: 5,
    image: "./set4/champions/TFT4_Ezreal.png",
  },
  {
    name: "Fiora",
    cost: 1,
    image: "./set4/champions/TFT4_Fiora.png",
  },
  {
    name: "Garen",
    cost: 1,
    image: "./set4/champions/TFT4_Garen.png",
  },
  {
    name: "Hecarim",
    cost: 2,
    image: "./set4/champions/TFT4_Hecarim.png",
  },
  {
    name: "Irelia",
    cost: 3,
    image: "./set4/champions/TFT4_Irelia.png",
  },
  {
    name: "Janna",
    cost: 2,
    image: "./set4/champions/TFT4_Janna.png",
  },
  {
    name: "JarvanIV",
    cost: 2,
    image: "./set4/champions/TFT4_JarvanIV.png",
  },
  {
    name: "Jax",
    cost: 2,
    image: "./set4/champions/TFT4_Jax.png",
  },
  {
    name: "Jhin",
    cost: 4,
    image: "./set4/champions/TFT4_Jhin.png",
  },
  {
    name: "Jinx",
    cost: 3,
    image: "./set4/champions/TFT4_Jinx.png",
  },
  {
    name: "Kalista",
    cost: 3,
    image: "./set4/champions/TFT4_Kalista.png",
  },
  {
    name: "Katarina",
    cost: 3,
    image: "./set4/champions/TFT4_Katarina.png",
  },
  {
    name: "Kayn",
    cost: 5,
    image: "./set4/champions/TFT4_Kayn.png",
  },
  {
    name: "Kennen",
    cost: 3,
    image: "./set4/champions/TFT4_Kennen.png",
  },
  {
    name: "Kindred",
    cost: 3,
    image: "./set4/champions/TFT4_Hunter.png",
  },
  {
    name: "LeeSin",
    cost: 5,
    image: "./set4/champions/TFT4_LeeSin.png",
  },
  {
    name: "Lillia",
    cost: 5,
    image: "./set4/champions/TFT4_Lillia.png",
  },
  {
    name: "Lissandra",
    cost: 1,
    image: "./set4/champions/TFT4_Lissandra.png",
  },
  {
    name: "Lulu",
    cost: 2,
    image: "./set4/champions/TFT4_Lulu.png",
  },
  {
    name: "Lux",
    cost: 3,
    image: "./set4/champions/TFT4_Lux.png",
  },
  {
    name: "Maokai",
    cost: 1,
    image: "./set4/champions/TFT4_Maokai.png",
  },
  {
    name: "Morgana",
    cost: 4,
    image: "./set4/champions/TFT4_Morgana.png",
  },
  {
    name: "Nami",
    cost: 1,
    image: "./set4/champions/TFT4_Nami.png",
  },
  {
    name: "Nidalee",
    cost: 1,
    image: "./set4/champions/TFT4_Nidalee.png",
  },
  {
    name: "NunuWillump",
    cost: 3,
    image: "./set4/champions/TFT4_Nunu.png",
  },
  {
    name: "Pyke",
    cost: 2,
    image: "./set4/champions/TFT4_Pyke.png",
  },
  {
    name: "Riven",
    cost: 4,
    image: "./set4/champions/TFT4_Riven.png",
  },
  {
    name: "Sejuani",
    cost: 4,
    image: "./set4/champions/TFT4_Sejuani.png",
  },
  {
    name: "Sett",
    cost: 5,
    image: "./set4/champions/TFT4_Sett.png",
  },
  {
    name: "Shen",
    cost: 4,
    image: "./set4/champions/TFT4_Shen.png",
  },
  {
    name: "Sylas",
    cost: 1,
    image: "./set4/champions/TFT4_Sylas.png",
  },
  {
    name: "TahmKench",
    cost: 1,
    image: "./set4/champions/TFT4_TahmnKench.png",
  },
  {
    name: "Talon",
    cost: 4,
    image: "./set4/champions/TFT4_Talon.png",
  },
  {
    name: "Teemo",
    cost: 2,
    image: "./set4/champions/TFT4_Teemo.png",
  },
  {
    name: "Thresh",
    cost: 2,
    image: "./set4/champions/TFT4_Thresh.png",
  },
  {
    name: "TwistedFate",
    cost: 1,
    image: "./set4/champions/TFT4_TwistedFate.png",
  },
  {
    name: "Vayne",
    cost: 1,
    image: "./set4/champions/TFT4_Vayne.png",
  },
  {
    name: "Veigar",
    cost: 3,
    image: "./set4/champions/TFT4_Veigar.png",
  },
  {
    name: "Vi",
    cost: 2,
    image: "./set4/champions/TFT4_Vi.png",
  },
  {
    name: "Warwick",
    cost: 4,
    image: "./set4/champions/TFT4_Warwick.png",
  },
  {
    name: "Wukong",
    cost: 1,
    image: "./set4/champions/TFT4_Wukong.png",
  },
  {
    name: "XinZhao",
    cost: 3,
    image: "./set4/champions/TFT4_XinZhao.png",
  },
  {
    name: "Yasuo",
    cost: 1,
    image: "./set4/champions/TFT4_Yasuo.png",
  },
  {
    name: "Yone",
    cost: 5,
    image: "./set4/champions/TFT4_Yone.png",
  },
  {
    name: "Yuumi",
    cost: 3,
    image: "./set4/champions/TFT4_Yuumi.png",
  },
  {
    name: "Zed",
    cost: 2,
    image: "./set4/champions/TFT4_Zed.png",
  },
  {
    name: "Zilean",
    cost: 5,
    image: "./set4/champions/TFT4_Zilean.png",
  },
];

const seedChampions = () => Champions.map((c) => r(c));

const lol = () =>
  Champions.map((t, i) => console.log(t.name + ":" + (i + 1) + ","));

module.exports = seedChampions;
