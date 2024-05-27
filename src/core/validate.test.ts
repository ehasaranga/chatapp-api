import { validate } from "@core";
import z from "zod";


describe("#Validate Func", () => {

    it("testing to see if does convert to schema types", () => {

        const data = {
            id: '123'
        }

        const afterValidate = validate(data, z.object({
            id: z.number()
        }))

        expect(typeof afterValidate.id).toBe('number')

    })

})