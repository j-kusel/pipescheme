// var AccidentSchema

exports.dashboard = function(req, res, next) {
    console.log(req.user);

    res.render('dashboard', {
        flashmsg: req.flash('error') || 'default',
        user: req.user || {},
        formtype: 'none'
    });
}


