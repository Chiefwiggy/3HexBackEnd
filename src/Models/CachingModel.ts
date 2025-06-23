
import mongoose, {Schema} from 'mongoose';
export interface _ICacheTimestamp {
    entry_name: string,
    last_updated: number;
}

const VCacheTimestamp = {
    entry_name: String,
    last_updated: Number
}
export interface _ICachingModel extends Document {
    _id: string,
    db_cache_timestamps: Array<_ICacheTimestamp>
    backend_timestamp: _ICacheTimestamp,
    frontend_timestamp: _ICacheTimestamp
    always_pull: boolean,
    is_master: boolean
}

const CachingSchema = new Schema<_ICachingModel>({
    db_cache_timestamps: [VCacheTimestamp],
    backend_timestamp: VCacheTimestamp,
    frontend_timestamp: VCacheTimestamp,
    always_pull: {type: Boolean, required: true, default: false},
    is_master: {type: Boolean, required: true, default: false}
})

const CachingModel = mongoose.model('cache_data', CachingSchema, "cache_data")

export default CachingModel