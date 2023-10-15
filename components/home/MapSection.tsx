import Map from './Map';
import type { NaverMap } from '@/types/map';
import useMap from '@/hooks/useMap';
import Markers from './Markers';

const MapSection = () => {
  //swr 을 이용하여 map을 전역관리로
  const { initializeMap } = useMap();
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
  };

  return (
    <>
      <Map onLoad={onLoadMap} />
      <Markers />
    </>
  );
};

export default MapSection;
