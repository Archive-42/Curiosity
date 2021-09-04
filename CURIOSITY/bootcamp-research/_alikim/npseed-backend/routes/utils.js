
function normalizeCategory(cat) {
  return {
    id: cat.id,
    category: cat.category,
    traitTypeIds: cat.TraitTypes.map(traitT => traitT.id),
  }
}


function normalizeTraitType(traitT) {
  // Return normalized traitType object. TagTypes and Traits are converts to ids
  return {
    id: traitT.id,
    traitType: traitT.traitType,
    tagTypeIds: traitT.TagTypes.map(tagT => tagT.id),
    traitIds: traitT.Traits.map(trait => trait.id),
  }
}


function normalizeTrait(tr) {
  // Return normalized trait object. Tags are converted to id list
  return {
    id: tr.id,
    trait: tr.trait,
    tagIds: tr.Tags.map(t => t.id),
  }
}


function normalizeTagType(tagT) {
  return {
    id: tagT.id,
    tagType: tagT.tagType,
    tagIds: tagT.Tags.map(t => t.id)
  }
}


module.exports = {
  normalizeCategory,
  normalizeTraitType,
  normalizeTrait,
  normalizeTagType,
}