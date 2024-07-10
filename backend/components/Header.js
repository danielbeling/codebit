import React, { useState } from 'react';
import { RiBarChartHorizontalLine } from 'react-icons/ri';
import { BiExitFullscreen } from 'react-icons/bi';
import { GoScreenFull } from 'react-icons/go';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <header className='header flex flex-sb'>
      <div className="logo flex gap-2">
        <h1>CodeBit</h1>
        <div className="headerham flex flex-center">
          <RiBarChartHorizontalLine />
        </div>
      </div>
      <div className="rightnav flex gap-2">
        <div onClick={toggleFullscreen}>
          {isFullscreen ? <BiExitFullscreen /> : <GoScreenFull />}
        </div>
        <div className="notification">
          <img src="/img/notification.png" alt="notification" />
        </div>
        <div className="profilenav">
          {session ? (
            <img style={{ width: 60, height: 60, borderRadius: '50%' }} src={session.user.image || '/img/social.png'} alt='user' />
          ) : (
            <img src="/img/social.png" alt="user" />
          )}
        </div>
      </div>
    </header>
  );
}
