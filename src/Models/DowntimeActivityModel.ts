import mongoose from "mongoose"
import {_IScalingData, IScalingData} from "./Cards/BaseWeaponCardModel";


export interface _IDowntimeActivity extends mongoose.Document {
    activityName: string,
    activityId: string,
    description: _IScalingData<string>,
    xVals: Array<_IScalingData<number>>,
    timeSlots: _IScalingData<number>
}

const DowntimeActivitySchema = new mongoose.Schema<_IDowntimeActivity>({
    activityName: {type: String, required: true, unique: true},
    activityId: {type: String, required: true, unique: true},
    description: IScalingData(String, ""),
    xVals: [IScalingData(Number, 0)],
    timeSlots: IScalingData(Number, 1)
})

const DowntimeActivityModel = mongoose.model('downtime_activities', DowntimeActivitySchema);

export default DowntimeActivityModel