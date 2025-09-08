import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function SignIn() {
  useEffect(() => {
    document.title = "Sign In | Cat";
  }, []);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex justify-center items-center mx-auto bg-[#D2EEF5]">
      <div className="w-[80%] h-[700px] flex flex-col justify-between rounded-[20px] border-white border-2 bg-transparent p-2">
        <form
          action=""
          className="bg-white h-full rounded-[20px] flex flex-col p-5 justify-start"
        >
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-1/2 h-full ">
              <header className="flex justify-start gap-4">
                <iconify-icon
                  icon="dinkie-icons:cat-face"
                  width="48"
                  height="48"
                  style={{ color: "#4d4d4d" }}
                ></iconify-icon>
              </header>
              <div className="w-full flex flex-col justify-center items-center mt-15 px-20">
                <h1 className="text-[36px] w-full font-medium text-start text-[#2C2C2C]">
                  Login in to your Account
                </h1>
                <p className="w-full -m-1 text-start text-[15px] font-normal text-[#2C2C2C]">
                  New here?{" "}
                  <span
                    onClick={() => navigate("/sign-up")}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Create an account
                  </span>{" "}
                  and join the community!
                </p>
                <div className="w-full mt-4 flex flex-col gap-4">
                  <label className="text-[#2C2C2C] text-[15px] font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    className="h-[37px] -mt-2 w-full px-4 text-[#2C2C2C] border border-gray-400 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px]"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="w-full mt-2 flex flex-col gap-4">
                  <label className="text-[#2C2C2C] text-[15px] font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    className="h-[37px] -mt-2 w-full px-4 text-[#2C2C2C] border border-gray-400 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px]"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-start w-full mt-2">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    className="ms-2 text-sm font-medium text-[#2C2C2C]"
                  >
                    Remember me
                  </label>
                </div>
                {/* <div className="flex items-center w-full my-2"> */}
                  {/* <hr className="flex-grow border-gray-300" /> */}
                  {/* <p className="mx-2 text-gray-500">OR</p> */}
                  {/* <hr className="flex-grow border-gray-300" /> */}
                {/* </div> */}

                {/* <div className="flex w-full justify-between items-center gap-2"> */}
                  {/* <button className="w-full flex items-center h-[37px] border border-gray-400 px-3 text-[#2C2C2C] text-[15px] font-medium rounded-[10px]"> */}
                    {/* <iconify-icon */}
                      {/* className="pe-1" */}
                      {/* icon="flat-color-icons:google" */}
                      {/* width="28" */}
                      {/* height="28" */}
                    {/* ></iconify-icon> */}
                    {/* Sign In with Google */}
                  {/* </button> */}
                  {/* <button className="w-full h-[37px] flex items-center border border-gray-400 px-3 text-[#2C2C2C] text-[15px] font-medium rounded-[10px]"> */}
                    {/* <iconify-icon */}
                      {/* className="pe-1" */}
                      {/* icon="logos:facebook" */}
                      {/* width="28" */}
                      {/* height="28" */}
                    {/* ></iconify-icon> */}
                    {/* Sign In with Facebook */}
                  {/* </button> */}
                {/* </div> */}
                <div className="w-full flex flex-col gap-4">
                  <button
                    type="submit"
                    className="h-[37px] w-full px-4 text-white bg-[#4153EF] mt-4 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px] font-semibold"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full bg-[#4153EF] rounded-[20px]">
              <header>
                <h1 className="text-[36px] font-semibold text-[#2C2C2C]"></h1>
              </header>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
