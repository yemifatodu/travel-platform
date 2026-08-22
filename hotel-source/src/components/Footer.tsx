const Footer = () => {
  return (
    <div className="bg-teal-700 py-10 mt-auto">
      <div className="container mx-auto flex justify-between items-center text-white px-4">
        <span className="text-3xl font-bold tracking-tight">
          HolidayHotel
        </span>
        <span className="font-bold tracking-tight flex gap-4 cursor-pointer">
          <p className="hover:underline">Privacy Policy</p>
          <p className="hover:underline">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;