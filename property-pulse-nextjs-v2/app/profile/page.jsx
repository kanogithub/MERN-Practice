import Image from 'next/image';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import defaultProfileImage from '@/assets/images/profile.png'
import ProfileProperties from '@/components/ProfileProperties';
import { convertToSerializableObject } from "@/utils/mapper/convertToObject";

const Profile = async () => {
  await connectDB()

  const { user, userId } = await getSessionUser()
  if (!userId) throw new Error("User Id is required.")

  const propertiesDoc = await Property.find({owner: userId}).select({_id: 1, name: 1, location: 1, images: 1}).lean()
  const properties = propertiesDoc.map(convertToSerializableObject)

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            {/* User Info */}
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  width={100}
                  height={100}
                  src={user.image || defaultProfileImage}
                  alt="User"
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {user.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {user.email}
              </h2>
            </div>

            <ProfileProperties properties={properties} />
          </div>
        </div>
      </div>
    </section>
  );
}
 
export default Profile;