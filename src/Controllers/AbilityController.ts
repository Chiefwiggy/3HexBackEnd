import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {_IUserModel} from "../Models/UserModel";
import {Request, Response} from 'express'
import AbilityModel, {_IAbilityModel} from "../Models/AbilityModel";
import CharacterModel, {_IAffinities, _IAttributes, _ICharacterData} from "../Models/CharacterModel";
import AbilityRouter from "../Routers/AbilityRouter";
import {_CalcAffinities} from "./GetCardDataController";
import {_UPrerequisiteType} from "../Enums/CardEnums";


export const AddAbility = new ValidQueryBuilder()
    .addPerm("admin")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const result = new AbilityModel({...req.body});
            await result.save();
            res.status(201).json({
                status: "success",
                data: {...result}
            })
        } catch (err) {
            res.status(401).json(err);

        }
    })
    .exec();

export const GetAbilitiesForChar = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const char: _ICharacterData | null = await CharacterModel.findById(req.params["characterId"])
            if (!char) {
                res.status(404).send("Could not find character.")
            } else {
                const abilities: Array<_IAbilityModel> | null = await AbilityModel.find({});
                if (!abilities) {
                    res.status(500).send("Could not find abilities.");
                } else {
                    const {affinities, arcana} = _CalcAffinities(char);
                    res.status(200).json(abilities.filter(ability => {
                        return ability.prerequisites.reduce((pv, cv) => {
                            if (!pv) return false;
                            switch(cv.prerequisiteType) {
                                case "attribute":
                                    // console.log(character.characterStats[cv.skill as keyof _IAttributes].value)
                                    return char.characterStats[cv.skill as keyof _IAttributes].value >= cv.level;
                                case "affinity":
                                    // console.log(affinities[cv.skill as keyof _IAffinities])
                                    return affinities[cv.skill as keyof _IAffinities] >= cv.level;
                                case "class":
                                    return char.classes.filter(cc => cc.className.toLowerCase() == cv.skill.toLowerCase()).length > 0
                                case "arcana":
                                    // console.log(arcana[cv.skill as "arcane" | "warrior" | "support" | "hacker"], cv.level)
                                    return arcana[cv.skill as "arcane" | "warrior" | "support" | "hacker"] >= cv.level;
                                default:
                                    return pv;
                            }
                        }, true)
                    }));
                }
            }
        } catch (err) {
            res.status(500).json(err);
        }

    })
    .exec();

export const GetAbilitiesForClass = async(req: Request, res: Response) => {

    try {
        const abilities = await AbilityModel.find({})

        const filteredAbilities = abilities.filter(ability => {
            return ability.prerequisites.reduce((pv, cv) => {
                if (pv) return pv;
                if (cv.prerequisiteType == "class" && cv.skill == req.params["className"]) {
                    return true;
                }
                return pv;
            }, false)
        })

        res.status(200).json(filteredAbilities);
    } catch (e) {
        res.status(500).json(e);
    }

}



const GetAllAbilitiesForCriteria = async(req: Request, res: Response, prereqType: _UPrerequisiteType) => {
    try {
        const abilities = await AbilityModel.find({})

        const finalAbilities: { [key: string]: any[] } = {};

        abilities.forEach(ability => {
            ability.prerequisites.forEach((prerequisite) => {
                if (prerequisite.prerequisiteType == prereqType) {
                    const skill = prerequisite.skill;
                    if (skill) {
                        if (finalAbilities[skill]) {
                            finalAbilities[skill].push(ability);
                        } else {
                            finalAbilities[skill] = [ability];
                        }
                    }
                }
            });
        });


        res.status(200).json(finalAbilities);
    } catch (e) {
        res.status(500).json(e);
    }
}

export const GetAbilitiesForAllArcana = async(req: Request, res: Response) => {
    await GetAllAbilitiesForCriteria(req, res, "arcana");
}

export const GetAbilitiesForAllAffinities = async(req: Request, res: Response) => {
    await GetAllAbilitiesForCriteria(req, res, "affinity");
}

export const GetAbilitiesForAllClasses = async(req: Request, res: Response) => {
    await GetAllAbilitiesForCriteria(req, res, "class");
}