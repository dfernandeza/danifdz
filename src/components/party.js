import React from "react";

export default function PartySVG() {
  return (
    <svg
      id="nineties"
      width="330"
      height="230"
      viewBox="0 0 340 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          #nineties path,
          #nineties g {
            transform-origin: center;
            transform-box: fill-box;
          }

          #nineties g {
            transition: transform .3s ease-in-out;
          }

          #nineties:hover g:nth-child(odd) {
            transform: rotate(10deg);
          }

          #nineties:hover g:nth-child(even) {
            transform: rotate(-20deg);
          }

          #triangle-1 {
            animation: intro-t1 .5s ease-out var(--header-animation-delay) both;
          }

          #triangle-2 {
            animation: intro-t2 .7s ease-out var(--header-animation-delay) both;
          }

          #triangle-3 {
            animation: intro-t3 .4s ease-out var(--header-animation-delay) both;
          }

          #triangle-4 {
            animation: intro-t4 .3s ease-out var(--header-animation-delay) both;
          }

          #zigzag-1 {
            animation: intro-z1 .3s ease-out var(--header-animation-delay) both;
          }

          #zigzag-2 {
            animation: intro-z2 .4s ease-out var(--header-animation-delay) both;
          }

          #zigzag-3 {
            animation: intro-z3 .7s ease-out var(--header-animation-delay) both;
          }

          #zigzag-4 {
            animation: intro-z4 .5s ease-out var(--header-animation-delay) both;
          }

          @keyframes intro-t1 {
            from {
              transform: translateY(-50px) rotate(25deg);
            }

            to {
              transform: translateY(10px) rotate(-30deg);
            }
          }

          @keyframes intro-t2 {
            from {
              transform: translateY(-40px) rotate(-65deg);
            }

            to {
              transform: translateY(10px) rotate(25deg);
            }
          }

          @keyframes intro-t3 {
            from {
              transform: translateY(-20px) rotate(45deg);
            }

            to {
              transform: translateY(5px) rotate(0deg);
            }
          }

          @keyframes intro-t4 {
            from {
              transform: translateY(-15px) rotate(-60deg);
            }

            to {
              transform: translateY(5px) rotate(10deg);
            }
          }

          @keyframes intro-z1 {
            from {
              transform: translateY(0px) rotate(0deg);
            }

            to {
              transform: translateY(5px) rotate(10deg);
            }
          }

          @keyframes intro-z2 {
            from {
              transform: translateY(-10px) rotate(-25deg);
            }

            to {
              transform: translateY(5px) rotate(10deg);
            }
          }

          @keyframes intro-z3 {
            from {
              transform: translateY(-10px);
            }

            to {
              transform: translateY(25px);
            }
          }

          @keyframes intro-z4 {
            from {
              transform: translateY(-10px) rotate(0deg);
            }

            to {
              transform: translateY(10px) rotate(-25deg);
            }
          }`}
      </style>

      <g>
        <path id="triangle-1" d="m78 178 15 30H63l15-30Z" fill="#E46795" />
      </g>
      <g>
        <path
          id="triangle-2"
          d="m303.088 200.329-33.505-1.57 14.658-26.176 18.847 27.746Z"
          fill="#66D3D6"
        />
      </g>
      <g>
        <path
          id="triangle-3"
          d="m248.219 39.078 33.485-1.938-11.845 27.564-21.64-25.626Z"
          fill="#FBC641"
        />
      </g>
      <g>
        <path
          id="triangle-4"
          d="M118.938 104.24 106.728 73l29.876 2.728-17.666 28.512Z"
          fill="#BC96CA"
        />
      </g>

      <g>
        <path
          id="zigzag-1"
          d="m135.076 3.323-1.267 24.968 24.324-5.775-1.266 24.968 24.324-5.775-1.267 24.968"
          stroke="#E46795"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g>
        <path
          id="zigzag-2"
          d="m253.496 118.232 23.592 8.273 1.335-24.965 23.592 8.273 1.336-24.965 23.592 8.273"
          stroke="#BC96CA"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g>
        <path
          id="zigzag-3"
          d="m54.991 74.117-24.639 4.234 10.963 22.468-24.639 4.233L27.64 127.52 3 131.753"
          stroke="#FBC641"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g>
        <path
          id="zigzag-4"
          d="m211.965 168.273-14.384-20.447-15.602 19.534-14.384-20.447-15.602 19.534L137.609 146"
          stroke="#66D3D6"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
