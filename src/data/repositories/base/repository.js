export class BaseRepository {
    constructor(givenIterable) {
        this.iterable = givenIterable
    }


    /**
     * @returns {*} compaines
     * @param {Function} callBack 
     */
    findOne(callBack) {
        return this.iterable.find(callBack);
    }

    findMany(callBack) {
        return this.iterable.filter(callBack)
    }

    GetAll() {
        return this.iterable;
    }

    GetByID(id) {
        return this.iterable.find(c => c.id === id);
    }

    CreateOne(entity) {
        this.iterable.push(entity)
        return entity;
    }

    CreateMany(entities) {
        this.iterable = [...entities];
        return this.iterable;
    }


}