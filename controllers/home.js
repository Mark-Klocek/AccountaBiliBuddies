class homeController {

    getIndex (req,res){
        res.render('home.ejs');
    }
    getLogin (req,res){
        res.render('login.ejs')
    }
    getRegister (req,res){
        res.render('register.ejs')
    }
}

export default new homeController();