import Image from 'next/image';

const Empty = ({ text }) => {
  return (
    <div className='mt-20'>
      <Image className='mx-auto' src='/empty.svg' width={234} height={350} alt='empty' />
      <p className='mt-8'>{text}</p>
    </div>
  );
};

export default Empty;
