"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Photo_1 = require("../entity/Photo");
class PhotoDao {
    getAll() {
        return typeorm_1.getManager().find(Photo_1.Photo);
    }
    insert(photo) {
        return typeorm_1.getManager().save(photo);
    }
}
exports.default = PhotoDao;
//# sourceMappingURL=photoDao.js.map