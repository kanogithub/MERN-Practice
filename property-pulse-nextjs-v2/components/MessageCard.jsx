'use client'
import { useState } from "react";
import { toast } from "react-toastify";
import markMessaageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read)

  const handleMessageAsReadChange = async () => {
    try {
      const messageIsRead = await markMessaageAsRead(message._id)
      setIsRead(messageIsRead)

      messageIsRead 
        ? toast.success(`Message marks as Read successfully.`)
        : toast.warn(`Message marks as New.`)
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleMessageDelete = async () => {
    try {
      await deleteMessage(message._id)
      toast.success('Message is deleted.')
    }
    catch (error) {
      toast.error(error.message)
    }
    
  }

  const markAsReadBtnColor = isRead ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-blue-400 hover:bg-blue-500'

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>New</div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:  </span>
        { message.property.name }
      </h2>
      <p className="text-gray-700">{ message.body }</p>

      <ul className="mt-4">
        <li>
          <strong>Reply Email:  </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500"> {message.email} </a>
        </li>
        <li>
          <strong>Reply Phone:  </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500"> {message.phone} </a>
        </li>
        <li>
          <strong>Received:  </strong>
          { new Date(message.createdAt).toLocaleDateString() }
        </li>
      </ul>
      <button onClick={handleMessageAsReadChange} className={`mt-4 mr-3 text-white py-1 px-3 rounded-md ${markAsReadBtnColor}`}>
        {isRead ? 'Mark As New' : 'Mark As Read'}
      </button>
      <button onClick={handleMessageDelete} className="mt-4 bg-red-400 hover:bg-red-500 text-white py-1 px-3 rounded-md">
        Delete
      </button>
    </div>
  );
}
 
export default MessageCard;