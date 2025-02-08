import PropertyCard from "@/components/PropertyCard";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import RemoveBookmarkButton from "@/components/RemoveBookmarkButton";


const SavedPropertyPage = async () => {
  const { userId } = await getSessionUser()

  const { bookmarks } = await User.findById(userId).populate('bookmarks')
  
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
        { bookmarks.length === 0 
        ? (<p>No Saved Properties</p>)
        : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            { bookmarks.map(property => (
              <div className="relative" id={ property._id.toString() }>
                <RemoveBookmarkButton propertyId={ property._id.toString() } />
                <PropertyCard property={ property }/>
              </div>
            )) }
          </div>
        )}
      </div>
    </section>
  );
}
 
export default SavedPropertyPage;