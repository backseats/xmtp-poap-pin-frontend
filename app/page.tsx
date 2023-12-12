'use client';

import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import { Rubik_Mono_One } from 'next/font/google';
import CodeDisplayComponent from './components/CodeDisplayComponent';

const rubikMonoOne = Rubik_Mono_One({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-rubik-mono-one',
});

const style = {
  textShadow:
    '0 0 2px #483E6B, 0 0 2px #483E6B, 0 0 2px #483E6B, 0 0 2px #483E6B, 0 0 2px #483E6B',
};

const PinDemo = () => {
  const [pin, setPin] = useState<number | null>(null);

  const qrCodeUrl = () => {
    const _pin = pin ? pin : '';
    return process.env.NODE_ENV === 'production'
      ? `https://xmtp.link/poap-test.eth?pin=${_pin}`
      : `http://localhost:4322/poap-test.eth?pin=${_pin}`;
  };

  return (
    <div className="bg-[#FDF3FE] w-full">
      <div className="flex flex-col sm:flex-row sm:justify-center h-screen py-[32px] sm:gap-3 sm:min-w-[600px]">
        {/* Left side */}
        <div className="flex flex-col sm:w-2/6">
          <div className="mx-auto p-20">
            <Image src="/eth-denver-2022.png" alt="" width={340} height={340} />
          </div>

          <div className="flex flex-row px-8 mx-auto mt-[24px] sm:min-w-[600px]">
            <Image src="/ethdenver.svg" alt="" width={110} height={80} />

            <div className="flex items-start">
              <Image
                src="/ethdenver.svg"
                alt=""
                width={90}
                height={80}
                className="opacity-0"
              />
              <div
                className={`flex flex-col ${rubikMonoOne.className} mt-4 ml-4`}
              >
                <div>
                  <p className="text-[#483E6B] text-4xl">Get the</p>
                  <p
                    className="text-[#B5AEF9] text-4xl -mt-[42px] ml-[5px]"
                    style={style}
                  >
                    Get the
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-[#483E6B] text-4xl">Official</p>
                  <p
                    className="text-[#B5AEF9] text-4xl -mt-[42px] ml-[5px]"
                    style={style}
                  >
                    Official
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-[#483E6B] text-4xl">POAP</p>
                  <p
                    className="text-[#B5AEF9] text-4xl -mt-[42px] ml-[5px]"
                    style={style}
                  >
                    POAP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col sm:w-2/6">
          <div className="bg-white rounded-[20px] mx-auto p-20">
            <QRCodeSVG value={qrCodeUrl()} size={340} />
          </div>

          <CodeDisplayComponent pin={pin} setPin={setPin} />
        </div>
      </div>
    </div>
  );
};

export default PinDemo;
