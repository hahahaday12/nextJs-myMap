import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Coordinates } from '../../types/store';
import { NaverMap } from '../../types/map';
import { INITIAL_CENTER, INITIAL_ZOOM } from '../../hooks/useMap';

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({
  mapId = 'map',
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) => {
  const mapRef = useRef<NaverMap | null>(null);
  const markerRef = useRef<any | null>(null);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    // 로드 완료시 부모 컴포넌트에 로드됨
    if (onLoad) {
      onLoad(map);
    }
  };

  // 현재는 랜딩페이지 이지만 피드백 페이지로 이동하였을때, map 컴포넌특 unmount되기 때문에,map 이 파괴되는데
  // 문제는 다시 map 페이지로 왔을시 지도가 보이지 않는다. , 네이버 UI도 렌더링 되지 않음, 이유는 onload
  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  //현재 위치를 추적합니다.
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(success, error);
  //   }

  //   // 위치추적에 성공했을때 위치 값을 넣어줍니다.
  //   function success(position: any) {
  //     console.log('성공');
  //     setMyLocation({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     });
  //   }

  //   // 위치 추적에 실패 했을때 초기값을 넣어줍니다.
  //   function error() {
  //     setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof myLocation !== 'string') {
  //     const currentPosition = [myLocation.latitude, myLocation.longitude];

  //     const map = new naver.maps.Map('map', {
  //       center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
  //       zoomControl: true,
  //     });
  //   }
  // }, [myLocation]);

  // 내 위치 마커 표시하기
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

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={initializeMap} // 초기 한번만 실행되는 문제점 때문에 onload 대신 onReady로 변경.
      />
      <div id={mapId} style={{ width: '100%', height: '100%' }} />
    </>
  );
};

export default Map;
