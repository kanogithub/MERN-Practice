'use client'
import { useSession } from "next-auth/react"
import { FaEdit } from "react-icons/fa"
import BookPropertyButton from "./BookPropertyButton"
import ShareProperptyButton from "./SharePropertyButton"
import PropertyContactForm from "./PropertyContactForm"

const PropertyAside = ({ property }) => {
  const { data: session } = useSession()
  const isOwner = session ? session.user.id === property.owner : false

  return (
    <aside className="space-y-4">
      {isOwner 
        ? (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            onClick={ () => location.href = `/properties/${property._id}/edit`}
          >
            <FaEdit className="mr-2" /> Edit Property
          </button>
        ) 
        : <BookPropertyButton propertyId={property._id} />
      }
      <ShareProperptyButton property={ property } />
      <PropertyContactForm property={property} />
    </aside>
  );
}
 
export default PropertyAside;