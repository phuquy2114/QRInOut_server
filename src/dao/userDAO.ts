import { getManager, getConnection } from "typeorm"
import { User } from "../entity/User";

class UserDAO {

    getAll() {
        return getManager().find(User);
    }

    getUserByID(idParam: string) {
        return User.findOne({
            where: {
                id: idParam
            }
        });
    }

    update(user: User) {
        return User.update(user.id, user);
    }

    save(user: User) {
        return User.save(user);
    }

    insert(users: User) {
        return getManager().save<User>(users);
    }

    getUnfriend(idParam: string) {

    }
}

export default UserDAO;
