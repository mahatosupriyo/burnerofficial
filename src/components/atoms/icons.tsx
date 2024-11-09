import React from 'react'

type IconProps = {
    name: 'instagram' |
    'upload' |
    'link' |
    'generate' |
    'series' |
    'activeupload' |
    'downarrow' |
    'home' |
    'activesearch' |
    'close' |
    'verified' |
    'linkedin' |
    'x' |
    'behance' |
    'dribbble' |
    'freebies' |
    'job' |
    'campus' |
    'store' |
    'language' |
    'time' |
    'live' |
    'resources'
    size?: number
    fill?: string
}

export default function Icon({ name, size = 24, fill = 'currentColor' }: IconProps) {
    const svgProps = {
        width: size,
        height: size,
        fill: fill,
    }

    switch (name) {
        case 'instagram':
            return (
                <svg height={size} viewBox="0 0 125 121" fill={fill} xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M47.8373 25.4357C42.0583 25.6964 37.0494 27.1093 33.0048 31.1368C28.9461 35.1855 27.5508 40.2143 27.2894 45.9331C27.1269 49.5026 26.1767 76.469 28.932 83.5409C30.79 88.3119 34.4495 91.9803 39.2641 93.8443C41.5107 94.7181 44.0753 95.3096 47.8373 95.4823C79.2932 96.9059 90.9535 96.1309 95.8706 83.5409C96.7431 81.2999 97.3436 78.7376 97.5097 74.9849C98.9473 43.4483 97.2766 36.6126 91.7943 31.1368C87.4459 26.7992 82.331 23.8465 47.8373 25.4357ZM48.1269 89.1398C44.6828 88.9847 42.8142 88.4109 41.5672 87.9282C38.4305 86.709 36.0744 84.3626 34.8628 81.2442C32.7646 75.8706 33.4605 50.3489 33.6477 46.2191C33.8314 42.174 34.6509 38.477 37.505 35.6229C41.0374 32.0992 45.6012 30.3723 76.6756 31.7747C80.7308 31.9579 84.4363 32.7758 87.2976 35.6229C90.8299 39.1465 92.582 43.7454 91.1549 74.7006C90.9995 78.1362 90.4237 80.0003 89.9398 81.2442C86.743 89.4366 79.3885 90.5739 48.1269 89.1398ZM77.0183 41.6482C77.0183 43.9808 78.9152 45.8777 81.2572 45.8777C83.5992 45.8777 85.4996 43.9808 85.4996 41.6482C85.4996 39.3155 83.5992 37.4204 81.2572 37.4204C78.9152 37.4204 77.0183 39.3155 77.0183 41.6482ZM44.2625 60.4573C44.2625 70.4503 52.3834 78.5522 62.4013 78.5522C72.4191 78.5522 80.5401 70.4503 80.5401 60.4573C80.5401 50.4642 72.4191 42.3675 62.4013 42.3675C52.3834 42.3675 44.2625 50.4642 44.2625 60.4573ZM50.6278 60.4573C50.6278 53.9738 55.8982 48.7135 62.4013 48.7135C68.9044 48.7135 74.1748 53.9738 74.1748 60.4573C74.1748 66.9443 68.9044 72.2062 62.4013 72.2062C55.8982 72.2062 50.6278 66.9443 50.6278 60.4573Z" />
                </svg>
            )

        case 'link':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 100 100" fill={fill}>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M72.7644 26H49.235C45.3288 26.0078 41.5489 27.4102 38.5537 29.9688C35.555 32.5274 33.5368 36.0782 32.8437 39.9998H27.666C21.7109 39.9998 16.2072 43.2381 13.2317 48.4998C10.2562 53.7615 10.256 60.2378 13.2317 65.4998C16.2074 70.7618 21.7105 73.9998 27.666 73.9998H51.1954C55.1017 73.992 58.8815 72.5896 61.8797 70.031C64.8745 67.4724 66.8928 63.9216 67.5859 60H72.7636C78.7187 60 84.2224 56.7617 87.1979 51.5C90.1734 46.2383 90.1736 39.762 87.1979 34.5C84.2222 29.238 78.7199 26 72.7644 26ZM51.1958 68H27.6664C21.7113 68 16.8821 63.0742 16.8821 57C16.8821 50.9258 21.7113 46 27.6664 46H32.844C33.5372 49.9219 35.5554 53.4727 38.554 56.031C41.5489 58.5896 45.3288 59.9919 49.2354 59.9998H61.5629C60.2493 64.7303 56.0172 67.9961 51.1958 68ZM49.235 54C44.4135 53.9961 40.1817 50.7305 38.8684 46H51.1958C56.0174 46.0039 60.2491 49.2695 61.5625 54H49.235ZM72.7644 54H67.5868C66.8936 50.0781 64.8754 46.5273 61.8806 43.969C58.882 41.4104 55.1021 40.0081 51.1963 40.0002H38.8688C40.1824 35.2697 44.4141 32.0041 49.2355 32.0002H72.7649C78.72 32.0002 83.5492 36.926 83.5492 43.0002C83.5492 49.0744 78.7195 54 72.7644 54Z" />
                </svg>
            )

        case 'downarrow':
            return (

                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 40 40" fill={fill}>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M26.4383 16L20.4818 21.7022L14.4891 16.0363L13 17.5254L20.4455 24.7893L28 17.5617L26.4383 16Z" fill="white" />
                </svg>
            )

        case
            'language':
            return (

                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill={fill}>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.36 63.84C21 61.13 21 57.95 21 54.26H21.01V46.73C21.01 43.05 21.01 39.86 21.37 37.15C21.91 33.09 23.29 30.08 25.69 27.68C28.1 25.28 31.11 23.91 35.16 23.36C37.87 23 41.05 23 44.74 23H61.27C64.96 23 68.14 23 70.85 23.36C74.91 23.91 77.92 25.28 80.32 27.68C82.72 30.08 84.09 33.09 84.64 37.15C84.9 39.14 84.97 41.39 84.99 43.91V43.99V44.05V46.73V54.26C84.99 57.95 84.99 61.13 84.63 63.84C84.09 67.9 82.71 70.91 80.31 73.31C77.9 75.71 74.89 77.08 70.84 77.63C69.4 77.82 67.58 77.92 66.34 77.96L60.36 83.94C58.4 85.91 55.78 86.99 53 86.99C50.22 86.99 47.61 85.91 45.64 83.94L39.65 77.96C38.43 77.92 36.59 77.82 35.15 77.63C31.09 77.08 28.08 75.71 25.68 73.31C23.28 70.91 21.9 67.9 21.36 63.84ZM69.77 31.29C67.6 31 64.66 31 61.26 31H52.99H43.71C40.75 31 38.18 31.03 36.22 31.29C33.34 31.68 32.14 32.54 31.34 33.34C30.54 34.14 29.68 35.34 29.29 38.22C29 40.41 29 43.34 29 46.74L29.01 46.73V54.26C29.01 57.66 29.01 60.6 29.3 62.78C29.69 65.66 30.55 66.86 31.35 67.66C32.15 68.45 33.35 69.32 36.23 69.71C37.51 69.88 39.53 69.97 41 70C42.76 70 43.85 70.85 44.76 71.76L51.29 78.29C52.22 79.22 53.78 79.22 54.71 78.29L61.24 71.76C62.15 70.85 63.24 70 65 70C66.47 69.97 68.49 69.88 69.78 69.71C72.66 69.32 73.86 68.46 74.66 67.66C75.46 66.86 76.32 65.66 76.71 62.78C77 60.59 77 57.66 77 54.26V48L76.87 40C76.83 39.36 76.77 38.77 76.7 38.22C76.31 35.34 75.45 34.14 74.65 33.34C73.85 32.55 72.65 31.68 69.77 31.29Z" />
                </svg>
            )

        case
            'series':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill={fill}>
                    <path d="M65.9997 77.6497L61.9997 32.6497C61.9068 31.5888 61.3964 30.6083 60.5806 29.9238C59.7648 29.2392 58.7105 28.9068 57.6497 28.9997C56.5888 29.0925 55.6083 29.6029 54.9238 30.4187C54.2392 31.2345 53.9068 32.2888 53.9997 33.3497L57.9997 78.3497C58.0874 79.3487 58.5473 80.2784 59.2881 80.9544C60.029 81.6305 60.9967 82.0035 61.9997 81.9997C62.1195 82.0096 62.2399 82.0096 62.3597 81.9997C62.8848 81.9544 63.3959 81.8058 63.8634 81.5624C64.3309 81.319 64.7458 80.9856 65.084 80.5814C65.4223 80.1772 65.6773 79.7101 65.8344 79.2069C65.9916 78.7038 66.0477 78.1746 65.9997 77.6497Z" />
                    <path d="M84.9303 77.28L77.9303 39.28C77.8584 38.7433 77.6783 38.2269 77.4008 37.762C77.1234 37.297 76.7545 36.8932 76.3164 36.5751C75.8784 36.2569 75.3803 36.031 74.8523 35.911C74.3244 35.791 73.7775 35.7794 73.245 35.877C72.7124 35.9746 72.2052 36.1792 71.7541 36.4786C71.303 36.778 70.9173 37.1658 70.6205 37.6186C70.3237 38.0714 70.1219 38.5798 70.0273 39.1129C69.9327 39.6459 69.9474 40.1927 70.0703 40.72L77.0703 78.72C77.2387 79.6399 77.724 80.4717 78.442 81.0709C79.1599 81.6702 80.0652 81.9989 81.0003 82C81.2454 82.002 81.4901 81.9785 81.7303 81.93C82.7702 81.7356 83.6907 81.1372 84.2905 80.2657C84.8902 79.3942 85.1203 78.3207 84.9303 77.28Z" />
                    <path d="M31 82H37C39.6522 82 42.1957 80.9464 44.0711 79.0711C45.9464 77.1957 47 74.6522 47 72V32C47 29.3478 45.9464 26.8043 44.0711 24.9289C42.1957 23.0536 39.6522 22 37 22H31C28.3478 22 25.8043 23.0536 23.9289 24.9289C22.0536 26.8043 21 29.3478 21 32V72C21 74.6522 22.0536 77.1957 23.9289 79.0711C25.8043 80.9464 28.3478 82 31 82ZM29 32C29 31.4696 29.2107 30.9609 29.5858 30.5858C29.9609 30.2107 30.4696 30 31 30H37C37.5304 30 38.0391 30.2107 38.4142 30.5858C38.7893 30.9609 39 31.4696 39 32V72C39 72.5304 38.7893 73.0391 38.4142 73.4142C38.0391 73.7893 37.5304 74 37 74H31C30.4696 74 29.9609 73.7893 29.5858 73.4142C29.2107 73.0391 29 72.5304 29 72V32Z" />
                </svg>
            )

        case
            'time':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill={fill}>
                    <path d="M52 85C69.64 85 84 70.64 84 53C84 35.36 69.64 21 52 21C34.36 21 20 35.36 20 53C20 70.64 34.36 85 52 85ZM52 29C65.23 29 76 39.77 76 53C76 66.23 65.23 77 52 77C38.77 77 28 66.23 28 53C28 39.77 38.77 29 52 29Z" />
                    <path d="M43.9997 65C44.6997 65 45.4097 64.82 46.0497 64.43L52.1697 60.76C55.7597 58.6 57.9997 54.66 57.9997 50.47V41C57.9997 38.79 56.2097 37 53.9997 37C51.7897 37 49.9997 38.79 49.9997 41V50.47C49.9997 51.87 49.2597 53.18 48.0597 53.9L41.9397 57.57C40.0497 58.71 39.4297 61.16 40.5697 63.06C41.3197 64.31 42.6397 65 43.9997 65Z" />
                </svg>
            )

        case
            'resources':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill={fill}>
                    <path d="M20 49C20 51.21 21.79 53 24 53C26.21 53 28 51.21 28 49V33C28 30.79 29.79 29 32 29H44.34L49.99 34.65C51.48 36.14 53.54 37 55.65 37H71.99C74.2 37 75.99 38.79 75.99 41V53C75.99 63.41 75.99 68.64 73.97 71.67C73.09 72.99 71.97 74.1 70.66 74.98C69.28 75.9 67.47 76.41 64.6 76.7C62.4 76.92 60.79 78.87 61.01 81.07C61.21 83.14 62.95 84.68 64.99 84.68C65.12 84.68 65.25 84.68 65.39 84.66C69.6 84.25 72.6 83.31 75.11 81.63C77.3 80.17 79.16 78.31 80.63 76.11C84 71.07 84 65.03 84 53V41C84 34.38 78.62 29 72 29H55.66L50 23.34C48.49 21.83 46.48 21 44.34 21H32C25.38 21 20 26.38 20 33V49Z" />
                    <path d="M24 85H47C49.21 85 51 83.21 51 81C51 78.79 49.21 77 47 77H24C21.79 77 20 78.79 20 81C20 83.21 21.79 85 24 85Z" />
                    <path d="M24 69H39C41.21 69 43 67.21 43 65C43 62.79 41.21 61 39 61H24C21.79 61 20 62.79 20 65C20 67.21 21.79 69 24 69Z" />
                </svg>
            )

        case
            'live':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill={fill}>
                    <path d="M20 43.23C20 47.31 23.06 50.73 27.12 51.18C40 52.61 50.39 63 51.82 75.88C52.27 79.94 55.69 83 59.77 83H70C77.72 83 84 76.72 84 69V37C84 29.28 77.72 23 70 23H34C26.28 23 20 29.28 20 37V43.23ZM28 37C28 33.69 30.69 31 34 31H70C73.31 31 76 33.69 76 37V69C76 72.31 73.31 75 70 75H59.77C57.93 58.43 44.57 45.07 28 43.23V37Z" />
                    <path d="M24 67C30.62 67 36 72.38 36 79C36 81.21 37.79 83 40 83C42.21 83 44 81.21 44 79C44 67.97 35.03 59 24 59C21.79 59 20 60.79 20 63C20 65.21 21.79 67 24 67Z" />
                    <path d="M24 83C26.2091 83 28 81.2091 28 79C28 76.7909 26.2091 75 24 75C21.7909 75 20 76.7909 20 79C20 81.2091 21.7909 83 24 83Z" />
                </svg>
            )


        case 'upload':
            return (

                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill={fill}>
                    <path d="M30.9971 23C28.7871 23 26.9971 24.79 26.9971 27C26.9971 29.21 28.7871 31 30.9971 31H72.9971C75.2071 31 76.9971 29.21 76.9971 27C76.9971 24.79 75.2071 23 72.9971 23H30.9971Z" />
                    <path d="M76.1469 61.0702C76.7369 63.2002 78.9369 64.4402 81.0769 63.8502C83.2069 63.2602 84.4469 61.0502 83.8569 58.9202C81.6969 51.1602 79.5869 46.0102 75.2369 42.6902C70.3969 38.9902 64.4369 38.9902 53.6169 38.9902H50.3869C39.5669 38.9902 33.6069 38.9902 28.7669 42.6902C24.4169 46.0202 22.3069 51.1602 20.1469 58.9202C19.5569 61.0502 20.7969 63.2502 22.9269 63.8502C23.2869 63.9502 23.6469 64.0002 24.0069 64.0002C25.7569 64.0002 27.3669 62.8402 27.8569 61.0702C29.8469 53.9302 31.3569 50.7802 33.6269 49.0502C36.2069 47.0802 40.3769 47.0002 50.3869 47.0002H53.6169C63.6269 47.0002 67.7969 47.0802 70.3769 49.0502C72.6469 50.7802 74.1569 53.9302 76.1469 61.0702Z" />
                    <path d="M51.9971 87C54.2071 87 55.9971 85.21 55.9971 83V66.66L61.1671 71.83C61.9471 72.61 62.9771 73 63.9971 73C65.0171 73 66.0471 72.61 66.8271 71.83C68.3871 70.27 68.3871 67.74 66.8271 66.17L59.9471 59.29C57.8271 57.17 54.9971 56 51.9971 56C48.9971 56 46.1671 57.17 44.0471 59.29L37.1671 66.17C35.6071 67.73 35.6071 70.26 37.1671 71.83C38.7271 73.39 41.2671 73.39 42.8271 71.83L47.9971 66.66V83C47.9971 85.21 49.7871 87 51.9971 87Z" />
                </svg>
            )


        case 'generate':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill="none">
                    <path d="M83.9094 54.5074C66.2334 60.3472 60.3474 66.2344 54.5074 83.9094C54.027 85.3625 51.9722 85.3625 51.4918 83.9094C45.652 66.2334 39.7648 60.3474 22.0898 54.5074C20.6367 54.027 20.6367 51.9722 22.0898 51.4918C39.7658 45.652 45.6518 39.7648 51.4918 22.0898C51.9723 20.6367 54.027 20.6367 54.5074 22.0898C60.3472 39.7658 66.2344 45.6518 83.9094 51.4918C85.3625 51.9723 85.3625 54.027 83.9094 54.5074Z" fill="url(#paint0_linear_3253_91)" />
                    <defs>
                        <linearGradient id="paint0_linear_3253_91" x1="9.44458" y1="69.7646" x2="97.6428" y2="64.5238" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#AFA7A1" />
                            <stop offset="0.34243" stop-color="#FE4200" />
                            <stop offset="0.806666" stop-color="#FF805B" />
                            <stop offset="1" stop-color="#98B7C0" />
                        </linearGradient>
                    </defs>
                </svg>
            )

        case 'activeupload':
            return (

                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill="none">
                    <path d="M30.9971 23C28.7871 23 26.9971 24.79 26.9971 27C26.9971 29.21 28.7871 31 30.9971 31H72.9971C75.2071 31 76.9971 29.21 76.9971 27C76.9971 24.79 75.2071 23 72.9971 23H30.9971Z" fill="url(#paint0_linear_3095_67)" />
                    <path d="M76.1469 61.0702C76.7369 63.2002 78.9369 64.4402 81.0769 63.8502C83.2069 63.2602 84.4469 61.0502 83.8569 58.9202C81.6969 51.1602 79.5869 46.0102 75.2369 42.6902C70.3969 38.9902 64.4369 38.9902 53.6169 38.9902H50.3869C39.5669 38.9902 33.6069 38.9902 28.7669 42.6902C24.4169 46.0202 22.3069 51.1602 20.1469 58.9202C19.5569 61.0502 20.7969 63.2502 22.9269 63.8502C23.2869 63.9502 23.6469 64.0002 24.0069 64.0002C25.7569 64.0002 27.3669 62.8402 27.8569 61.0702C29.8469 53.9302 31.3569 50.7802 33.6269 49.0502C36.2069 47.0802 40.3769 47.0002 50.3869 47.0002H53.6169C63.6269 47.0002 67.7969 47.0802 70.3769 49.0502C72.6469 50.7802 74.1569 53.9302 76.1469 61.0702Z" fill="url(#paint1_linear_3095_67)" />
                    <path d="M51.9971 87C54.2071 87 55.9971 85.21 55.9971 83V66.66L61.1671 71.83C61.9471 72.61 62.9771 73 63.9971 73C65.0171 73 66.0471 72.61 66.8271 71.83C68.3871 70.27 68.3871 67.74 66.8271 66.17L59.9471 59.29C57.8271 57.17 54.9971 56 51.9971 56C48.9971 56 46.1671 57.17 44.0471 59.29L37.1671 66.17C35.6071 67.73 35.6071 70.26 37.1671 71.83C38.7271 73.39 41.2671 73.39 42.8271 71.83L47.9971 66.66V83C47.9971 85.21 49.7871 87 51.9971 87Z" fill="url(#paint2_linear_3095_67)" />
                    <defs>
                        <linearGradient id="paint0_linear_3095_67" x1="8.44377" y1="71.7652" x2="96.6481" y2="66.5237" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#AFA7A1" />
                            <stop offset="0.34243" stop-color="#FE4200" />
                            <stop offset="0.806666" stop-color="#FF805B" />
                            <stop offset="1" stop-color="#98B7C0" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_3095_67" x1="8.44377" y1="71.7652" x2="96.6481" y2="66.5237" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#AFA7A1" />
                            <stop offset="0.34243" stop-color="#FE4200" />
                            <stop offset="0.806666" stop-color="#FF805B" />
                            <stop offset="1" stop-color="#98B7C0" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_3095_67" x1="8.44377" y1="71.7652" x2="96.6481" y2="66.5237" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#AFA7A1" />
                            <stop offset="0.34243" stop-color="#FE4200" />
                            <stop offset="0.806666" stop-color="#FF805B" />
                            <stop offset="1" stop-color="#98B7C0" />
                        </linearGradient>
                    </defs>
                </svg>
            )

        case 'job':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill={fill}>
                    <path d="M77.46 34.31C75.01 33.06 73.28 33 68.01 33V32C68.01 28.92 68.01 27.22 67.49 25.52C66.32 21.68 63.33 18.69 59.49 17.52C57.87 17.03 55.7 17 52.01 17C48.32 17 46.15 17.02 44.53 17.52C40.69 18.69 37.7 21.68 36.53 25.52C36.01 27.22 36.01 28.92 36.01 32V33H35.81C31.93 33 29.13 33 26.56 34.31C24.29 35.47 22.47 37.28 21.31 39.55C20 42.12 20 44.84 20 49.8V64.2C20 69.15 20 71.88 21.31 74.45C22.47 76.72 24.28 78.54 26.55 79.69C29.12 81 31.84 81 36.8 81H67.2C72.15 81 74.88 81 77.45 79.69C79.72 78.53 81.54 76.72 82.69 74.45C84 71.88 84 69.16 84 64.2V49.8C84 44.85 84 42.12 82.69 39.55C81.53 37.28 79.72 35.46 77.45 34.31H77.46ZM44.01 32C44.01 29.84 44.01 28.41 44.18 27.84C44.57 26.56 45.56 25.56 46.82 25.18C47.53 25 50.11 25 52 25C53.89 25 56.48 25 57.16 25.17C58.44 25.56 59.44 26.55 59.83 27.84C60 28.41 60 29.84 60 32V33H44V32H44.01ZM76.01 64.2C76.01 67.67 76.01 69.96 75.57 70.82C75.19 71.57 74.57 72.19 73.82 72.57C72.96 73.01 70.67 73.01 67.2 73.01H36.8C33.33 73.01 31.04 73.01 30.18 72.57C29.42 72.18 28.82 71.58 28.43 70.82C27.99 69.96 27.99 67.67 27.99 64.2V49.8C27.99 46.33 27.99 44.04 28.43 43.18C28.82 42.42 29.42 41.82 30.18 41.43C31.04 40.99 33.14 40.99 35.8 40.99H67.2C72.42 40.99 73.04 41.03 73.82 41.43C74.57 41.81 75.19 42.43 75.57 43.18C76.01 44.04 76.01 46.33 76.01 49.8V64.2Z" />
                    <path d="M62.0098 57H42.0098C39.7998 57 38.0098 58.79 38.0098 61C38.0098 63.21 39.7998 65 42.0098 65H62.0098C64.2198 65 66.0098 63.21 66.0098 61C66.0098 58.79 64.2198 57 62.0098 57Z" />
                </svg>
            )

        case 'home':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 58 58" fill={fill}>
                    <path d="M10.8897 57.9819H47.1284C53.1259 57.9819 58 53.1078 58 47.1103V23.9447C58 19.6051 55.8619 15.5464 52.2652 13.1003L36.3927 2.28304C34.2093 0.788192 31.6454 0 29 0C26.3546 0 23.7907 0.788192 21.6073 2.28304L5.73477 13.1003C2.14714 15.5464 0 19.5961 0 23.9447V47.1103C0 53.1078 4.8741 57.9819 10.8716 57.9819H10.8897ZM7.26585 23.9447C7.26585 21.9969 8.22618 20.1849 9.82974 19.0887L25.7023 8.27148C26.6807 7.60106 27.8222 7.24773 29.0091 7.24773C30.1959 7.24773 31.3374 7.60106 32.3158 8.27148L48.1884 19.0887C49.7919 20.1849 50.7523 21.9969 50.7523 23.9447V47.1103C50.7523 49.1125 49.1306 50.7341 47.1284 50.7341H10.8897C8.88753 50.7341 7.26585 49.1125 7.26585 47.1103V23.9447Z" fill={fill} />
                </svg>
            )

        case 'campus':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill={fill}>
                    <path d="M84.97 58.2C84.97 54.78 84.97 52.32 84.81 50.32C84.64 48.21 84.3 46.79 83.67 45.55C82.51 43.28 80.7 41.46 78.43 40.31C77.19 39.68 75.77 39.34 73.66 39.16C71.66 39 69.19 39 65.78 39H64.98V29.23C64.98 24.69 61.29 21 56.75 21C56.13 21 55.51 21.07 54.91 21.21L35.89 25.58C33.19 26.2 31.24 26.65 29.66 27.14C28 27.65 26.88 28.17 25.93 28.86C24.18 30.13 22.81 31.86 21.96 33.85C21.5 34.94 21.25 36.14 21.12 37.87C21.01 39.45 21 41.25 21 44.29V72.2C21 74.7 21 76.18 21.11 77.45C21.22 78.85 21.45 79.8 21.87 80.62C22.64 82.14 23.85 83.35 25.37 84.13C26.19 84.55 27.14 84.77 28.54 84.89C29.81 84.99 31.29 85 33.79 85H72.19C74.69 85 76.17 85 77.44 84.89C78.84 84.78 79.79 84.55 80.62 84.13C82.13 83.36 83.34 82.15 84.12 80.63C84.54 79.81 84.76 78.86 84.88 77.46C84.98 76.19 84.99 74.71 84.99 72.21V58.21L84.97 58.2ZM56.97 77H33.77C31.54 77 30.13 77 29.17 76.92C29.13 76.92 29.1 76.92 29.06 76.92C29.06 76.89 29.06 76.85 29.06 76.81C28.98 75.85 28.98 74.44 28.98 72.21V44.3C28.98 41.52 28.98 39.76 29.08 38.46C29.16 37.37 29.28 37.05 29.3 36.99C29.58 36.33 30.04 35.75 30.63 35.33C30.68 35.3 30.97 35.11 32.01 34.79C33.31 34.39 35.24 33.95 37.68 33.39L56.75 29.02C56.88 29.02 56.98 29.12 56.98 29.25V77.02L56.97 77ZM76.97 72.2C76.97 74.43 76.97 75.84 76.89 76.8C76.89 76.84 76.89 76.87 76.89 76.91C76.86 76.91 76.82 76.91 76.78 76.91C75.82 76.99 74.41 76.99 72.18 76.99H64.98V46.99H65.78C69.01 46.99 71.34 46.99 73.01 47.13C74.42 47.25 74.78 47.42 74.8 47.43C75.55 47.81 76.17 48.43 76.55 49.18C76.55 49.19 76.73 49.55 76.85 50.97C76.99 52.64 76.99 54.97 76.99 58.2V72.2H76.97Z" />
                    <path d="M44.9697 43H40.9697C38.7597 43 36.9697 44.79 36.9697 47C36.9697 49.21 38.7597 51 40.9697 51H44.9697C47.1797 51 48.9697 49.21 48.9697 47C48.9697 44.79 47.1797 43 44.9697 43Z" />
                    <path d="M44.9697 59H40.9697C38.7597 59 36.9697 60.79 36.9697 63C36.9697 65.21 38.7597 67 40.9697 67H44.9697C47.1797 67 48.9697 65.21 48.9697 63C48.9697 60.79 47.1797 59 44.9697 59Z" />
                </svg>
            )

        case 'freebies':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill={fill}>
                    <path d="M30.26 81C30.42 81 30.57 81 30.73 81C30.82 81 30.91 81 31.01 81H70.84C76.51 81 81.32 77.14 82.55 71.6L86.81 52.43C87.32 50.12 86.77 47.74 85.29 45.9C83.81 44.06 81.61 43 79.24 43H77V37C77 30.38 71.62 25 65 25H55.56C54.58 25 53.63 24.64 52.9 23.99L47.31 19.02C45.84 17.72 43.96 17 42 17H31C24.38 17 19 22.38 19 29V69.74C19 75.95 24.05 81 30.26 81ZM78.93 51L74.74 69.87C74.33 71.71 72.72 73 70.83 73H41.03C41.11 72.73 41.18 72.46 41.24 72.18L45.95 51H78.93ZM27 29C27 26.79 28.79 25 31 25H42L47.59 29.97C49.79 31.93 52.62 33 55.56 33H65C67.21 33 69 34.79 69 37V43H45.96C42.18 43 38.97 45.58 38.15 49.26L33.44 70.44C33.11 71.94 31.8 72.99 30.26 72.99C28.46 72.99 27 71.53 27 69.73V29Z" />
                </svg>
            )

        case 'store':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 105 105" fill={fill}>
                    <path d="M65.9997 77.6497L61.9997 32.6497C61.9068 31.5888 61.3964 30.6083 60.5806 29.9238C59.7648 29.2392 58.7105 28.9068 57.6497 28.9997C56.5888 29.0925 55.6083 29.6029 54.9238 30.4187C54.2392 31.2345 53.9068 32.2888 53.9997 33.3497L57.9997 78.3497C58.0874 79.3487 58.5473 80.2784 59.2881 80.9544C60.029 81.6305 60.9967 82.0035 61.9997 81.9997C62.1195 82.0096 62.2399 82.0096 62.3597 81.9997C62.8848 81.9544 63.3959 81.8058 63.8634 81.5624C64.3309 81.319 64.7457 80.9856 65.084 80.5814C65.4223 80.1772 65.6773 79.7101 65.8344 79.2069C65.9916 78.7038 66.0477 78.1746 65.9997 77.6497Z" />
                    <path d="M84.9303 77.28L77.9303 39.28C77.8584 38.7433 77.6783 38.2269 77.4008 37.762C77.1234 37.297 76.7545 36.8932 76.3164 36.5751C75.8784 36.2569 75.3803 36.031 74.8523 35.911C74.3244 35.791 73.7775 35.7794 73.245 35.877C72.7124 35.9746 72.2052 36.1792 71.7541 36.4786C71.303 36.778 70.9173 37.1658 70.6205 37.6186C70.3237 38.0714 70.1219 38.5798 70.0273 39.1129C69.9327 39.6459 69.9474 40.1927 70.0703 40.72L77.0703 78.72C77.2387 79.6399 77.724 80.4717 78.442 81.0709C79.1599 81.6701 80.0652 81.9989 81.0003 82C81.2454 82.002 81.4901 81.9785 81.7303 81.93C82.7702 81.7356 83.6907 81.1372 84.2905 80.2657C84.8902 79.3942 85.1203 78.3207 84.9303 77.28Z" />
                    <path d="M31 82H37C39.6522 82 42.1957 80.9464 44.0711 79.0711C45.9464 77.1957 47 74.6522 47 72V32C47 29.3478 45.9464 26.8043 44.0711 24.9289C42.1957 23.0536 39.6522 22 37 22H31C28.3478 22 25.8043 23.0536 23.9289 24.9289C22.0536 26.8043 21 29.3478 21 32V72C21 74.6522 22.0536 77.1957 23.9289 79.0711C25.8043 80.9464 28.3478 82 31 82ZM29 32C29 31.4696 29.2107 30.9609 29.5858 30.5858C29.9609 30.2107 30.4696 30 31 30H37C37.5304 30 38.0391 30.2107 38.4142 30.5858C38.7893 30.9609 39 31.4696 39 32V72C39 72.5304 38.7893 73.0391 38.4142 73.4142C38.0391 73.7893 37.5304 74 37 74H31C30.4696 74 29.9609 73.7893 29.5858 73.4142C29.2107 73.0391 29 72.5304 29 72V32Z" />
                </svg>
            )

        case 'close':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" stroke-width="2.5" stroke={fill} >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            )

        case 'activesearch':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 39 39" fill="none">
                    <path d="M25.8762 23.8695C27.1206 22.2102 27.8545 20.1538 27.8545 17.9273C27.8545 12.4531 23.4015 8 17.9273 8C12.4531 8 8 12.4531 8 17.9273C8 23.4015 12.4531 27.8545 17.9273 27.8545C20.1538 27.8545 22.2102 27.1171 23.8695 25.8762L28.2694 30.2761C28.5459 30.5526 28.9075 30.6909 29.2727 30.6909C29.6379 30.6909 29.9995 30.5526 30.2761 30.2761C30.8292 29.723 30.8292 28.826 30.2761 28.2694L25.8762 23.8695ZM17.9273 25.0182C14.0166 25.0182 10.8364 21.8379 10.8364 17.9273C10.8364 14.0166 14.0166 10.8364 17.9273 10.8364C21.8379 10.8364 25.0182 14.0166 25.0182 17.9273C25.0182 21.8379 21.8379 25.0182 17.9273 25.0182Z" fill="url(#paint0_linear_2942_54)" />
                    <defs>
                        <linearGradient id="paint0_linear_2942_54" x1="3.90303" y1="25.2895" x2="35.1737" y2="23.4313" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#AFA7A1" />
                            <stop offset="0.34243" stop-color="#FE4200" />
                            <stop offset="0.806666" stop-color="#FF805B" />
                            <stop offset="1" stop-color="#98B7C0" />
                        </linearGradient>
                    </defs>
                </svg>
            )

        case 'x':
            return (
                <svg height={size} fill={fill} viewBox="0 0 121 121" xmlns="http://www.w3.org/2000/svg">
                    <path d="M67.3463 54.9939L94.1126 24.5254H87.772L64.5211 50.9754L45.9644 24.5254H24.5562L52.6236 64.5263L24.5562 96.4733H30.8967L55.4344 68.5352L75.0359 96.4733H96.4441M33.1851 29.2077H42.9259L87.7673 92.021H78.024" />
                </svg>
            )


        case 'verified':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 45 43" fill="none">
                    <path d="M42.3824 16.5932C42.0249 16.0311 41.7262 15.4337 41.4911 14.8105C41.286 14.17 41.1578 13.5074 41.109 12.8367C41.0811 11.2136 40.6116 9.62883 39.7508 8.25253C38.6981 7.00451 37.3264 6.06562 35.7821 5.53598C35.1518 5.29274 34.5475 4.98702 33.9781 4.62339C33.4842 4.19824 33.0296 3.72944 32.6198 3.22267C31.6448 1.89891 30.3227 0.870596 28.7997 0.25144C27.2576 -0.112949 25.6464 -0.0616844 24.1306 0.400002C22.7766 0.718195 21.3673 0.718195 20.0133 0.400002C18.471 -0.0770814 16.8285 -0.128412 15.2594 0.25144C13.7208 0.863839 12.3833 1.8927 11.3968 3.22267C10.9736 3.73133 10.5047 4.20019 9.99606 4.62339C9.42669 4.98702 8.82236 5.29274 8.1921 5.53598C6.64002 6.0622 5.26065 7.00135 4.20216 8.25253C3.36375 9.63528 2.91631 11.2197 2.90756 12.8367C2.85885 13.5074 2.73061 14.17 2.52554 14.8105C2.2878 15.4191 1.98916 16.0022 1.63417 16.5507C0.677289 17.9148 0.112134 19.5149 0 21.1774C0.119722 22.8252 0.684532 24.4096 1.63417 25.7615C1.99733 26.3054 2.29644 26.8893 2.52554 27.5018C2.7102 28.1591 2.81704 28.8358 2.84389 29.518C2.86966 31.1414 3.3394 32.7268 4.20216 34.1022C5.25482 35.3502 6.62649 36.2891 8.17087 36.8188C8.80114 37.062 9.40547 37.3677 9.97483 37.7313C10.4835 38.1545 10.9524 38.6234 11.3756 39.1321C12.344 40.4622 13.6681 41.492 15.1957 42.1033C15.7943 42.2855 16.4164 42.3784 17.0421 42.3792C18.0006 42.3487 18.9534 42.2207 19.886 41.9972C21.2376 41.6593 22.6516 41.6593 24.0033 41.9972C25.5493 42.456 27.1889 42.4999 28.7572 42.1245C30.2848 41.5132 31.6089 40.4834 32.5774 39.1533C33.0006 38.6446 33.4694 38.1758 33.9781 37.7526C34.5475 37.3889 35.1518 37.0832 35.7821 36.84C37.3264 36.3103 38.6981 35.3714 39.7508 34.1234C40.6135 32.748 41.0833 31.1626 41.109 29.5392C41.1359 28.857 41.2427 28.1803 41.4274 27.5231C41.6651 26.9144 41.9638 26.3314 42.3188 25.7828C43.2947 24.4315 43.8819 22.8387 44.0166 21.1774C43.8969 19.5296 43.3321 17.9451 42.3824 16.5932ZM32.0044 18.4396L21.3928 29.0511C21.1955 29.25 20.9608 29.4079 20.7022 29.5157C20.4436 29.6234 20.1662 29.6789 19.886 29.6789C19.6058 29.6789 19.3284 29.6234 19.0698 29.5157C18.8112 29.4079 18.5765 29.25 18.3792 29.0511L12.0122 22.6842C11.8144 22.4863 11.6574 22.2514 11.5503 21.9929C11.4432 21.7343 11.3881 21.4572 11.3881 21.1774C11.3881 20.6122 11.6126 20.0702 12.0122 19.6705C12.4119 19.2709 12.9539 19.0464 13.5191 19.0464C14.0843 19.0464 14.6263 19.2709 15.0259 19.6705L19.886 24.5518L28.9907 15.4259C29.3903 15.0263 29.9323 14.8018 30.4975 14.8018C31.0627 14.8018 31.6047 15.0263 32.0044 15.4259C32.404 15.8256 32.6285 16.3676 32.6285 16.9328C32.6285 17.4979 32.404 18.04 32.0044 18.4396Z" fill="#0075FF" />
                    <path d="M32.0044 18.4396L21.3928 29.0511C21.1955 29.25 20.9608 29.4079 20.7022 29.5157C20.4436 29.6234 20.1662 29.6789 19.886 29.6789C19.6058 29.6789 19.3284 29.6234 19.0698 29.5157C18.8112 29.4079 18.5765 29.25 18.3792 29.0511L12.0122 22.6842C11.8144 22.4863 11.6574 22.2514 11.5503 21.9929C11.4432 21.7343 11.3881 21.4572 11.3881 21.1774C11.3881 20.6122 11.6126 20.0702 12.0122 19.6705C12.4119 19.2709 12.9539 19.0464 13.5191 19.0464C14.0843 19.0464 14.6263 19.2709 15.0259 19.6705L19.886 24.5518L28.9907 15.4259C29.3903 15.0263 29.9323 14.8018 30.4975 14.8018C31.0627 14.8018 31.6047 15.0263 32.0044 15.4259C32.404 15.8256 32.6285 16.3676 32.6285 16.9328C32.6285 17.4979 32.404 18.04 32.0044 18.4396Z" fill="white" />
                </svg>
            )


        case 'dribbble':
            return (
                <svg height={size} fill={fill} viewBox="0 0 122 121" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M61.0002 97.5005C81.4348 97.5005 98.0005 80.9348 98.0005 60.5002C98.0005 40.0656 81.4348 23.5 61.0002 23.5C40.5656 23.5 24 40.0656 24 60.5002C24 80.9348 40.5656 97.5005 61.0002 97.5005ZM37.9385 80.0771C33.4552 74.8008 30.7503 67.9666 30.7503 60.5002V60.4928C42.8804 60.3718 52.8456 58.7639 61.8149 55.7168C62.5704 57.3401 63.3033 58.998 64.0127 60.69C62.8688 61.069 61.7436 61.4922 60.6363 61.9584C51.7225 65.7102 44.2 72.1425 37.9385 80.0771ZM42.8571 84.7075C47.9117 88.502 54.1934 90.7503 61.0002 90.7503C65.0999 90.7503 69.0088 89.9346 72.5743 88.457C70.9795 80.806 68.9116 73.6421 66.4712 66.9642C65.374 67.3164 64.299 67.7156 63.2462 68.1586C55.4704 71.4318 48.684 77.2005 42.8571 84.7075ZM73.0838 65.4667C75.2887 71.6067 77.1892 78.1255 78.7166 85.022C84.7073 80.6866 89.0464 74.2095 90.6112 66.7139C84.2576 65.0711 78.4311 64.7398 73.0838 65.4667ZM70.6119 59.0411C76.9911 57.9479 83.8718 58.1682 91.2452 59.9392C91.1312 53.686 89.1201 47.8963 85.7632 43.1216C79.9571 47.2242 74.2113 50.6167 68.1013 53.2818C68.9677 55.1591 69.8053 57.0791 70.6119 59.0411ZM58.7994 49.6304C50.9003 52.2064 42.1317 53.5867 31.505 53.7554C33.6108 44.5082 39.9536 36.8727 48.3834 32.999C52.0846 38.0062 55.5959 43.5496 58.7994 49.6304ZM65.1382 47.2347C70.7131 44.8307 75.9571 41.7677 81.2771 38.052C75.9123 33.2031 68.8012 30.2503 61.0002 30.2503C58.9868 30.2503 57.0194 30.447 55.1159 30.8223C58.6803 35.8223 62.0527 41.2935 65.1382 47.2347Z" />
                </svg>
            )

        case 'linkedin':
            return (
                <svg height={size} viewBox="0 0 122 121" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.0005 30.3235C26.0005 27.5373 28.3164 25.2773 31.1733 25.2773H90.8274C93.6842 25.2773 96.0002 27.5373 96.0002 30.3235V90.675C96.0002 93.4621 93.6842 95.7212 90.8274 95.7212H31.1733C28.3164 95.7212 26.0005 93.4621 26.0005 90.675V30.3235Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M47.2196 84.2461V52.4368H36.6467V84.2461H47.2196ZM41.9331 48.0938C45.6201 48.0938 47.9149 45.6512 47.9149 42.5986C47.8462 39.4774 45.6201 37.1026 42.0031 37.1026C38.3864 37.1026 36.0217 39.4774 36.0217 42.5986C36.0217 45.6512 38.3161 48.0938 41.8642 48.0938H41.9331Z" fill="#222" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.0699 84.2461H63.6426V66.4825C63.6426 65.5318 63.7113 64.582 63.9905 63.9024C64.7548 62.003 66.4945 60.0357 69.4152 60.0357C73.241 60.0357 74.7714 62.9527 74.7714 67.2289V84.2461H85.3433V66.0071C85.3433 56.2367 80.1273 51.6904 73.1712 51.6904C67.4674 51.6904 64.9635 54.8785 63.5723 57.05H63.6429V52.4368H53.0701C53.2089 55.4216 53.0699 84.2461 53.0699 84.2461Z" fill="#222" />
                </svg>
            )
        case 'behance':
            return (
                <svg height={size} fill={fill} viewBox="0 0 122 121" xmlns="http://www.w3.org/2000/svg">
                    <path d="M95.9992 41.2499H71.4995V34.25H95.9992V41.2499ZM102.04 76.2496C100.493 80.789 94.9387 86.7495 84.1868 86.7495C73.4279 86.7495 64.713 80.698 64.713 66.8872C64.713 53.2023 72.8504 46.1674 83.8438 46.1674C94.6307 46.1674 101.218 52.4043 102.656 61.6582C102.929 63.4292 103.038 65.8162 102.989 69.1481H74.8944C75.3494 80.3865 87.0848 80.74 90.9523 76.2496H102.04ZM75.1394 62.2497H92.5167C92.1492 56.8353 88.5408 54.4833 83.8473 54.4833C78.7164 54.4833 75.8779 57.1713 75.1394 62.2497ZM41.6308 86.7075H19V34.3235H43.3352C62.501 34.607 62.865 53.3773 52.8552 58.4943C64.9685 62.9042 65.3745 86.7075 41.6308 86.7075ZM29.4999 55.2498H42.0438C50.8217 55.2498 52.2147 44.7499 40.9518 44.7499H29.4999V55.2498ZM41.3683 65.7497H29.4999V76.3056H41.1933C51.8857 76.3056 51.2312 65.7497 41.3683 65.7497Z" />
                </svg>
            )
        default:
            return null
    }
}