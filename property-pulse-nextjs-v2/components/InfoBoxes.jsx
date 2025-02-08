import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox backgroundColor="bg-gray-100" titleText='For Renters'
            buttonInfo={{
              href: '/properties',
              text: 'Browse Properties',
              bgColor: 'bg-black',
              bgHoverColor: 'bg-gray-700'
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox backgroundColor="bg-blue-100" titleText='For Property Owners'
            buttonInfo={{
              href: '/properties/add',
              text: 'Add Property',
              bgColor: 'bg-blue-500',
              bgHoverColor: 'bg-blue-600'
            }}
          >
            List your properties and reach potential tenants. Rent as an
            airbnb or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}
 
export default InfoBoxes;