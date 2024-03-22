const mongoose= require('mongoose');
let User

const connectDatabase = async() => {
    try {
        if(!User){
            User = mongoose.model('User',require('../models/userModel').schema);
        }await mongoose.connect('mongodb+srv://anacaszapata:VuJJQRnrmkG5bdqC@simulacro.gftu8sd.mongodb.net/')
        .then(()=>console.log('MongoDB connected'))
        .catch((err)=> console.log(err));
        // await initializeData();
    }catch(error){
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};

// const initializeData = async() => {
//     try{
//         await User.deleteMany();
        
//         const usersData =[
//             {
//                 userid:1,
//                 name:"Sofia",
//                 email:"anacas@gmail.com",
//                 password:"Medellin",
                
//             },
//             {
//                 userid:2,
//                 name:"Victor",
//                 email:"viictormejia@gmail.com",
//                 password:"Bogota",
//             },
//         ];
//         await User.insertMany(usersData);
//         console.log('Data succesfully initialized');
//     }catch(error){
//         console.error('Data initialization error:',error);
//         process.exit(1);
//     }
// };

module.exports = connectDatabase;