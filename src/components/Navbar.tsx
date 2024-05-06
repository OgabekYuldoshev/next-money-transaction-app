import Profile from "./Profile";

const Navbar = () => {
  return (
    <div className="block relative border-b">
      <div className="container py-4 flex items-center justify-between">
        <h1 className="font-bold text-2xl">LOGO</h1>
        <div className="flex gap-2 items-center">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
