"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const userRoute_1 = tslib_1.__importDefault(require("./userRoute"));
const photoRoute_1 = tslib_1.__importDefault(require("./photoRoute"));
const router = express_1.Router();
router.use('/employee', userRoute_1.default);
router.use('/photo', photoRoute_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map