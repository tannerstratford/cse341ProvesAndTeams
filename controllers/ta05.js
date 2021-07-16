exports.getStart = (req, res, next) => {
    res.render('pages/ta05', {
        title: 'Team Activity 05',
        path: '/ta05',
        color: req.body.color,
        count: req.session.count
    });
};

exports.changeStyle = (req, res, next) => {
    req.session.color = req.body.color;
    res.render('pages/ta05', {
        title: 'Team Activity 05',
        path: '/ta05',
        color: req.session.color,
        count: req.session.count
    });
};

exports.countUp = (req, res, next) => {
    req.session.count += 1;
    res.render('pages/ta05', {
        title: 'Team Activity 05',
        path: '/ta05',
        color: req.session.color,
        count: req.session.count
    });
};

exports.countDown = (req, res, next) => {
    req.session.count -= 1;
    res.render('pages/ta05', {
        title: 'Team Activity 05',
        path: '/ta05',
        color: req.session.color,
        count: req.session.count
    });
};

exports.reset = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/ta05');
    });
};

