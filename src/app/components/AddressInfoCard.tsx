import { Event } from '../types/event'

interface AddressInfoCardProps {
  address: string | null;
  events: Event[];
}

const AddressInfoCard: React.FC<AddressInfoCardProps> = ({ address, events }) => {
  if(!address) return null
  return (
    <div className="fixed bottom-20 right-16 bg-white border border-slate-200 p-4 rounded-xl max-w-md shadow-lg">
      <div>
        <p className="font-bold">{address}</p>
        <div className="mt-5">
        </div>
      </div>
    </div>
  );
};

export default AddressInfoCard;
