const genRouter = require('express-promise-router')()
const { Generator, TagTypeChance, TagType, Chance, Tag, } = require('../db/models')

// *****************************************************************************
// Generators

// Fetch a generator and all its details, including all odds
genRouter.get("/chances/:id(\\d+)", async (req, res) => {
  console.log("\n\nGETTING GEN...")

  const queriedGenerator = await Generator.findByPk(req.params.id, {
    attributes: ["id", "title"],
    include: [{
      model: TagTypeChance,
      attributes: ["id", "chanceLock"],
      include: [
        {
          model: TagType,
          attributes: ["id"],
          include: {
            model: Tag,
            attributes: ["id"],
            include: {
              model: Chance,
              attributes: ["id", "chance"],
            }
          }
        }
      ]
    }]
  })

  const generator = {
    id: queriedGenerator.id,
    title: queriedGenerator.title,
  }
  const tagTypeChances = {}

  queriedGenerator.TagTypeChances.forEach(ttc => {
    try {

      console.log("\ntagTypeChance", ttc.id)
      tagTypeChances[ttc.TagType.id] = {
        id: ttc.id,
        chanceLock: ttc.chanceLock,
        tagTypeId: ttc.TagType.id,
        tagChances: ttc.TagType.Tags.map(t => ({ tag_id: t.id, chance: t.Chance.chance })),
      }
    } catch (e) {
      console.error("CATCH", e)
    }
  })
  console.log("\n\nQUERIED GENERATOR?!", queriedGenerator)
  generator.tagTypeChanceIds = Object.keys(tagTypeChances).map(k => Number(k))

  console.log("\n\nGENERATOR?!", generator)
  return res.json({ generator, tagTypeChances })
})

// state.generator.tagTypes[0].chances[0].trait
// state.generator.tagTypes[0].chances[0].chance




// genRouter.get("/generators", async (req, res) => {
//   const generators = await Generator.findAll()
//   return res.json(generators)
// })

// Fetch all the custom generators of a user
// genRouter.get("/users/:id(\\d+)/generators", async (req, res) => {
// 
// })

// Fetch the GenTraitChances of one Category for a Generator
// genRouter.get("/generators/:genId(\\d+)/categories/:catId)\\d+)/chances", async (req, res) => {

// })

// TODO same deal...
// Fetch the odds for one trait type of a generator
// route.get("/generators/:genId/traitType/:typeId/traitOdds", async (req, res) => {
//   const traitChances = await TraitChance.findAll({where: })
//   return res.json(traitChances)
// })

module.exports = { genRouter }