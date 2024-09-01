class Commit {
    constructor(id, parent, message) {
        this.id = id;
        this.parent = parent;
        this.message = message;
    }
}

export default Commit;