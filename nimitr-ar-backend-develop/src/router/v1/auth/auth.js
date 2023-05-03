"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const responseError_1 = __importDefault(require("../components/responseError"));
const check = async (req, res, next) => {
    var _a;
    try {
        const authHeader = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || '';
        const token = authHeader.split(' ')[1];
        // console.log('token', token);
        if (token) {
            const decoded = (0, jwt_decode_1.default)(token);
            if (decoded === null || decoded === void 0 ? void 0 : decoded.sub) {
                next();
            }
        }
        else {
            res.status(403).json({
                status: 403,
                code: 'INVALID_TOKEN',
                message: 'Invalid token',
            });
        }
    }
    catch (error) {
        (0, responseError_1.default)(error, res);
    }
};
exports.check = check;
