import {getManager} from "typeorm"
import {Photo} from "../entity/Photo"

class PhotoDao {

    getAll() {
        return getManager().find(Photo);
    }

    insert(photo: Photo) {
        return getManager().save<Photo>(photo);
    }

}
export default PhotoDao;
