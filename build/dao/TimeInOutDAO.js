"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const TimeWork_1 = require("../entity/TimeWork");
class TimeInOutDAO {
    getAll() {
        return typeorm_1.getManager().find(TimeWork_1.TimeInOut);
    }
    insert(time) {
        return typeorm_1.getManager().save(time);
    }
}
exports.default = TimeInOutDAO;
//# sourceMappingURL=TimeInOutDAO.js.map