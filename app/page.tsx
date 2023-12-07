'use client';

import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import { Rubik_Mono_One } from 'next/font/google';

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

          <div className="flex flex-row justify-between px-8 mt-[36px] sm:min-w-[600px]">
            <Image src="/ethdenver.svg" alt="" width={110} height={80} />
            <div className={`flex flex-col ${rubikMonoOne.className} mt-4`}>
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
                <p className="text-[#483E6B] text-4xl">Official POAP</p>
                <p
                  className="text-[#B5AEF9] text-4xl -mt-[42px] ml-[5px]"
                  style={style}
                >
                  Official POAP
                </p>
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

interface CodeDisplayProps {
  pin: number | null;
  setPin: React.Dispatch<React.SetStateAction<number | null>>;
}

const CodeDisplayComponent = (props: CodeDisplayProps) => {
  const { pin, setPin } = props;

  const [error, setError] = useState<string | null>(null);

  const getPinUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://xmtp-pin-server.vercel.app/getPIN'
      : 'http://localhost:3002/getPIN';

  useEffect(() => {
    // Function to fetch the code from the API
    const fetchCode = async () => {
      try {
        const response = await fetch(getPinUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: 'test001',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const { pin } = data;

        setPin(parseInt(pin));
        setError(null);
      } catch (error) {
        console.error('Error fetching code:', error);
        setError('Failed to fetch code');
      }
    };

    // Initial fetch when the component mounts
    fetchCode();

    // Set up an interval to fetch the code every 15 seconds
    const intervalId = setInterval(fetchCode, 15000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return error ? (
    <p className="text-black">Error: {error}</p>
  ) : (
    <div className="flex flex-col">
      <div className="bg-white p-6 rounded-[20px] flex flex-row mt-8 mx-[50px] gap-5 justify-center items-center">
        <div>
          <Image src="/wallet.svg" alt="" width={60} height={60} />
        </div>
        <div /> {/* Spacer */}
        <p className={`${rubikMonoOne.className} text-[#3C3259] text-[50px]`}>
          {pin}
        </p>
        <p
          className={`${rubikMonoOne.className} text-[#5F58AA] text-[28px] uppercase`}
        >
          <span>poap</span>
          <span className="ml-3">pin</span>
        </p>
        <div /> {/* Spacer */}
      </div>

      <div className="flex justify-center items-center gap-x-2">
        <span className="mt-1">
          <Image src="/star.svg" alt="" width={24} height={24} />
        </span>

        <p className={`font-semibold text-center text-[#5F59A6] mt-3`}>
          Use this to claim your POAP
        </p>

        <span className="mt-1">
          <Image src="/star.svg" alt="" width={24} height={24} />
        </span>
      </div>
    </div>
  );
};
