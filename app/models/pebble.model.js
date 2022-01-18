module.exports = mongosse => {
    let pebbleSchema = mongosse.Schema({
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
            type: String,
            require: true,
        },
        IdPlayer: [
            {
                type: String
            }
        ],
        IdGame: {
            type: String
        }

    },{
        versionKey: false,
        timestamps: true,
        collection: 'pebble'
    });

    const Pebble = mongosse.model("pebble", pebbleSchema);
    return Pebble;
}