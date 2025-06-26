import Image from 'next/image';
import Button from '@/components/shared/Button';
import { intro } from '@/data/intro';
import Slider from 'react-slick';
import { DM_Sans } from 'next/font/google';
import { useRouter } from 'next/router';
import ServerStatus from '@/components/shared/ServerStatus';

const sans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  cssEase: 'linear',
};

export default function Home ()
{
  const {push} = useRouter()
  return (
    <main
      className={ `overflow-x-hidden relative flex flex-col items-center min-h-screen px-5 pt-10 ${ sans.className }` }
    >
      <ServerStatus />
      <div>
        <div className='flex justify-center mb-7'>
          <Image
            src='/logo.svg'
            alt='Logo'
            width={ 150 }
            height={ 150 }
            quality={ 100 }
            className='cursor-pointer'
            onClick={()=>push('/')}
          />
        </div>
        <div className='mb-16 intro-slider'>
          <Slider { ...settings } className='min-h-[150px]'>
            {
              intro?.map(({ id, title, description }) => (
                <div key={ id } className='space-y-1 text-center md:space-y-5'>
                  <h2 className='text-[22px] md:text-[44px] font-bold leading-[66px]'>{ title }</h2>
                  <p className='text-sm md:text-base'>{ description }</p>
                </div>
              ))
            }
          </Slider>
        </div>
        <div className='flex justify-center w-full gap-4'>
          <Button routeTo='/auth/register' className={ 'w-[40%]' } primary text={ 'Sign Up' } />
          <Button routeTo='/auth/login' className={ 'w-[40%]' } outlined text={ 'Log in' } />
        </div>
      </div>

      <Image src='/heroImage.svg' width={ 650 } height={ 386 } alt='decorative' className='absolute bottom-0 left-0 right-0 mx-auto hero' />
    </main>
  );
}
