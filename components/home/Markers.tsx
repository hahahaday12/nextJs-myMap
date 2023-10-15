import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { MAP_KEY } from '@/hooks/useMap';
import { STORE_KEY } from '@/hooks/useStores';
import { ImageIcon, NaverMap } from '@/types/map';
import { Store } from '@/types/store';
import Marker from './Marker';

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: any) {
      console.log('성공');
      setMyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function error() {
      setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // useEffect(() => {
  //   if (typeof myLocation !== 'string') {
  //     const currentPosition = [myLocation.latitude, myLocation.longitude];

  //     const map = new naver.maps.Map('map', {
  //       center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
  //       zoomControl: true,
  //       disableTwoFingerTapZoom: true,
  //     });

  //     const currentMarker = new naver.maps.Marker({
  //       position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
  //       map,
  //       // 원하는 이미지로 마커 커스텀
  //     });
  //   }
  // }, [myLocation]);

  if (!map || !stores) return null;

  return (
    <>
      {stores.map((store) => {
        return (
          <Marker
            map={map}
            coordinates={store.coordinates}
            icon={generateStoreMarkerIcon(store.season)}
            key={store.nid}
          />
        );
      })}
    </>
  );
};

export default Markers;

// 마커의 이미지는 스프라이트도 되어있기 때문에 각각의 마크와 크기사이즈를 조절.
const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(markerIndex: number): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
  return {
    url: 'images/markers.png',
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ),
  };
}
