module.exports = mongoose => {
    let groupSchema = mongoose.Schema({
        Label: {
            type: String,
            require: true,
            trim: true
        }
    },{
        versionKey: false,
        timestamps: true,
        collection: "group"
    });

    const Group = mongoose.model("group", groupSchema);
    return Group;
}