
/** models for lubricants products */

const { Schema, model } = require( 'mongoose' );

const LubricantsSchema = Schema ({

    lubricantInvetoryCode : {
        type: String,
        unique: true
    },

    lubricantName : {
        type: String
    },

    lubricantCostPrice : {
        type: Number,
        required: true
    },

    lubricantSalePrice : {
        type: Number,
        required: true
    },

    statusId: {
        type:Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
}, { collection: 'lubricants'}
);

LubricantsSchema.method( 'toJSON', function() {
    const {__V, _id, ...object } = this.toObject();
    object.lubricantId = _id;
    return object;
});

module.exports  = model( 'Lubricant', LubricantsSchema );
