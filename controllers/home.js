class homeController {

    getIndex (req,res){
        res.render('home.ejs');
    }
}

export default new homeController();