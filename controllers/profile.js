
class profileController {

    getProfile (req,res){
        res.render('profile.ejs');
    }
    
}


  export default new profileController();