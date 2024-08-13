export const EArcanotype = ["elemental", "divine", "mystical", "axum", "primal", "eonic", "animus", "esoteric"]

export const EEmblemType = ["default", "info", "warning", "tether", "stamina", "requirement", "priority", "power"]

export const EPrerequisiteTypes = ["attribute", "affinity", "class", "arcana"]

export const EActionType = ["free", "bonus", "quick", "standard", "long", "break", "downtime", "project", "passive"]

export type _UPrerequisiteType = "attribute" | "affinity" | "class" | "arcana"


export const ESpellSubtypes = ["base", "target", "skill", "edict"]

export const EWeaponSubtypes = ["base", "form", "skill"]

export const ECommanderSubtypes = ["commander"]
export const ECardSubtypes = [...ESpellSubtypes, ...EWeaponSubtypes, ...ECommanderSubtypes]

export const EWeaponClass = ["light", "standard", "heavy", ""]
export const EWeaponType = ["axe", "blade", "bomb", "bow", "club", "polearm", "wand", "spear", "unarmed", "special"]

export const ECritDie = ["1", "2", "3", "4", "5", "6", "-", "?"]

export const ESkill = ["athletics", "handling", "stealth", "deduction", "identify", "science", "technology", "biology", "metaphysics", "spellcraft", "survival", "perception" ,"streetwise", "discovery", "diplomacy", "hostility", "guile", "lore", "occult", "society"]

export const ERefreshTypes = ["passive", "atWill", "perBattle", "perRefresh", "perDay", "perConnect", "perDowntime"]

export const EDamageTypes = ["magical", "physical", "raw", "none"]
export const EDamageSubtypes = ["none", "crushing", "piercing", "slashing", "fire", "frost", "shock", "gravity", "light", "water", "perception", "curse"]

export const ESaveTypes = ["might", "agility", "skill", "awareness", "vitality", "knowledge", "mind", "presence", "authority", "endurance", "luck", "none"]