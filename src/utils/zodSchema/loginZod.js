import * as zod from "zod";

const loginSchema = zod.object({
    Username: zod.string().min(2),
    Password: zod.string().min(6)
});

loginSchema.required("Enter all the fields");

export default loginSchema;