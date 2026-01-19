import { HiOutlineMail, HiOutlineLibrary, HiOutlineCreditCard, HiLogout } from 'react-icons/hi';

const Profile = () => {
  // Data dummy (nanti bisa kamu hubungkan dengan database)
  const user = {
    name: "Yasmin",
    email: "yasmin@example.com",
    plan: "Premium Member",
    memberSince: "January 2026",
    avatar: "https://ui-avatars.com/api/?name=Yasmin+Allya&background=EAB308&color=fff"
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white pt-32 pb-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Account Settings</h1>

        {/* 1. HEADER PROFIL */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-[#181818] p-8 rounded-2xl border border-gray-800 shadow-xl mb-8">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-yellow-500 shadow-2xl"
          />
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-black tracking-tight">{user.name}</h2>
            <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mt-2">
              <HiOutlineMail /> {user.email}
            </p>
            <div className="mt-4 inline-block bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
              {user.plan}
            </div>
          </div>
          <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-bold transition border border-white/10">
            Edit Profile
          </button>
        </div>

        {/* 2. MENU SETTINGS */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Box Detail Langganan */}
          <div className="bg-[#181818] border border-gray-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <HiOutlineCreditCard className="text-yellow-500 text-2xl" />
              <h3 className="text-xl font-bold">Billing & Plan</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-400">Current Plan</span>
                <span className="font-bold">Premium (4K + HDR)</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-400">Next Billing</span>
                <span className="font-bold">19 Feb 2026</span>
              </div>
              <button className="w-full text-center text-yellow-500 font-bold hover:underline mt-2">
                Manage Payment Method
              </button>
            </div>
          </div>

          {/* Box Aktivitas */}
          <div className="bg-[#181818] border border-gray-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <HiOutlineLibrary className="text-yellow-500 text-2xl" />
              <h3 className="text-xl font-bold">Library Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 p-4 rounded-xl text-center">
                <p className="text-2xl font-black">12</p>
                <p className="text-xs text-gray-400 uppercase">Watchlist</p>
              </div>
              <div className="bg-black/40 p-4 rounded-xl text-center">
                <p className="text-2xl font-black">145</p>
                <p className="text-xs text-gray-400 uppercase">Watched</p>
              </div>
            </div>
            <button className="w-full text-center text-gray-400 hover:text-white mt-6 text-sm transition">
              View History
            </button>
          </div>
        </div>

        {/* 3. TOMBOL LOGOUT */}
        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-500/10 px-8 py-3 rounded-full border border-red-500/20 transition duration-300">
            <HiLogout size={20} /> Logout from all devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;