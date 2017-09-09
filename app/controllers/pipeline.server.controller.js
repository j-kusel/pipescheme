// var AccidentSchema

exports.dashboard = function(req, res, next) {
    res.render('dashboard', {
        user: req.user || {}
    });
}


