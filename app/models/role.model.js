module.exports = mongoose => {
    let roleSchema = mongoose.Schema({
        Label: {
            type: String,
            require: true,
            trim: true
        }
    },{
        versionKey: false,
        timestamps: true,
        collection: 'role'
    });

    const Role = mongoose.model("role", roleSchema);
    return Role;
}