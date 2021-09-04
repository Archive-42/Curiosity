SELECT "Character"."id",
  "Character"."name",
  "TraitTypes"."id" AS "TraitTypes.id",
  "TraitTypes"."traitType" AS "TraitTypes.traitType",
  "TraitTypes->CharTrait"."CharacterId" AS "TraitTypes.CharTrait.CharacterId",
  "TraitTypes->CharTrait"."TraitId" AS "TraitTypes.CharTrait.TraitId",
  "TraitTypes->CharTrait"."TraitTypeId" AS "TraitTypes.CharTrait.TraitTypeId",
  "TraitTypes->CharTrait"."createdAt" AS "TraitTypes.CharTrait.createdAt",
  "TraitTypes->CharTrait"."updatedAt" AS "TraitTypes.CharTrait.updatedAt",
  "TraitTypes->Traits"."id" AS "TraitTypes.Traits.id",
  "TraitTypes->Traits"."trait" AS "TraitTypes.Traits.trait"
FROM "Characters" AS "Character"
  INNER JOIN (
    "CharTraits" AS "TraitTypes->CharTrait"
    INNER JOIN "TraitTypes" AS "TraitTypes" ON "TraitTypes"."id" = "TraitTypes->CharTrait"."TraitTypeId"
  ) ON "Character"."id" = "TraitTypes->CharTrait"."CharacterId"
  AND "TraitTypes"."CategoryId" = 1
  LEFT OUTER JOIN (
    "Traits" AS "TraitTypes->Traits"
    INNER JOIN "CharTraits" AS "TraitTypes->Traits->CharTraits" ON "TraitTypes->Traits"."id" = "TraitTypes->Traits->CharTraits"."TraitId"
    AND "TraitTypes->Traits->CharTraits"."CharacterId" = '1'
  ) ON "TraitTypes"."id" = "TraitTypes->Traits"."TraitTypeId"
WHERE "Character"."UserId" = '1';