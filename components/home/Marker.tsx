import { useCallback, useEffect, useState } from 'react';
import { Marker } from '@/types/map';

const Marker = ({ map, coordinates, icon, onClick }: Marker) => {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;
    if (map) {
      //새로운 마커 인스턴스 생성
      marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(...coordinates),
        icon,
      });
    }

    if (onClick) {
      naver.maps.Event.addListener(marker, 'click', onClick);
    }

    return () => {
      marker?.setMap(null);
    };
  }, [map]);

  return null;
};

export default Marker;
