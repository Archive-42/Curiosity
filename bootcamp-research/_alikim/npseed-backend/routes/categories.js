const catRouter = require('express-promise-router')()
const { Category, TraitType, Trait, TagType, Tag, } = require('../db/models')
const {
  normalizeCategory,
  normalizeTraitType,
  normalizeTrait,
  normalizeTagType,
} = require("./utils")

// Fetch only Categories
// catRouter.get("/", async (req, res) => {
//   const categories = await Category.findAll()
//   return res.json(categories)
// })

// const nameKey = "al860180991"
// https://www.behindthename.com/api/random.json?usage=fairy&key=al860180991
// https://www.behindthename.com/api/lookup.json?name=mira&key=al860180991
// catRouter.get("/name", async (req, res) => {
//   const appTagIds = await req.json()
//   let gender, usage;
//   appTagIds.includes(1) ? gender = `&gender=m` : gender = `&gender=f`
  
//   const usage = `usage=${u}`
// const gender = `&gender=${g}`
  
//   const resName = await fetch(`https://www.behindthename.com/api/random.json?${usage}${gender}&key=${nameKey}`)
//   if (resName.ok) {
//     const name = await resName.json()
//     console.log("fetched name", name)
//     return res.json(name)
//   } else {
//     return {error: "Name fetch failed"}
//   }
// })


catRouter.get("/all", async (req, res) => {

  const queriedCategories = await Category.findAll({
    attributes: ["id", "category"],
    include: {
      model: TraitType,
      attributes: ["id", "traitType"],
      include: [
        { model: TagType, attributes: ["id"] },
        {
          model: Trait,
          attributes: ["id", "trait"],
          include: { model: Tag, attributes: ["id"] }
        }
      ]
    }
  })

  const queriedTagTypes = await TagType.findAll({
    attributes: ["id", "tagType"],
    include: [{ model: Tag, attributes: ["id", "tag", "TagTypeId"] }]
  })

  categories = {}
  traitTypes = {}
  traits = {}
  console.log("\n\nQUERIED CATEGORIES", queriedCategories)
  queriedCategories.forEach(cat => {
    categories[cat.id] = normalizeCategory(cat)
    cat.TraitTypes.forEach(traitT => {
      traitTypes[traitT.id] = normalizeTraitType(traitT)
      traitT.Traits.forEach(trait => {
        traits[trait.id] = normalizeTrait(trait)
      })
    })
  })

  tagTypes = {}
  tags = {}

  queriedTagTypes.forEach(tagT => {
    tagTypes[tagT.id] = normalizeTagType(tagT)
    tagT.Tags.forEach(t => tags[t.id] = t)
  })

  console.log("\n\ncategories?", { categories })//, traitTypes, traits, tagTypes, tags })
  return res.json({ categories, traitTypes, traits, tagTypes, tags })
})




// Fetch all traits
catRouter.get("/traitTypes", async (req, res) => {
  const categories = await Category.findAll({
    attributes: ["id", "category"],
    include: {
      model: TraitType,
      attributes: ["id", "traitType"],
      include: [
        {
          model: TagType,
          attributes: ["id", "tagType"]
        },
        {
          model: Trait,
          attributes: ["id", "trait"],
          include: {
            model: Tag,
            attributes: ["id", "tag"]
          }
        }
      ]
    }
  })
  const cleanCats = categories.map(cat => {
    return {
      id: cat.id,
      category: cat.category,
      traitTypes: cat.TraitTypes.map(t => {
        return {
          id: t.id,
          type: t.traitType,
          tagTypes: t.TagTypes.map(t => {
            return {
              id: t.id,
              type: t.tagType,
            }
          }),
          traits: t.Traits.map(t => {
            return {
              id: t.id,
              trait: t.trait,
              tags: t.Tags.map(t => {
                return {
                  id: t.id,
                  tag: t.tag,
                }
              })
            }
          })
        }
      })
    }
  })
  console.log("\ncategories?", cleanCats[1])
  return res.json("f")
})

// Fetch TraitType/Traits of a Category
catRouter.get("/:id(\\d+)", async (req, res) => {
  const category = await Category.findByPk(catId, {
    include: {
      model: TraitType,
      attributes: ["id", "traitType", "CategoryId"],
      include: {
        model: Trait,
        attributes: ["id", "trait"]
      }
    }
  })
  const cleanCat = category.TraitTypes.map(type => {
    const traits = type.Traits.map(t => t.trait)
    return {
      catId: req.params.id,
      traitType: type.traitType,
      traits,
    }
  })
  console.log("\ncleanCat!", cleanCat)
  return res.json(cleanCat)
  // console.log("what is this??", jsonCat)
  // return jsonCat
})
// EXAMPLE
// [{
//   "catId": "1",
//   "traitType": "race",
//   "traits": [
//     "aasimar",
//     "human",
//     "tiefling"
//   ]
// }, {
//     "catId": "1",
//     "traitType": "age",
//     "traits": [
//       "adult",
//       "child",
//       "elder"
//     ]
//   }]

// Fetch Traits by TraitType id
// catRouter.get("/traitType/:id(\\d+)/traits", async (req, res) => {
//   const traits = await Trait.findAll({ where: { TraitTypeId: req.paramsId } })
//   return res.json(traits)
// })


// Fetch all TraitTypes
// catRouter.get("/traitTypes", async (req, res) => {
//   const traitTypes = await TraitType.findAll()
//   return res.json(traitTypes)
// })

module.exports = { catRouter }