import { DI } from "@app";
import { endpointHandler } from "@core";

export default endpointHandler({
    path: '',
    method: 'post',
    handler: (req, res) => {

        const app = DI;


        const user = {
            name: 'getting values',
        };

        res.send(user)

    }
})