import Back from "@/components/ui/back";

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center h-screen">
         <Back url={'/match'} className=''/>
         <h1 className=" textbase font-bold text-4xl mb-2 ">Date with.</h1>
       <p>Page No Found</p>
    </div>
  )
}