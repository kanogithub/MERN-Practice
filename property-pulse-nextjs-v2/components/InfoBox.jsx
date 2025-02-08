import Link from "next/link";

const InfoBox = ({ backgroundColor = 'bg-gray-100', textColor = 'text-gray-800', titleText, buttonInfo, children }) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{titleText}</h2>
      <p className={`${textColor} mt-2 mb-4`}>
        {children}
      </p>
      <Link
        href={buttonInfo.href}
        className={`${buttonInfo.bgColor} hover:${buttonInfo.bgHoverColor} inline-block text-white rounded-lg px-4 py-2`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
}
 
export default InfoBox;