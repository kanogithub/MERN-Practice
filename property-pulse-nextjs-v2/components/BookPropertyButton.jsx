'use client'
import { useState, useEffect } from 'react'
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";

const BookPropertyButton = ({ propertyId }) => {
  const [isBookmarked, setIsBookmarked] = useState(null)
  const { data: session } = useSession()
  const userId = session?.user?.id

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to be signed in to book bookmark a listing')
      return
    }

    try {
      const res = await bookmarkProperty(propertyId)
      toast.success(res.message)

      if (!res.error) setIsBookmarked(res.isBookmarked)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (userId) {
      checkBookmarkStatus(propertyId).then(res => {
        setIsBookmarked(res.isBookmarked)
      })
      .catch(error => toast.error(error.message))
    }
  }, [userId, propertyId, setIsBookmarked])

  if (userId && isBookmarked === null)
    return <h2>Loading...</h2>

  const buttonColor = isBookmarked ? 'red' : 'blue'
  const buttonText = isBookmarked ? 'Remove' : 'Bookmark'

  return (
    <button
      className={`bg-${buttonColor}-500 hover:bg-${buttonColor}-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> {buttonText} Property
    </button>
  )
}
 
export default BookPropertyButton;