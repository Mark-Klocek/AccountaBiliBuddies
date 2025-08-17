import User from '../models/User.js'
class profileController {

    async getProfile  (req,res){
        try{
            const userInfo = await User.findById(req.user._id)
            console.log(userInfo)
            res.render('profile.ejs', {user: userInfo});
        }catch(err){
            console.log(err)
        }
        
    }
    
}


  export default new profileController();