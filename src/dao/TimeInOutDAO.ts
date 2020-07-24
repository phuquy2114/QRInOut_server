import { getManager, getConnection } from "typeorm"
import { TimeInOut } from "../entity/TimeWork";

class TimeInOutDAO {

    getAll() {
        return getManager().find(TimeInOut);
    }

    insert(time: TimeInOut) {
        return getManager().save<TimeInOut>(time);
    }
}

export default TimeInOutDAO;
