interface RegisterFormProps {
  switchToLogin: () => void;
}


function registerForm({ switchToLogin }: RegisterFormProps) {
  return (
    <>
        <form className="flex flex-col gap-8 ml-4 mr-4">
            <input className="border-b-2 border-gray-300 transition duration-300 ease-in-out focus-within:border-b-black outline-none pl-1 pr-1 pb-0.5"
             placeholder="Tài khoản" 
             type="text" 
             id="username" 
             name="username" 
             required />

            <input className="border-b-2 border-gray-300 transition duration-300 ease-in-out focus-within:border-b-black outline-none pl-1 pr-1 pb-0.5"
             placeholder="Email" 
             type="email" 
             id="email" 
             name="email" 
             required />

            <input className="border-b-2 border-gray-300 transition duration-300 ease-in-out focus-within:border-b-black outline-none pl-1 pr-1 pb-0.5"
             placeholder="Mật khẩu" 
             type="password" 
             id="password" 
             name="password" 
             required />

            <input className="border-b-2 border-gray-300 transition duration-300 ease-in-out focus-within:border-b-black outline-none pl-1 pr-1 pb-0.5"
             placeholder="Nhập lại mật khẩu" 
             type="password" 
             id="confirm-password" 
             name="confirm-password" 
             required />

            <button type="button" 
            className="text-center mt-4 mb-4 p-2 pr-4 pl-4 font-bold text-base border-2 cursor-pointer rounded-4xl text-nowrap transition hover:bg-black hover:text-white hover:border-black">
                Đăng ký
            </button>
        </form>

        <p className="text-center mt-4 flex flex-row justify-center gap-4 items-center ml-4 mr-4 text-nowrap">
            Chưa có tài khoản?
            <button type="button" className="bg-blue-500 text-white rounded-4xl p-2 pl-4 pr-4 text-nowrap transition hover:bg-indigo-600 cursor-pointer max-w-[120px] w-full" onClick={switchToLogin}>
                Đăng nhập
            </button>
        </p>
    </>
  );
}

export default registerForm