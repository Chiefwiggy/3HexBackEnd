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
                    const {affinities, path} = _CalcAffinities(char);
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
                                    const clz = char.classes.find(cc => cc.className.toLowerCase() == cv.skill.toLowerCase())
                                    if (clz) {
                                        if (cv.level == 1) {
                                            return true;
                                        } else {
                                            return clz.isPromoted;
                                        }
                                    }
                                    return false;
                                case "path":
                                    // console.log(path[cv.skill as "arcane" | "warrior" | "support" | "hacker"], cv.level)
                                    return path[cv.skill as "arcanist" | "warrior" | "commander" | "navigator" | "hacker"] >= cv.level;
                                case "fateline":
                                    return char.fateline ? (char.fateline.fatelineId === cv.skill && (cv.level === -1) === char.fateline.isReversed) : false
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



export const _GetAllAbilitiesForCriteria = async(req: Request, res: Response, prereqType: _UPrerequisiteType) => {
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


        return {
            status: 200,
            data: finalAbilities
        }
    } catch (e) {
        return {
            status: 500,
            data: e
        }
    }
}

export const GetAbilitiesForAllPath = async(req: Request, res: Response) => {
    const finalData = await _GetAllAbilitiesForCriteria(req, res, "path");
    res.status(finalData.status).json(finalData.data);
}

export const GetAbilitiesForAllAffinities = async(req: Request, res: Response) => {
    const finalData = await _GetAllAbilitiesForCriteria(req, res, "affinity");
    res.status(finalData.status).json(finalData.data);
}

export const GetAbilitiesForAllClasses = async(req: Request, res: Response) => {
    const finalData = await _GetAllAbilitiesForCriteria(req, res, "class");
    res.status(finalData.status).json(finalData.data);
}