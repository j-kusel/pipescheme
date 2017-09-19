// var AccidentSchema

exports.dashboard = function(req, res, next) {
    console.log(req.user);

    res.render('dashboard', {
        flashmsg: 'default', //req.flash('error') || 'default',
        user: req.user || {},
        formtype: 'none'
    });
}


