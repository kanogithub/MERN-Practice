import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import Pagination from '@/components/Pagination';

const PropertiesPage = async ({ searchParams : { page = 1 } }) => {
  await connectDB();
  const pageSize = 6

  const total = await Property.countDocuments({})
  if (page < 1) page = 1
  if (page > Math.ceil(total/pageSize)) page = Math.ceil(total/pageSize)

  const skip = (page -1) * pageSize
  const properties = await Property.find({}).skip(skip).limit(pageSize).lean()

  const showPagination = total > pageSize

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0
          ? (<p>No Properties Found</p>)
          : (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {
                properties.map(property => {
                  return <PropertyCard property={property} key={property._id} />
                })
              }
            </div>)
        }
        {showPagination && <Pagination page={parseInt(page)} pageSize={pageSize} total={total} />}
      </div>
    </section>
  )
}
 
export default PropertiesPage;