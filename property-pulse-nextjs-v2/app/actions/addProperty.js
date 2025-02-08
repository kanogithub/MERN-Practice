'use server'
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import cloudinary from '@/config/cloudinary'
import { mapFormDataToPropertyData } from "@/utils/mapper/mapFormDataToProperyData"

async function addProperty(formData) {
  await connectDB()

  const sessionUser = await getSessionUser()

  if(!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is required');
  }

  const { userId } = sessionUser

  // Access all values from amenities and images
  const images = formData
    .getAll('images')
    .filter((image) => image.name != '')

  const propertyData = mapFormDataToPropertyData(formData, userId)

  const imageUrls = []

  for (const imageFile of images) {
    // Ensure imageFile is a Blob or File object
    if (imageFile instanceof Blob || imageFile instanceof File) {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
  
      // Convert to base64
      const imageBase64 = imageData.toString('base64');
  
      // Make request to cloudinary
      const result = await cloudinary.uploader.upload(`data:${imageFile.type};base64,${imageBase64}`, {
        folder: 'propertypulse'
      });
  
      imageUrls.push(result.secure_url);
    } else {
      console.error('Invalid file type', imageFile);
    }
  }

  propertyData.images = imageUrls

  const newProperty = new Property(propertyData)
  await newProperty.save()

  revalidatePath('/', 'layout')

  redirect(`/properties/${newProperty._id}`)
}

export default addProperty