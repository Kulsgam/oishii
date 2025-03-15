import { GoogleMap, Marker } from '@react-google-maps/api';
import { useGoogleMaps } from './GoogleMapsProvider';
import { Location } from './LocationPicker';

interface LocationMapProps {
  location: Location;
  height?: string;
  width?: string;
  zoom?: number;
}

export function LocationMap({
  location,
  height = '200px',
  width = '100%',
  zoom = 15,
}: LocationMapProps) {
  const { isLoaded, loadError } = useGoogleMaps();
  
  const mapContainerStyle = {
    width,
    height,
  };
  
  const center = {
    lat: location.latitude,
    lng: location.longitude,
  };
  
  if (loadError) {
    return <div>Error loading maps</div>;
  }
  
  if (!isLoaded) {
    return <div className="flex justify-center items-center" style={{ height }}>Loading map...</div>;
  }
  
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
    >
      <Marker position={center} />
    </GoogleMap>
  );
} 