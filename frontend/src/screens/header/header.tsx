const Header = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-10 w-full ">
        <div className="col-span-2 text-2xl pl-5 pt-5 pb-3">
          <span className="text-green-500">$pend</span>{" "}
          <span className="text-green-500">$</span>ense
        </div>
        <div className="border border-blue-500 col-span-8">World</div>
      </div>
    </div>
  );
};

export default Header;
