 
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <div>
      {children}
      <h1 className=" ml-5 text-7xl max-md:text-6xl text-[100px]  flex flex-col font-bold my-10 text-[#8d8d8d82]"><span className="block mb-10">Made</span> With Love ♡.</h1>
    </div>
  );
}
