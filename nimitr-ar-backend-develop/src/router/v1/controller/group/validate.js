"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationGroup = (req, res, next) => {
    try {
        const { uids } = req.body;
        if (!uids) {
            res.status(400).json({
                status: 400,
                code: 'ERROR_UID_REQUIRED',
                message: 'Uid is Require ',
            });
        }
        else if (!Array.isArray(uids)) {
            res.status(400).json({
                status: 400,
                code: 'ERROR_UID_IS_NOT_AN_ARRAY',
                message: 'Uid is not an array ',
            });
        }
        else {
            console.log("next process");
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            code: 'ERROR_INTERNAL_SERVER',
            message: 'Unknown Internal Server Error.',
        });
    }
};
exports.default = validationGroup;
