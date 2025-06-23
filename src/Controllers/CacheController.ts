import ValidQueryBuilder from "../Utils/ValidQueryBuilder";
import {Request, Response} from "express";
import {_IUserModel} from "../Models/UserModel";
import CachingModel, {_ICachingModel} from "../Models/CachingModel";


export const UpdateCacheDBRegister = new ValidQueryBuilder()
    .addPerm("admin")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        const masterCache = await CachingModel.findOne({is_master: true})
        const update_list: Array<string> | null = req.body["update_list"];
        if (masterCache && update_list && update_list.length > 0) {
            const updateData = await UpdateCacheInternal(update_list, (req.body["new_tables"] as boolean) ?? false, masterCache)
            if (updateData && updateData.success) {
                res.status(202).json(updateData)
            } else {
                res.status(404).json(updateData)
            }
        } else {
            res.status(500).send("Server error")
        }
    })
    .exec()

export const UpdateCacheFrontEnd = new ValidQueryBuilder()
    .addPerm("admin")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        const MasterCache = await CachingModel.findOne({is_master: true})
        if (MasterCache) {

        }
    })
    .exec()

export const UpdateCacheBackEnd = new ValidQueryBuilder()
    .addPerm("admin")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        const MasterCache = await CachingModel.findOne({is_master: true})
        if (MasterCache) {

        }
    })
    .exec()

export const UpdateCacheInternal = async(table_names: Array<string>, new_entry_expected: boolean = false, master_cache_ref: any = null) => {
    let masterCache = null
    if (!master_cache_ref) {
        masterCache = master_cache_ref
    } else {
        masterCache = await CachingModel.findOne({is_master: true})
    }
    if (masterCache) {
        let failureNames: Array<string> = []
        for (const table_name of table_names) {
            // @ts-ignore
            let matching_entry = masterCache.db_cache_timestamps.find(e => e.entry_name == table_name)
            if (matching_entry) {
                matching_entry.last_updated = Date.now()
            } else if (new_entry_expected) {
                masterCache.db_cache_timestamps.push({
                    entry_name: table_name,
                    last_updated: Date.now()
                })
            } else {
                failureNames.push(table_name)
            }
        }
        if (failureNames.length > 0) {
            return {
                success: false,
                data: {
                    message: `The following tables do not exist. Please set "new_tables: true" if you are adding new tables to the cache. `,
                    tables: failureNames
                }
            }
        }
        try {
            await masterCache.save()
            return {
                success: true,
                data: masterCache
            }
        } catch (err) {
            return {
                success: false,
                data: err
            }
        }

    }
}

export const GetMasterCache = new ValidQueryBuilder()
    .addPerm("registered")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        const MasterCache = await CachingModel.findOne({is_master: true})
        if (MasterCache) {
            res.status(200).json(MasterCache)
        } else {
            res.status(503).json("Could not find Master cache.")
        }

    })
    .exec()

export const CreateMasterCache = new ValidQueryBuilder()
    .addPerm("admin")
    .success(async(req: Request, res: Response, user: _IUserModel) => {
        try {
            const result = new CachingModel({...req.body, is_master: true})
            await result.save();
            res.status(201).json({
                status: "success",
                data: {...result}
            })
        } catch (err) {
            res.status(500).json(err)
        }

    })
    .exec()