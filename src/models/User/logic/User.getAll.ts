import { endpointHandler } from "@core";

export default endpointHandler({
    path: '/',
    method: 'get',
    handler: async (req, res) => {

        const user = {
            name: 'getting values',
        };
    
        res.send(user)

    }
})