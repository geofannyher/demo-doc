import ai from "../assets/image.jpeg";

const Navbar = () => {
  return (
    <div className="bg-mainColor rounded-br-xl rounded-bl-xl shadow-md">
      <nav className="container mx-auto z-20 w-full">
        <div className=" max-w-screen-xl items-center justify-between p-4">
          <div className="grid grid-cols-12">
            <div className="col-span-6  md:col-span-6 lg:col-span-6">
              <div className="flex items-center gap-2">
                <div className="relative flex">
                  <img
                    src={ai}
                    className="h-10 w-10 items-center justify-center rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col text-white">
                  <h1 className="font-semibold">LAPOR!</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
