import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyCard from "@/components/PropertyCard";
import { convertToSerializableObject } from "@/utils/mapper/convertToObject";
import PropertySearchForm from "@/components/PropertySearchForm";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultPage = async({ searchParams: {location, propertyType} }) => {
  await connectDB()
  
  const locationPattern = new RegExp(location, 'i')

  const query = {
    $or: [
      {name: locationPattern},
      {description: locationPattern},
      {'location.street': locationPattern},
      {'location.city': locationPattern},
      {'location.state': locationPattern},
      {'location.zipcode': locationPattern},
    ]
  }

  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i')
    query.type = typePattern
  }

  const searchResults = await Property.find(query).lean()
  const properties = convertToSerializableObject(searchResults)

  return (
    <>
      <section className="bg-blue-700 py-4">
        <max-w-7xl className="mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm defLocation={location} defPropertyType={propertyType} />
        </max-w-7xl>
      </section>
      <section className="px-4 py-6">
        <container-xl className="lg:container m-auto px-4 py-6">
          <Link
            href='/properties'
            className='flex items-center text-blue-500 hover:underline mb-3'
          >
            <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (<p>No search results</p>): (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map(property => <PropertyCard property={property} />)}
            </div>
          )}
        </container-xl>
      </section>
    </>
  );
}
 
export default SearchResultPage;