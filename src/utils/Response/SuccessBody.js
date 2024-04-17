class SuccessBody {
    constructor(success,message = "",data = {}) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
};

export { SuccessBody };