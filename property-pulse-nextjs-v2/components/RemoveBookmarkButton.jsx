'use client'
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { FaTrash } from "react-icons/fa";

const RemoveBookmarkButton = ({ propertyId }) => {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const handleRemove = async () => {
    if (!userId) {
      toast.error('You need to be signed in to book bookmark a listing')
      return
    }

    bookmarkProperty(propertyId)
      .then(res => toast.success(res.message))
      .catch(error => toast.error(error.message))
  }

  return (
    <button
      className="absolute top-0 left-0 mt-2 ml-2 w-8 h-8 p-2 z-30 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-red-100"
      onClick={handleRemove}
    >
      <FaTrash />
    </button>
  );
}
 
export default RemoveBookmarkButton;