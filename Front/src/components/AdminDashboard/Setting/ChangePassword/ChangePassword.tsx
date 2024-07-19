"use client";
import ChangePasswordHook from "./ChangePasswordHook";

export default function ChangePassword() {
  const { isLoading, onChangePassword, setPassword, setPasswordConfirm } =
    ChangePasswordHook();
  return (
    <>
      <div className="flex items-center">
        <div className="flex flex-col space-y-2 gap-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <label htmlFor="login-password">
            <span className="text-sm text-gray-500">كلمة المرور الجديدة</span>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="login-password"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
              />
            </div>
          </label>
          <label htmlFor="login-password">
            <span className="text-sm text-gray-500">اعد كلمة السر</span>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type="password"
                id="login-password"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
              />
            </div>
          </label>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
      </div>
      <p className="mt-2">
        لا أستطيع تذكر كلمة مرورك الحالية.
        <a
          className="text-sm font-semibold text-blue-600 underline decoration-2"
          href="#"
        >
          استعادة حساب
        </a>
      </p>
      <button
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.5 : 1 }}
        onClick={(e) => onChangePassword(e)}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
      >

        {isLoading ? "جاري التحميل..." : "حفظ كلمة المرور"}

      </button>
    </>
  );
}
