export const EArcanotype = ["elemental", "divine", "mystical", "axum", "primal", "eonic", "animus", "esoteric"]

export const EEmblemType = ["default", "info", "warning", "tether", "stamina", "requirement", "priority", "power", "health", "buff", "debuff", "money", "die", "soul_charge", "order", "enchantment"]

export const EPrerequisiteTypes = ["attribute", "affinity", "class", "path", "nodefault", "race", "subrace", "fateline", "race_role", "minion_role"]

export const EActionType = ["free", "bonus", "quick", "standard", "long", "break", "downtime", "project", "passive"]

export type _UPrerequisiteType = "attribute" | "affinity" | "class" | "path" | "nodefault" | "race" | "fateline" | "race_role" | "minion_role" | "subrace"


export const ESpellSubtypes = ["base", "target", "skill", "edict", "summon"]

export const EWeaponSubtypes = ["base", "form", "skill", "order"]

export const ECommanderSubtypes = ["commander"]

export const EConditionSubtypes = ["buff", "debuff"]
export const ECardSubtypes = [...ESpellSubtypes, ...EWeaponSubtypes, ...ECommanderSubtypes, ...EConditionSubtypes]

export const EWeaponClass = ["light", "standard", "heavy", ""]
export const EWeaponType = ["axe", "blade", "bomb", "bow", "club", "polearm", "wand", "spear", "unarmed", "shield", "special"]

export const ECritDie = ["1", "2", "3", "4", "5", "6", "-", "?"]

export const ESkill = ["athletics", "handling", "stealth", "deduction", "identify", "science", "technology", "biology", "metaphysics", "spellcraft", "survival", "perception" ,"streetwise", "discovery", "diplomacy", "hostility", "guile", "lore", "occult", "society"]

export const ERefreshTypes = ["passive", "atWill", "perBattle", "perRefresh", "perDay", "perConnect", "perDowntime"]

export const EDamageTypes = ["magical", "physical", "raw", "none"]
export const EDamageSubtypes = ["none", "pierce", "slash", "impact", "water", "gale", "burn", "frost", "shock", "corrosive", "sensory", "curse", "holy", "soul"]

export const ESaveTypes = ["might", "agility", "skill", "awareness", "vitality", "knowledge", "mind", "presence", "authority", "endurance", "luck", "none"]