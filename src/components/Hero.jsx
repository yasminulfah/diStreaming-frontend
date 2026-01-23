import { useState } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    const trailerId = "nb_fFj_0rq8"
    const [isMuted, setIsMuted] = useState(true)
    return (
        <div className="relative h-[80vh] w-full overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                <iframe 
                    className="absolute top-1/2 left-1/2 w-[180vw] h-[180vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none border-none" 
                    src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&controls=0&loop=1&playlist=${trailerId}&mute=${isMuted ? 1 : 0}&modestbranding=1&rel=0`} allow="autoplay; encrypted-media"
                ></iframe>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10" />

            <div className="relative z-20 h-full flex flex-col justify-end pb-24 px-12 lg:px-25 lg:px-20 text-white">
                <div className="max-w-2xl space-y-5">
                    <h1 className="text-2xl md:text-xl font-black uppercase leading-none">Avatar: Fire and Ash</h1>
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed drop-shadow-md">Dive back into the stunning world of Pandora. Witness the next chapter of the epic saga.</p>
                    <div className="flex gap-4 pt-4">
                        <Link to="/" 
                        className="bg-white text-black px-10 py-3 rounded-md font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2"><span>▶</span> Play</Link>
                        <Link 
                          to="/subscribe" 
                          className="bg-yellow-500 text-black px-10 py-3 rounded-md font-bold text-lg hover:bg-yellow-400 transition-all flex items-center gap-2"
                        >Subscribe</Link>
                    </div>
                </div>
            </div>
            
            <button onClick={() => setIsMuted(!isMuted)} className="absolute bottom-24 right-8 z-30 bg-black/40 border border-white/20 p-3 rounded-full text-white">{isMuted ? '🔇' : '🔊'}</button>
        </div>
    )
}

export default Hero