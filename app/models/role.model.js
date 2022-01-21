module.exports = mongoose => {
    let roleSchema = mongoose.Schema({
        Label: {
            type: String,
            require: true,
            trim: true
        },
        Groups:[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "group",
              default: []
            }
        ],
    },{
        versionKey: false,
        timestamps: true,
        collection: 'role'
    });

    const Role = mongoose.model("role", roleSchema);
    return Role;
}