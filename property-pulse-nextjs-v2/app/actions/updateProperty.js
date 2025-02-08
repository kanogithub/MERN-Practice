'use server'
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { mapFormDataToPropertyData } from "@/utils/mapper/mapFormDataToProperyData"

async function updateProperty(propertyId, formData) {
  await connectDB()

  // User
  const sessionUser = await getSessionUser()

  if(!sessionUser || !sessionUser.userId)
    throw new Error('User Id is required');

  const { userId } = sessionUser
  
  // Property
  const property = await Property.findById(propertyId)

  if (!property)
    throw new Error("Property Not Found");

  // Verify Ownership
  if (property.owner.toString() !== userId)
    throw new Error("Unauthorized");

  const propertyData = mapFormDataToPropertyData(formData, userId)
  const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData)

  revalidatePath('/', 'layout')
  redirect(`/properties/${updatedProperty._id}`)
}

export default updateProperty