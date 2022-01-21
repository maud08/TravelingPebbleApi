module.exports = mongoose => {
    let pebbleSchema = mongoose.Schema({
        Img: {
            type: String
        },
        Position: 
            {
                lat:{
                    type: Number,
                    require: true
                },
                lng:{
                    type: Number,
                    require: true
                }
            }
        ,
        ImgFound: {
            type: String
        },
        IdCreator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },
        IdPlayer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            default: undefined,
        },
        IdGame: {
            type: String,
            default: '',
        }

    },{
        versionKey: false,
        timestamps: true,
        collection: 'pebble'
    });

    const Pebble = mongoose.model("pebble", pebbleSchema);
    return Pebble;
}