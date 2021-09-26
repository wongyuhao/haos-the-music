export default (props)=>{
    {albumImageUrl, imageSize, title, artist, }

    return(
        <section className='h-screen w-screen max-w-screen max-h-screen flex flex-row items-center justify-between align-middle' style={{color: colors.text, backgroundColor: colors.background, }}>
          <main className='h-5/6 flex flex-col items-center justify-center align-middle'>
            <div className='shadow-2xl' style={{width:'50vw', height: '50vw', maxWidth: imageSize, maxHeight:imageSize}}>
              <Image className='shadow'src={albumImageUrl} width={imageSize} height={imageSize}/>
            </div>
            <h1 className='mt-10' style={{fontFamily:'', fontWeight:'bold', fontSize:'2.5em', whiteSpace:'nowrap', overflow:'hidden', textOverflow: 'ellipsis'}}>{title}</h1>
            <h2 className='' style={{fontFamily:'', fontWeight:'thin', fontSize:'1.7em', opacity:'0.7',}}>{artist}</h2>
          </main>
          <div className="h-1/6">
            <div className='text-6xl font-bold' style={{ opacity:'0.5'}}>
              {time}
            </div>
          </div>
        </section>
    )
}