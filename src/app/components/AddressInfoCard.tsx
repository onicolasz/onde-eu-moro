import { useContext } from 'react';
import { MapContext } from '@/contexts/map';

const AddressInfoCard = () => {
  const { address  } = useContext(MapContext)
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
