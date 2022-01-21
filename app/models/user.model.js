const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

module.exports = mongoose => {
    let userSchema = mongoose.Schema({
        Email: {
            type: String,
            required: true,
            validate: [isEmail],
            trim: true,
            unique: true,
            sparse: true,
            lowercase: true
    
        },
        Pseudo: {
            type: String,
            require: true,
            unique: true,
            sparse: true,
            trim: true,
            minLenght: 3,
            maxLenght: 50
        },
        Password: {
            type: String,
            require: true,
            max: 1024,
            minLenght: 6
        },
        Country: {
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
        Roles:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "role",
                default: []
            }
        ]
    
    },{
        versionKey: false,
        timestamps: true,
        collection: 'user', 
    });

    //cryptage pwd
    // userSchema.pre("save", async function(next){
    //     const salt = await bcrypt.genSalt();
    //     this.Password = await bcrypt.hash(this.Password, salt);
    //     next();
    // });

    const User = mongoose.model("user", userSchema);
    return User;

};




