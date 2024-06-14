

export class RestError extends Error {

    public status: number;

    constructor(message: string, status?: number) {

        super(message);

        this.status = status ?? 200

        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor)

    }

}

export class NothingHappendError extends RestError {

    constructor(message: string, status?: number) {

        super(message, status)

    }

}