import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/header.module.scss';

interface Props {
  onClickLogo?: () => void;
  rightElements?: React.ReactElement[];
}

const HeaderComponent = ({ onClickLogo, rightElements }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link
          href="/"
          onClick={onClickLogo}
          className={styles.linkbox}
          aria-label="홈으로 이동"
        >
          {/*  외부 링크로 이미지를 넣을땐 넓이와, 높이 꼭 지정해줘야함 이미지 크기 사이즈 모를떈 fill을 이용*/}
          {/* 납짝한 사진을 방지 하게 위해 인라인 스타일 objectFit: 'cover */}
          <Image
            className={styles.imagebox}
            src="/maplogo.png"
            width={110}
            height={20}
            alt="맛남지도"
            priority
          ></Image>
        </Link>
      </div>
      {rightElements && <div className={styles.flexItem}>{rightElements}</div>}
    </header>
  );
};

export default HeaderComponent;
