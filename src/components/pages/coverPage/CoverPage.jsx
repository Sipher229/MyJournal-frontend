import FormComponent from "./FormComponent"


function CoverPage() {
  return (
    <div className="h-full w-full bg-white">
        <div className="w-full h-full bg-coverBg bg-repeat-round flex justify-center items-center">
            <FormComponent />
        </div>
    </div>
  )
}

export default CoverPage