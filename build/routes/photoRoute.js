"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../shared/constants");
const Photo_1 = require("../entity/Photo");
const photoDao_1 = tslib_1.__importDefault(require("../dao/photoDao"));
const router = express_1.Router();
const photoDao = new photoDao_1.default();
router.get('/', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var data = yield photoDao.getAll();
    return res.status(http_status_codes_1.OK).json(data);
}));
router.post('/add', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log("data ?????", req.body);
    if (!data) {
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
    var photo = new Photo_1.Photo();
    photo.description = data.description;
    photo.filename = data.filename;
    photo.isPublished = true;
    photo.name = data.name;
    photo.views = 0;
    var insertValue = yield photoDao.insert(photo);
    console.log("create success", insertValue);
    return res.status(http_status_codes_1.OK).json(photo).end();
}));
exports.default = router;
//# sourceMappingURL=photoRoute.js.map