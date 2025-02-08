'use server'
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser"

async function getUnreadMessageCount() {
  await connectDB()
  
  const { userId } = await getSessionUser()

  const count = await Message.countDocuments({
    recipient: userId,
    read: false
  })

  return { count }
}

export default getUnreadMessageCount