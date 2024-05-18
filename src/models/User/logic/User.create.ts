
import { UserModel } from "@app/models/User/User.model";
import { endpointHandler } from "@core";

export default endpointHandler({
    path: '',
    method: 'post',
    handler: async (req, res) => {

        const repo = UserModel.repo;

        const sample = {
            test: 'Hi There'
        }

        res.send(sample)

    }
})