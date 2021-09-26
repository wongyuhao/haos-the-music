import useSWR from 'swr';
import Image from 'next/image'
import Vibrant from 'node-vibrant';
import moment from 'moment';
import Ticker from 'react-ticker'
import { useEffect, useState } from 'react';

const imageSize = 150;


function getTime(){
  return moment().format('H:mmA');
}

export default function Home() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR('/api/spotify', fetcher, { refreshInterval: 2000 });
  const [colors, setColors] = useState({
    text: '#000',
    background: '#fff'
  });

  const [time, setTime] = useState(getTime());

  function handleAlbumPalette(palette){
    let albumColours = Object.keys(palette)
      .filter(item => {
        return item === null ? null : item
      })
      .map(colour => {
        return {
          text: palette[colour].getTitleTextColor(),
          background: palette[colour].getHex()
        }
      })
    let {text, background} = albumColours[Math.floor(Math.random() * albumColours.length)]
    setColors({
      text:text,
      background:background
    })
  }


  useEffect(()=>{
    if(data && data.isPlaying){
      Vibrant.from(data.albumImageUrl).getPalette().then((palette) =>handleAlbumPalette(palette))
    }
    setInterval(() => setTime(getTime()), 30000);
  }, [data])

  

  if(data && data.isPlaying){
    const {albumImageUrl, artist, title} = data;
    
    return (
      <>
        <section className='h-screen w-screen max-w-screen flex items-center justify-between align-middle' style={{color: colors.text, backgroundColor: colors.background, }}>
          <main className='flex flex-row w-full items-center justify-evenly'>
            <div className='shadow-2xl' style={{width:'50vw', height: '50vw', maxWidth: imageSize, maxHeight:imageSize}}>
              <Image className='shadow'src={albumImageUrl} width={imageSize} height={imageSize}/>
            </div>
            <div className='' style={{maxWidth: '55vw'}}>
                <div>
                  <h1 className='' style={{fontFamily:'', fontWeight:'bold', fontSize:'2.2em', whiteSpace:'nowrap', overflow:'hidden', textOverflow: 'ellipsis'}}>{title}</h1>
                  <h2 className='' style={{fontFamily:'', fontWeight:'thin', fontSize:'1.2em', opacity:'0.7',}}>{artist}</h2>
                </div>
            </div>
          </main>
        </section>
      </>
    );
  }else{
    return (
      <>
        <section className='h-screen w-screen max-w-screen flex flex-col items-center justify-center align-middle' style={{backgroundColor:'black', color: 'white'}}>
          <div className="">
            <div className='text-8xl font-bold' style={{ opacity:'0.5'}}>
              {time}
            </div>
          </div>
        </section>
      </>
    );
  }
}



