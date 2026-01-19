const Feature = () => {
    const features = [
        {
            id: 1,
            icon: "🌐",
            title: "Worldwide Trailers",
            desc: "More content to and from more contries worldwide"
        },
        { 
            id: 2,
            icon: "🎞️",
            title: "Thousands of Titles",
            desc: "Choose from movies, shows and music documentaries AMC TV and more"            
        },
        {
            id: 3,
            icon: "🚫",
            title: "No More Ads",
            desc: "Enjoy your favorite content without any interuptions from advertisements"
        },
        {
            id: 4,
            icon: "📱",
            title: "Device Friendly",
            desc: "Stream the good stuff your devices including Apple, Android, Smart TVs and more"
        },
    ]

    return (
        <div className="py-20 bg-black px-8">
            <div className="grid md:grid-cols-4 gap-10 md:gap-5 text-center max-w-6xl mx-auto">
                {features.map((f) => (
                    <div key={f.id} className="space-y-4 bg-[#141414] rounded-lg p-5">
                        <div className="text-5xl">{f.icon}</div>
                        <h3 className="text-xl font-bold">{f.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Feature