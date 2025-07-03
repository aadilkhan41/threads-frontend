import * as zod from "zod";

const signupSchema = zod.object({
    "Full Name": zod.string(),
    Username: zod.string().min(2),
    Email: zod.string().email("Invalid Email"),
    Password: zod.string().min(6)
});

signupSchema.required("Enter all the fields");

export default signupSchema;