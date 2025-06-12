import { z } from 'zod'
export const adminForm = z.object({
    name: z.string().min(3 ,'name must be atleast 3 characters'),
    service: z.string().min(3 ,'service must be atleast 3 characters'),
    tax: z.coerce.number().min(1, { message: "tax is required!" }),
    price:z.coerce.number().min(1, { message: "price is required!" }),
  })
export type TAdminForm = z.infer<typeof adminForm>  

export const createProfileForm = z.object({
  name: z
    .string()
  .transform(val => val === '' ? undefined : val)
  .optional()
  .refine(val => !val || val.length >= 3, { message: 'Name must be atleast 3 characters' }),

  // name: z.string().min(3, 'name must be atleast 3 characters').optional(),
  bio: z.string() .optional(),

age: z
  .preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    return Number(val);
  }, z.number().min(18, { message: 'Age must be at least 18' }).optional()),

  
  relationshipGoals: z.string().min(3, 'looking for must be atleast 3 characters'),
  batch: z.string().min(3, 'batch must be atleast 3 characters'),
  gender:z.string(),
  height: z.string().optional(),
  languages: z.string().optional(),
  // job:z.string().min(3, 'job must be atleast 3 characters').optional(), 
  // livingIn: z.string().min(3, 'living in must be atleast 3 characters').optional(),
  job: z
  .string()
  .transform(val => val === '' ? undefined : val)
  .optional()
  .refine(val => !val || val.length >= 3, { message: 'job must be atleast 3 characters' }),

livingIn: z
  .string()
  .transform(val => val === '' ? undefined : val)
  .optional()
  .refine(val => !val || val.length >= 3, { message: 'living in must be atleast 3 characters' }),

})
export type TCreateProfileForm = z.infer<typeof createProfileForm>