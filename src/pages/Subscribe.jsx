const Subscribe = () => {
  const plans = [
    { name: "Basic", price: "49k", quality: "720p" },
    { name: "Standard", price: "120k", quality: "1080p", hot: true },
    { name: "Premium", price: "186k", quality: "4K+HDR" }
  ]

  return (
    <div className="pt-32 pb-20 px-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">Choose Your Plan</h1>
      <p className="text-gray-400 text-center mb-12">No commitment, cancel anytime.</p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((p, i) => (
          <div key={i} className={`p-8 rounded-2xl border ${p.hot ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-800'} flex flex-col items-center`}>
            <h2 className="text-2xl font-bold">{p.name}</h2>
            <div className="text-3xl font-bold my-4">Rp {p.price}<span className="text-sm font-normal text-gray-500">/mo</span></div>
            <p className="text-sm text-gray-400 mb-8 italic">Resolution up to {p.quality}</p>
            <button className={`w-full py-3 rounded-lg font-bold transition ${p.hot ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-white text-black hover:bg-gray-200'}`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Subscribe