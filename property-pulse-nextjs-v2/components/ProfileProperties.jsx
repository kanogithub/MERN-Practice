'use client'
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { toast } from "react-toastify";
import deleteProperty from "@/app/actions/deleteProperty";

const ProfileProperties = ({ properties: initProperties }) => {
  const [properties, setProperties] = useState(initProperties)
  
  const deleteProperyHandler = async (propertyId) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?')

    if (!confirmed) return

    await deleteProperty(propertyId)
    setProperties(prev => prev.filter(p => p._id !== propertyId))

    toast.success('Property Delete Successfully.')
  }

  return <div className="md:w-3/4 md:pl-4">
    <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
    {
      properties && properties.map(property => {
        const address = `${property.location.street} ${property.location.city}, ${property.location.state} ${property.location.zipcode}`;

        return (
          <div className="mb-10" key={property._id}>
            <Link href={`/properties/${property._id}`}>
              <Image
                className="h-32 w-full rounded-md object-cover"
                src={property.images[0]}
                width={1000}
                height={200}
                sizes='auto'
                alt={property.name} />
            </Link>
            <div className="mt-2">
              <p className="text-lg font-semibold">{property.name}</p>
              <p className="text-gray-600">Address: {address}</p>
            </div>
            <div className="mt-2">
              <Link
                href={`/properties/${property._id}/edit`}
                className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProperyHandler(property._id)}
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })
    }
  </div>;
}

export default ProfileProperties