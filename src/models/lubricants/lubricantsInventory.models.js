

const { Schema, model } = require('mongoose');

const LubricantInventorySchema = Schema({

    lubricantInvetoryCode: {
        type: String
    },

    lubricantId: {
        type: Schema.Types.ObjectId,
        ref: 'Lubricant',
    },

    lubricantAvailable: {
        type: Number,
        default: 0
    },

}, { collection: 'lubricantInventory' });

LubricantInventorySchema.method('toJSON', function () {

    const { __V, _id, ...object } = this.toObject();
    object.lubricantInvetoryId = _id;
    return object;

});

module.exports = model('LubricantInventory', LubricantInventorySchema);

