export const MainPage = () => {
    return (
        <div className="flex bg-[#171A21]">
            <div className="container mx-auto relative">
                <div className="absolute w-[1235px] h-[629px] overflow-hidden">
                    <img
                        src="src/assets/img/casino-bg-image.png"
                        alt="Icon"
                        className="w-full h-full object-cover filter brightness-80 blur-[4px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#171A21] via-[rgba(22, 25, 32, 0.10)] to-[#171A21] via-[rgba(22,22,22,0)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171A21] via-[rgba(22, 25, 32, 0.10)] to-[#171A21] via-[rgba(22,22,22,0)]" />
                </div>
                <div className="text-white text-[46px] font-bold mb-[300px] relative z-10 mt-[100px]">
                    <span>
                        GET UP TO </span>
                    <span className="text-amber-400">$1500</span>
                    <span> BONUS
                    </span>
                    <div className="text-gray-400 text-[25px] font-bold">REGISTER AND GET YOUR BONUS</div>
                </div>
                <div className="w-full h-max-content bg-gray-800 rounded-[25px] p-[30px] text-white flex flex-col gap-[30px] relative z-10">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25,5" viewBox="0 0 40 34" fill="none">
                                <path d="M38.4359 16.2014L38.4359 16.2014C37.5563 11.6279 36.4615 8.16056 35.1174 5.68242C33.7762 3.20968 32.2088 1.7602 30.3929 1.14333C29.6152 0.880986 28.8098 0.750311 28.0014 0.75462L27.9987 0.754634C26.9464 0.754627 26.0237 1.0477 24.9621 1.38994C24.9621 1.38996 24.962 1.38997 24.962 1.38998L24.9554 1.3921C23.6803 1.80357 22.1782 2.28829 19.9983 2.28829C17.8176 2.28829 16.3144 1.80418 15.0364 1.39259L15.0314 1.39099L15.031 1.39085C13.9685 1.04763 13.0467 0.754627 11.9978 0.754627H11.9958C11.1567 0.751276 10.3206 0.881868 9.51092 1.14331C7.70708 1.75766 6.14607 3.20455 4.80497 5.67592C3.4604 8.15369 2.35955 11.6217 1.46711 16.1969C0.50784 21.1185 0.27397 25.0896 0.713068 27.9881C1.15408 30.8993 2.24818 32.5999 3.82309 33.2268L3.82604 33.2279C4.26678 33.4066 4.7285 33.4981 5.19244 33.5C6.27338 33.4997 7.28481 32.9819 8.2197 32.1809C9.15372 31.3806 9.9666 30.3356 10.6427 29.3679L38.4359 16.2014ZM38.4359 16.2014C39.3268 20.8311 39.6475 24.366 39.4385 27.0303C39.1628 30.5147 37.9743 32.5007 36.0874 33.2412L36.0863 33.2416M38.4359 16.2014L36.0863 33.2416M36.0863 33.2416C34.8995 33.7106 33.6643 33.5474 32.3679 32.6805C31.3811 32.0201 30.362 30.9496 29.258 29.3678L29.2579 29.3678M36.0863 33.2416L29.2579 29.3678M29.2579 29.3678C28.3199 28.024 27.2812 27.1152 25.8034 26.5579C24.3511 26.0103 22.5105 25.8163 19.9983 25.8163C17.1781 25.8163 15.25 26.0978 13.8154 26.693M29.2579 29.3678L13.8154 26.693M13.8154 26.693C12.3574 27.2978 11.4509 28.2091 10.6429 29.3676L13.8154 26.693ZM25.1094 8.15637L25.4868 8.48443L25.1094 8.15637C24.8126 8.49772 24.6168 8.9248 24.5379 9.3808C24.459 9.83683 24.4991 10.3101 24.655 10.7431C24.811 11.1761 25.0789 11.557 25.4346 11.8304C25.7916 12.1047 26.2199 12.2571 26.6653 12.2571C27.2644 12.2571 27.822 11.9828 28.2212 11.5236C28.6185 11.0667 28.8321 10.4602 28.8321 9.84001C28.8321 9.3763 28.7128 8.91844 28.4835 8.52378C28.2541 8.12879 27.9211 7.80943 27.5182 7.61747C27.1139 7.42483 26.6638 7.37281 26.2287 7.47236C25.7946 7.57168 25.4068 7.81436 25.1094 8.15637ZM32.1504 12.7413L31.7181 12.9925L32.1504 12.7413C31.9209 12.3464 31.588 12.027 31.1851 11.835C30.7807 11.6424 30.3307 11.5904 29.8955 11.6899C29.4614 11.7892 29.0737 12.0319 28.7763 12.3739C28.4795 12.7153 28.2837 13.1424 28.2048 13.5984C28.1259 14.0544 28.166 14.5277 28.3219 14.9606C28.4778 15.3937 28.7457 15.7746 29.1015 16.048C29.4584 16.3223 29.8867 16.4747 30.3322 16.4747C30.9312 16.4747 31.4889 16.2004 31.8881 15.7412C32.2854 15.2843 32.499 14.6778 32.499 14.0576C32.499 13.5939 32.3797 13.136 32.1504 12.7413ZM10.1644 16.0912V18.6586C10.1644 19.1771 10.3429 19.6861 10.6776 20.0711C11.0143 20.4583 11.4872 20.6922 11.9978 20.6922C12.5084 20.6922 12.9813 20.4583 13.318 20.0711C13.6528 19.6861 13.8312 19.1771 13.8312 18.6586V16.0912H15.9981C16.5087 16.0912 16.9816 15.8573 17.3182 15.4701C17.653 15.0851 17.8315 14.5761 17.8315 14.0576C17.8315 13.5391 17.653 13.0301 17.3182 12.6451C16.9816 12.2578 16.5087 12.0239 15.9981 12.0239H13.8312V9.4566C13.8312 8.93807 13.6528 8.4291 13.318 8.04407C12.9813 7.65683 12.5084 7.42293 11.9978 7.42293C11.4872 7.42293 11.0143 7.65683 10.6776 8.04407C10.3429 8.4291 10.1644 8.93807 10.1644 9.4566V12.0239H7.99759C7.48697 12.0239 7.01408 12.2578 6.6774 12.6451C6.34265 13.0301 6.16418 13.5391 6.16418 14.0576C6.16418 14.5761 6.34265 15.0851 6.6774 15.4701C7.01408 15.8573 7.48697 16.0912 7.99759 16.0912H10.1644ZM21.7678 16.048C22.1247 16.3223 22.553 16.4747 22.9985 16.4747C23.5975 16.4747 24.1552 16.2004 24.5544 15.7412C24.9516 15.2843 25.1652 14.6778 25.1652 14.0576C25.1652 13.5939 25.0459 13.136 24.8167 12.7413C24.5872 12.3464 24.2543 12.027 23.8514 11.835C23.447 11.6424 22.9969 11.5904 22.5618 11.6899C22.1277 11.7892 21.7399 12.0319 21.4425 12.3739C21.1458 12.7153 20.9499 13.1424 20.871 13.5984C20.7922 14.0544 20.8322 14.5277 20.9881 14.9606C21.1441 15.3937 21.412 15.7746 21.7678 16.048ZM25.4341 20.2651C25.7911 20.5397 26.2196 20.6922 26.6653 20.6922C27.2634 20.6922 27.8203 20.4188 28.2194 19.9609C28.6165 19.5053 28.8307 18.9002 28.8321 18.281C28.8331 17.8171 28.7147 17.3587 28.4861 16.9633C28.2573 16.5676 27.9248 16.2473 27.5221 16.0544C27.1179 15.8608 26.6676 15.8079 26.2321 15.9067C25.7976 16.0053 25.4092 16.2475 25.1113 16.5893C24.814 16.9305 24.6176 17.3576 24.5383 17.8138C24.459 18.27 24.4988 18.7435 24.6545 19.1768C24.8103 19.6102 25.0782 19.9914 25.4341 20.2651Z" fill="black" stroke="#959CAF" />
                            </svg>
                            <span className="font-bold">
                                In-House games
                            </span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <div className="w-max-content h-max-content bg-gray-700 rounded-md px-[10px] cursor-pointer">
                                <span className="font-bold">&#10094;</span>
                            </div>
                            <div className="w-max-content h-max-content bg-gray-700 rounded-md px-[10px] cursor-pointer">
                                <span className="font-bold">&#10095;</span>
                            </div>
                            <div className="w-max-content h-max-content bg-gray-700 rounded-md px-[10px] cursor-pointer">
                                <span className="font-bold">See all</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly">
                        {/* dices */}
                        <div className="w-[374px] h-[187.35px] bg-[#323846] rounded-[23px] border-2 border-gray-700 flex flex-row items-center justify-between px-4 py-6 gap-3">
                            <div className="rounded-full bg-neutral-800 inline-block">
                                <img
                                    src="src/assets/img/dices-small.png"
                                    alt="Icon"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex flex-row justify-between min-w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold">DICE</span>
                                        <div className="text-gray-400 font-medium">562 online</div>
                                    </div>
                                    <button className=" min-w-[100px] max-h-[45px] bg-blue-500 rounded-[10px] border border-blue-400 font-bold px-3">Play now</button>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Hourly drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">217.32</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                                                <path d="M9 19.8182C13.4183 19.8182 17 15.6504 17 10.5091C17 5.36783 13.4183 1.20001 9 1.20001C4.58172 1.20001 1 5.36783 1 10.5091C1 15.6504 4.58172 19.8182 9 19.8182Z" fill="#E5A425" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 6.7854H9.3999H10.1999C11.0835 6.7854 11.7999 7.61898 11.7999 8.64722C11.7999 9.67545 11.0835 10.509 10.1999 10.509H7.3999V6.7854Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005H7.40005ZM7.40005 6.78552V4.92371V6.78552ZM7.40005 6.78552H9.40005H7.40005ZM9.40005 6.78552V4.92371V6.78552Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005M7.40005 6.78552V4.92371M7.40005 6.78552H9.40005M9.40005 6.78552V4.92371" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 10.509H10.9999C11.8835 10.509 12.5999 11.3426 12.5999 12.3709C12.5999 13.3991 11.8835 14.2327 10.9999 14.2327H9.3999H7.3999V10.509Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945V14.2327ZM7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005H7.40005ZM9.40005 14.2327V16.0945V14.2327Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945M7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005M9.40005 14.2327V16.0945" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="w-[2px] bg-slate-400"></div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Daily drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">217.32</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                                                <path d="M9 19.8182C13.4183 19.8182 17 15.6504 17 10.5091C17 5.36783 13.4183 1.20001 9 1.20001C4.58172 1.20001 1 5.36783 1 10.5091C1 15.6504 4.58172 19.8182 9 19.8182Z" fill="#E5A425" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 6.7854H9.3999H10.1999C11.0835 6.7854 11.7999 7.61898 11.7999 8.64722C11.7999 9.67545 11.0835 10.509 10.1999 10.509H7.3999V6.7854Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005H7.40005ZM7.40005 6.78552V4.92371V6.78552ZM7.40005 6.78552H9.40005H7.40005ZM9.40005 6.78552V4.92371V6.78552Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005M7.40005 6.78552V4.92371M7.40005 6.78552H9.40005M9.40005 6.78552V4.92371" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 10.509H10.9999C11.8835 10.509 12.5999 11.3426 12.5999 12.3709C12.5999 13.3991 11.8835 14.2327 10.9999 14.2327H9.3999H7.3999V10.509Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945V14.2327ZM7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005H7.40005ZM9.40005 14.2327V16.0945V14.2327Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945M7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005M9.40005 14.2327V16.0945" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Rock paper scissorstel */}
                        <div className="w-[404px] h-[187.35px] bg-[#323846] rounded-[23px] border-2 border-gray-700 flex flex-row items-center justify-between px-4 py-6 gap-3">
                            <div className="rounded-full w-[140px] bg-neutral-800 inline-block">
                                <img
                                    src="src/assets/img/rps-small.png"
                                    alt="Icon"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex flex-row justify-between min-w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold uppercase">Rock paper scissors</span>
                                        <div className="text-gray-400 font-medium">689 online</div>
                                    </div>
                                    <button className="bg-blue-500 min-w-[103px] max-h-[45px] rounded-[10px] border border-blue-400 font-bold px-3 inline-block">Play now</button>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Hourly drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">367.27</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                                                <path d="M9 19.8182C13.4183 19.8182 17 15.6504 17 10.5091C17 5.36783 13.4183 1.20001 9 1.20001C4.58172 1.20001 1 5.36783 1 10.5091C1 15.6504 4.58172 19.8182 9 19.8182Z" fill="#E5A425" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 6.7854H9.3999H10.1999C11.0835 6.7854 11.7999 7.61898 11.7999 8.64722C11.7999 9.67545 11.0835 10.509 10.1999 10.509H7.3999V6.7854Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005H7.40005ZM7.40005 6.78552V4.92371V6.78552ZM7.40005 6.78552H9.40005H7.40005ZM9.40005 6.78552V4.92371V6.78552Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005M7.40005 6.78552V4.92371M7.40005 6.78552H9.40005M9.40005 6.78552V4.92371" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 10.509H10.9999C11.8835 10.509 12.5999 11.3426 12.5999 12.3709C12.5999 13.3991 11.8835 14.2327 10.9999 14.2327H9.3999H7.3999V10.509Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945V14.2327ZM7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005H7.40005ZM9.40005 14.2327V16.0945V14.2327Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945M7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005M9.40005 14.2327V16.0945" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="w-[2px] bg-slate-400"></div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Daily drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">1,984.18</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                                                <path d="M9 19.8182C13.4183 19.8182 17 15.6504 17 10.5091C17 5.36783 13.4183 1.20001 9 1.20001C4.58172 1.20001 1 5.36783 1 10.5091C1 15.6504 4.58172 19.8182 9 19.8182Z" fill="#E5A425" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 6.7854H9.3999H10.1999C11.0835 6.7854 11.7999 7.61898 11.7999 8.64722C11.7999 9.67545 11.0835 10.509 10.1999 10.509H7.3999V6.7854Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005H7.40005ZM7.40005 6.78552V4.92371V6.78552ZM7.40005 6.78552H9.40005H7.40005ZM9.40005 6.78552V4.92371V6.78552Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005M7.40005 6.78552V4.92371M7.40005 6.78552H9.40005M9.40005 6.78552V4.92371" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 10.509H10.9999C11.8835 10.509 12.5999 11.3426 12.5999 12.3709C12.5999 13.3991 11.8835 14.2327 10.9999 14.2327H9.3999H7.3999V10.509Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945V14.2327ZM7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005H7.40005ZM9.40005 14.2327V16.0945V14.2327Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945M7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005M9.40005 14.2327V16.0945" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[374px] h-[187.35px] bg-[#323846] rounded-[23px] border-2 border-gray-700 flex flex-row items-center justify-between px-4 py-6 gap-3">
                            <div className="rounded-full bg-neutral-800 inline-block">
                                <img
                                    src="src/assets/img/slot-machine-small.png"
                                    alt="Icon"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex flex-row justify-between min-w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold uppercase">Slot machine</span>
                                        <div className="text-gray-400 font-medium">315 online</div>
                                    </div>
                                    <button className="bg-blue-500 min-w-[103px] max-h-[45px] rounded-[10px] border border-blue-400 font-bold px-3 inline-block">Play now</button>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Hourly drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">198.47</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                                                <path d="M9 19.8182C13.4183 19.8182 17 15.6504 17 10.5091C17 5.36783 13.4183 1.20001 9 1.20001C4.58172 1.20001 1 5.36783 1 10.5091C1 15.6504 4.58172 19.8182 9 19.8182Z" fill="#E5A425" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 6.7854H9.3999H10.1999C11.0835 6.7854 11.7999 7.61898 11.7999 8.64722C11.7999 9.67545 11.0835 10.509 10.1999 10.509H7.3999V6.7854Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005H7.40005ZM7.40005 6.78552V4.92371V6.78552ZM7.40005 6.78552H9.40005H7.40005ZM9.40005 6.78552V4.92371V6.78552Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005M7.40005 6.78552V4.92371M7.40005 6.78552H9.40005M9.40005 6.78552V4.92371" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 10.509H10.9999C11.8835 10.509 12.5999 11.3426 12.5999 12.3709C12.5999 13.3991 11.8835 14.2327 10.9999 14.2327H9.3999H7.3999V10.509Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945V14.2327ZM7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005H7.40005ZM9.40005 14.2327V16.0945V14.2327Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945M7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005M9.40005 14.2327V16.0945" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="w-[2px] bg-slate-400"></div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Daily drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">1,487.28</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                                                <path d="M9 19.8182C13.4183 19.8182 17 15.6504 17 10.5091C17 5.36783 13.4183 1.20001 9 1.20001C4.58172 1.20001 1 5.36783 1 10.5091C1 15.6504 4.58172 19.8182 9 19.8182Z" fill="#E5A425" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 6.7854H9.3999H10.1999C11.0835 6.7854 11.7999 7.61898 11.7999 8.64722C11.7999 9.67545 11.0835 10.509 10.1999 10.509H7.3999V6.7854Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005H7.40005ZM7.40005 6.78552V4.92371V6.78552ZM7.40005 6.78552H9.40005H7.40005ZM9.40005 6.78552V4.92371V6.78552Z" fill="#E5A425" />
                                                <path d="M7.40005 6.78552V10.5092H10.2C11.0837 10.5092 11.8 9.67558 11.8 8.64734C11.8 7.61911 11.0837 6.78552 10.2 6.78552H9.40005M7.40005 6.78552H5.80005M7.40005 6.78552V4.92371M7.40005 6.78552H9.40005M9.40005 6.78552V4.92371" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.3999 10.509H10.9999C11.8835 10.509 12.5999 11.3426 12.5999 12.3709C12.5999 13.3991 11.8835 14.2327 10.9999 14.2327H9.3999H7.3999V10.509Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945V14.2327ZM7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005H7.40005ZM9.40005 14.2327V16.0945V14.2327Z" fill="#E5A425" />
                                                <path d="M7.40005 14.2327V10.509H11C11.8837 10.509 12.6 11.3426 12.6 12.3709C12.6 13.3991 11.8837 14.2327 11 14.2327H9.40005M7.40005 14.2327V16.0945M7.40005 14.2327H5.80005H9.40005M7.40005 14.2327H9.40005M9.40005 14.2327V16.0945" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};