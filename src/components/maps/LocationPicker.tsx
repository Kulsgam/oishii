import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useGoogleMaps } from './GoogleMapsProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export interface Location {
  latitude: number;
  longitude: number;
  formatted_address: string;
}

interface LocationPickerProps {
  initialLocation?: Location;
  onLocationSelected: (location: Location) => void;
  deliveryMethod?: string;
  onDeliveryMethodChange?: (method: string) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = {
  lat: 51.5074, // London
  lng: -0.1278,
};

export function LocationPicker({ 
  initialLocation, 
  onLocationSelected,
  deliveryMethod,
  onDeliveryMethodChange
}: LocationPickerProps) {
  const { isLoaded, loadError } = useGoogleMaps();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [center, setCenter] = useState(
    initialLocation
      ? { lat: initialLocation.latitude, lng: initialLocation.longitude }
      : defaultCenter
  );

  // Initialize geocoder
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  useEffect(() => {
    if (isLoaded && !geocoder) {
      setGeocoder(new google.maps.Geocoder());
    }
  }, [isLoaded, geocoder]);

  // Handle map click
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng || !geocoder) return;
    
    const position = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    
    // Update marker position
    if (marker) {
      marker.setPosition(position);
    }
    
    // Reverse geocode to get address
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location: Location = {
          latitude: position.lat,
          longitude: position.lng,
          formatted_address: results[0].formatted_address,
        };
        onLocationSelected(location);
      }
    });
  }, [marker, geocoder, onLocationSelected]);

  // Handle search
  const handleSearch = useCallback(() => {
    if (!geocoder || !searchInput.trim()) return;
    
    geocoder.geocode({ address: searchInput }, (results, status) => {
      if (status === 'OK' && results && results[0] && results[0].geometry && results[0].geometry.location) {
        const position = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        
        // Update map center and marker
        if (map) {
          map.setCenter(position);
        }
        
        if (marker) {
          marker.setPosition(position);
        }
        
        // Pass location data to parent
        const location: Location = {
          latitude: position.lat,
          longitude: position.lng,
          formatted_address: results[0].formatted_address,
        };
        onLocationSelected(location);
      }
    });
  }, [geocoder, searchInput, map, marker, onLocationSelected]);

  // Handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    
    // Create marker
    const newMarker = new google.maps.Marker({
      position: initialLocation 
        ? { lat: initialLocation.latitude, lng: initialLocation.longitude }
        : defaultCenter,
      map,
      draggable: true,
    });
    
    setMarker(newMarker);
    
    // Add marker drag event
    newMarker.addListener('dragend', () => {
      const position = newMarker.getPosition();
      if (!position || !geocoder) return;
      
      const latLng = {
        lat: position.lat(),
        lng: position.lng(),
      };
      
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location: Location = {
            latitude: latLng.lat,
            longitude: latLng.lng,
            formatted_address: results[0].formatted_address,
          };
          onLocationSelected(location);
        }
      });
    });
  }, [initialLocation, onLocationSelected]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="flex justify-center p-8"><Spinner /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for a location"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        onClick={handleMapClick}
        onLoad={onMapLoad}
      />

      {onDeliveryMethodChange && (
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-medium">Delivery Method</h3>
          <div className="space-y-2">
            <div
              className={`cursor-pointer border rounded-lg p-4 w-full h-14 text-lg flex items-center ${
                deliveryMethod === "pickup"
                  ? "bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90"
                  : "border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10"
              }`}
              onClick={() => onDeliveryMethodChange("pickup")}
            >
              Pickup Only
            </div>

            <div
              className={`cursor-pointer border rounded-lg p-4 w-full h-14 text-lg flex items-center ${
                deliveryMethod === "delivery"
                  ? "bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90"
                  : "border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10"
              }`}
              onClick={() => onDeliveryMethodChange("delivery")}
            >
              Delivery Only
            </div>

            <div
              className={`cursor-pointer border rounded-lg p-4 w-full h-14 text-lg flex items-center ${
                deliveryMethod === "flexible"
                  ? "bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90"
                  : "border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10"
              }`}
              onClick={() => onDeliveryMethodChange("flexible")}
            >
              Flexible
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 