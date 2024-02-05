import { z } from "zod";


export const quizSchema = z.object({
    mode: z.enum(["blitz", "normal"]),
    username: z.string().min(4).max(20),
    profileCharacter: z.string(),
})  