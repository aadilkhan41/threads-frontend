import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";

const likesAtomFamily = atomFamily({
    key: "likesAtomFamily",
    default: selectorFamily({
        key: "likesAtomSelectorFamily",
        get: post_id => async () => {
            try{
                const response = await axios.get(`https://threads-backend-tp0d.onrender.com/api/posts/${post_id}`, { withCredentials: true });
                const result = await response.data;
                return result.likes?.length;
            }
            catch(error) {
                console.log(error);
                throw error;
            }
        }
    })
})

export default likesAtomFamily;