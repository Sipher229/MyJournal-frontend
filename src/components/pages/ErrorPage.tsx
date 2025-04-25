
function ErrorPage () {
  return (
    <>
        <div className="h-full w-full">
            <div className="w-full h-full bg-coverBg bg-repeat-round flex justify-center items-center">
                <div className='bg-white h-64 w-72 flex justify-center items-center shadow-md'> 
                    <h1 className='font-black text-4xl text-center'>
                        404: Page Not Found
                    </h1>
                </div>
            </div>
        </div>

    </>
  )
}

export default ErrorPage