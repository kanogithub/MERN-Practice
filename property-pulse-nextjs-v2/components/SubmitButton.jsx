import { useFormStatus } from "react-dom";

const SubmitButton = ({ textOnButton, textOnPending, iconOnButton: IconOnButton }) => {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className={'disabled:bg-gray-400 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'}
      type='submit'
    >
      {IconOnButton && <IconOnButton className={'mr-1 inline-block'} />} {pending ? (textOnPending) : (textOnButton)}
    </button>
  );
}
 
export default SubmitButton;