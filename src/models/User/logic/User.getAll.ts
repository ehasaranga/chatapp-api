import { endpoint } from "@core";

export default endpoint({
    path: '/',
    method: 'get',
    handler: async (req, res) => {

        const user = {
            name: 'getting values',
        };
    
        res.send(user)

    }
})