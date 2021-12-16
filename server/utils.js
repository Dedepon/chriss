const Person = require("./models/person");
const UTILS = {
    getUserIdCookie: (req) => {
        if (req && req.headers.cookie && req.headers.cookie.indexOf("userId") !== -1) {
            const userId = req.headers.cookie.split("userId=")[1].split(";")[0];
            return userId ? decodeURI(userId) : undefined;
        }
        return undefined;
    },
    responseError: (res, message, logout) => {
        res.status(500);
        if (logout) {
            res.clearCookie("userId");
        }
        res.json({
            error: message
        });
    },
    getPersonIdFromCookie: (req, res, next) => {
        const userId = UTILS.getUserIdCookie(req);
        if (!userId) return UTILS.responseError(res, "Aucune session en cours, rafraichissez la page et authentifiez-vous.");
        Person.findOne({ userId }, function (err, person) {
            if (err) return next(err);
            if (!person) return UTILS.responseError(res, "Aucun utilisateur correspondant au login " + userId + ", rafraichissez la page et enregistrez-vous.", true);
            req.personId = person._id;
            next();
        });
    }
};

module.exports = UTILS;
