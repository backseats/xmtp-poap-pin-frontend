import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Rubik_Mono_One } from 'next/font/google';

const rubikMonoOne = Rubik_Mono_One({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-rubik-mono-one',
});

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

    const intervalId = setInterval(fetchCode, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return error ? (
    <p className="text-black">Error: {error}</p>
  ) : (
    <div className="flex flex-col mx-auto">
      <div className="bg-white p-6 rounded-[20px] flex flex-row mt-8 gap-5 justify-center items-center sm:w-[500px]">
        <div>
          <Image src="/wallet.svg" alt="" width={60} height={60} />
        </div>

        <p className={`${rubikMonoOne.className} text-[#3C3259] text-[50px]`}>
          {pin}
        </p>
        <p
          className={`${rubikMonoOne.className} text-[#5F58AA] text-[28px] uppercase`}
        >
          <span>poap</span>
          <span className="ml-3">pin</span>
        </p>
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

export default CodeDisplayComponent;
