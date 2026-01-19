import Hero from '../components/Hero'
import Features from '../components/Feature'
import MovieList from '../components/MovieList'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="overflow-x-hidden">
        <Hero />
        <div className="px-8 md:px-16 -mt-20 relative z-10">
          <MovieList />
        </div>
        <Features />
      </div>
      <Footer />
    </div>
    
  )
}

export default Home