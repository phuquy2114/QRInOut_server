"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
class UserDAO {
    getAll() {
        return typeorm_1.getManager().find(User_1.User);
    }
    getUserByID(idParam) {
        return User_1.User.findOne({
            where: {
                id: idParam
            }
        });
    }
    update(user) {
        return User_1.User.update(user.id, user);
    }
    save(user) {
        return User_1.User.save(user);
    }
    insert(users) {
        return typeorm_1.getManager().save(users);
    }
    getUnfriend(idParam) {
    }
}
exports.default = UserDAO;
//# sourceMappingURL=userDAO.js.map