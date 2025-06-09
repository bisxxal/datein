import { z } from 'zod'
export const adminForm = z.object({
    name: z.string().min(3 ,'name must be atleast 3 characters'),
    service: z.string().min(3 ,'service must be atleast 3 characters'),
    tax: z.coerce.number().min(1, { message: "tax is required!" }),
    price:z.coerce.number().min(1, { message: "price is required!" }),
  })
export type TAdminForm = z.infer<typeof adminForm>  

export const createProfileForm = z.object({
  name: z.string().min(3, 'name must be atleast 3 characters').optional(),
  bio: z.string().min(10, 'bio must be atleast 3 characters').optional(),
  age: z.coerce.number().min(18, { message: "age must be atleast 18" }).optional (),
  relationshipGoals: z.string().min(3, 'looking for must be atleast 3 characters').optional(),
  batch: z.string().min(3, 'batch must be atleast 3 characters').optional(),
  gender:z.string().optional(),
  height: z.string().optional(),
  // relationshipStatus:z.string().min(3, 'relationship status must be atleast 3 characters').optional(),
  languages: z.string().optional(),
  // languages: z.array(z.object({ name: z.string().min(1, 'language must be atleast 1 character'),})).optional(),  
  // interest: z.array(z.object({ name: z.string().min(1, 'keyword must be atleast 1 character'),})).min(1, 'atleast one keyword is required').optional(),  
  job:z.string().min(3, 'job must be atleast 3 characters').optional(), 
  livingIn: z.string().min(3, 'living in must be atleast 3 characters').optional(),
})
export type TCreateProfileForm = z.infer<typeof createProfileForm>