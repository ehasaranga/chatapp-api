import { endpointHandler } from "@core";

export default endpointHandler((req, res) => {
    

    const user = {
        name: 'getting values',
    };

    res.send(user)
})