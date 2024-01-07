import { FC } from 'react';

const ProfileIcon: FC = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
        <g filter="url(#filter0_d_37_572)">
            <rect x="4" y="4" width="42" height="42" rx="10" fill="#4F5563" />
            <path d="M39.745 31C39.4345 30.1224 38.8595 29.3626 38.0993 28.8254C37.339 28.2881 36.4309 27.9997 35.5 28H14.5C13.3065 28 12.1619 28.4741 11.318 29.318C10.4741 30.1619 10 31.3065 10 32.5V33.5725C10 39.1495 16.315 43 25 43C29.593 43 33.523 41.8645 36.2065 40H25V38.5H37.951C38.5915 37.8085 39.0955 37.054 39.4435 36.25H25V34.75H39.895C39.9647 34.3614 39.9998 33.9673 40 33.5725V32.5H25V31H39.745ZM34 16C33.9998 15.6239 33.9768 15.2483 33.931 14.875H25V13.375H33.61C33.368 12.5802 33.0166 11.823 32.566 11.125H25V9.625H31.3525C30.0926 8.36945 28.4889 7.51539 26.7439 7.17065C24.9989 6.82591 23.1909 7.00597 21.5482 7.68807C19.9055 8.37018 18.5018 9.52375 17.5142 11.0031C16.5266 12.4825 15.9996 14.2213 15.9996 16C15.9996 17.7787 16.5266 19.5175 17.5142 20.9969C18.5018 22.4762 19.9055 23.6298 21.5482 24.3119C23.1909 24.994 24.9989 25.1741 26.7439 24.8293C28.4889 24.4846 30.0926 23.6305 31.3525 22.375H25V20.875H32.566C33.013 20.185 33.367 19.429 33.6115 18.625H25V17.125H33.931C33.9768 16.7517 33.9998 16.376 34 16Z" fill="url(#paint0_linear_37_572)" />
        </g>
        <defs>
            <filter id="filter0_d_37_572" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="4" dy="4" />
                <feGaussianBlur stdDeviation="4" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_572" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_572" result="shape" />
            </filter>
            <linearGradient id="paint0_linear_37_572" x1="10" y1="25" x2="40" y2="25" gradientUnits="userSpaceOnUse">
                <stop stop-color="#171A21" />
                <stop offset="0.536458" stop-color="#171A21" />
                <stop offset="1" stop-color="#171A21" stop-opacity="0.05" />
            </linearGradient>
        </defs>
    </svg>;
}

export default ProfileIcon;