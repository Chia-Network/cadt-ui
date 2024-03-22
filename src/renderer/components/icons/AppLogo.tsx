import logo from '@/assets/img/CAD-Logo-RGB-Full-Colour.png';

interface AppLogoProps {
  width: string,
  height: string,
  type?: string,
  className?: string
}

const AppLogo: React.FC<AppLogoProps> = ({ width, height, type = 'svg', className }) => {
  if (type === 'png') return <img width={width} height={height} src={logo}/>;
  else
    return (
      <svg className={className} width={width} height={height} viewBox="0 0 201.484 54">
        <defs>
          <clipPath id="clip-path">
            <path
              id="Path_12460"
              data-name="Path 12460"
              d="M0-126H201.484v-54H0Z"
              transform="translate(0 180)"
              fill="none"
            />
          </clipPath>
        </defs>
        <g
          id="Group_11144"
          data-name="Group 11144"
          transform="translate(0 180)"
        >
          <g
            id="Group_11119"
            data-name="Group 11119"
            transform="translate(0 -180)"
            clipPath="url(#clip-path)"
          >
            <g id="Group_11116" data-name="Group 11116">
              <path
                id="Path_12457"
                data-name="Path 12457"
                d="M-63-101.228a16.4,16.4,0,0,1-16.384-16.384A16.4,16.4,0,0,1-63-134a16.41,16.41,0,0,1,15.791,12.03h10.852A27.039,27.039,0,0,0-63-144.612a27.031,27.031,0,0,0-27,27,27.031,27.031,0,0,0,27,27,27.04,27.04,0,0,0,26.644-22.646H-47.209A16.41,16.41,0,0,1-63-101.228"
                transform="translate(90 144.612)"
                fill="#2ceb7b"
              />
            </g>
            <g
              id="Group_11117"
              data-name="Group 11117"
              transform="translate(19.11 19.11)"
            >
              <path
                id="Path_12458"
                data-name="Path 12458"
                d="M-18.409,0A7.89,7.89,0,0,0-26.3,7.89a7.89,7.89,0,0,0,7.89,7.89,7.879,7.879,0,0,0,6.577-3.536A7.849,7.849,0,0,0-10.52,7.89a7.848,7.848,0,0,0-1.312-4.354A7.88,7.88,0,0,0-18.409,0"
                transform="translate(26.299)"
                fill="#2ceb7b"
              />
            </g>
            <g
              id="Group_11118"
              data-name="Group 11118"
              transform="translate(62.933 9.919)"
            >
              <path
                id="Path_12459"
                data-name="Path 12459"
                d="M0-14.951C0-19,2-21.359,5.472-21.359a4.72,4.72,0,0,1,4.842,4.392H8.19c-.378-1.692-1.3-2.574-2.772-2.574-2.124,0-3.312,1.656-3.312,4.59,0,2.952,1.152,4.59,3.276,4.59,1.494,0,2.394-.846,2.79-2.574h2.142A4.732,4.732,0,0,1,5.382-8.544C1.962-8.544,0-10.9,0-14.951"
                transform="translate(0 21.359)"
                fill="#fff"
              />
            </g>
          </g>
          <g
            id="Group_11120"
            data-name="Group 11120"
            transform="translate(74.458 -169.973)"
          >
            <path
              id="Path_12461"
              data-name="Path 12461"
              d="M-16.925-25.409v1.71h-7.254v-1.71h2.664v-9.18h-2.664V-36.3h4.608v10.89Z"
              transform="translate(24.179 36.299)"
              fill="#fff"
            />
          </g>
          <g
            id="Group_11126"
            data-name="Group 11126"
            transform="translate(0 -180)"
            clipPath="url(#clip-path)"
          >
            <g
              id="Group_11121"
              data-name="Group 11121"
              transform="translate(83.674 9.415)"
            >
              <path
                id="Path_12462"
                data-name="Path 12462"
                d="M-16.925-26.837v1.71h-7.254v-1.71h2.664v-5.8h-2.664v-1.71h4.626v7.506ZM-21.839-37.06a1.264,1.264,0,0,1,1.3-1.278,1.269,1.269,0,0,1,1.314,1.278,1.273,1.273,0,0,1-1.314,1.3,1.268,1.268,0,0,1-1.3-1.3"
                transform="translate(24.179 38.338)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11122"
              data-name="Group 11122"
              transform="translate(92.89 13.303)"
            >
              <path
                id="Path_12463"
                data-name="Path 12463"
                d="M-28.013-7.937v5.922H-29.9V-7.757c0-1.1-.486-1.836-1.512-1.836A1.685,1.685,0,0,0-33.071-7.7v5.688h-1.89V-7.757c0-1.008-.4-1.836-1.548-1.836-1.044,0-1.62.81-1.62,1.944v5.634h-1.89v-9.215h1.6l.126.936a2.752,2.752,0,0,1,2.286-1.044,2.605,2.605,0,0,1,2.376,1.368,2.982,2.982,0,0,1,2.592-1.368c1.872,0,3.024,1.26,3.024,3.4"
                transform="translate(40.019 11.339)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11123"
              data-name="Group 11123"
              transform="translate(107.02 13.303)"
            >
              <path
                id="Path_12464"
                data-name="Path 12464"
                d="M-21.167-17.807v1.692h-1.008c-1.206,0-1.656-.522-1.674-1.4a3.413,3.413,0,0,1-3.006,1.512c-2,0-3.384-.99-3.384-2.7,0-1.908,1.35-2.952,3.906-2.952h2.286v-.558c0-1.026-.738-1.656-2-1.656-1.134,0-1.89.54-2.034,1.35H-30c.216-1.782,1.728-2.916,4.05-2.916,2.43,0,3.834,1.17,3.834,3.348v3.69c0,.468.162.594.576.594Zm-2.88-2.412h-2.376c-1.188,0-1.854.45-1.854,1.386,0,.774.648,1.314,1.692,1.314a2.287,2.287,0,0,0,2.538-2.34Z"
                transform="translate(30.238 25.439)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11124"
              data-name="Group 11124"
              transform="translate(116.866 10.837)"
            >
              <path
                id="Path_12465"
                data-name="Path 12465"
                d="M-11.255-27.509c-1.764,0-2.52-.828-2.52-2.5v-5h-2.3v-1.71h2.3V-39.3h1.962v2.574h3.132v1.71h-3.132v4.806c0,.72.252.99.99.99h2.232v1.71Z"
                transform="translate(16.079 39.298)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11125"
              data-name="Group 11125"
              transform="translate(125.74 13.303)"
            >
              <path
                id="Path_12466"
                data-name="Path 12466"
                d="M-4.746-12.053v.09A2.452,2.452,0,0,0-2.208-9.372a2.18,2.18,0,0,0,2.286-1.62H2.022A3.94,3.94,0,0,1-2.1-7.788a4.389,4.389,0,0,1-4.68-4.7c0-2.844,1.8-4.734,4.482-4.734a4.2,4.2,0,0,1,4.482,4.392,6.466,6.466,0,0,1-.054.774Zm.072-1.458H.168A2.286,2.286,0,0,0-2.28-15.653a2.354,2.354,0,0,0-2.394,2.142"
                transform="translate(6.78 17.219)"
                fill="#fff"
              />
            </g>
          </g>
          <g
            id="Group_11127"
            data-name="Group 11127"
            transform="translate(141.922 -169.973)"
          >
            <path
              id="Path_12468"
              data-name="Path 12468"
              d="M0-29.4,4.3-42H6.84l4.3,12.6h-2.2L7.9-32.512H3.168L2.106-29.4Zm3.672-4.878h3.69L5.508-39.8Z"
              transform="translate(0 41.998)"
              fill="#fff"
            />
          </g>
          <g
            id="Group_11137"
            data-name="Group 11137"
            transform="translate(0 -180)"
            clipPath="url(#clip-path)"
          >
            <g
              id="Group_11128"
              data-name="Group 11128"
              transform="translate(153.874 13.303)"
            >
              <path
                id="Path_12469"
                data-name="Path 12469"
                d="M0-11.045a4.395,4.395,0,0,1,4.59-4.734,3.912,3.912,0,0,1,4.194,3.4H6.75a2.117,2.117,0,0,0-2.2-1.746c-1.548,0-2.574,1.278-2.574,3.078S3.006-8,4.554-8A2.115,2.115,0,0,0,6.732-9.749H8.784a3.966,3.966,0,0,1-4.248,3.4C1.764-6.348,0-8.165,0-11.045"
                transform="translate(0 15.779)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11129"
              data-name="Group 11129"
              transform="translate(163.81 10.837)"
            >
              <path
                id="Path_12470"
                data-name="Path 12470"
                d="M-11.255-27.509c-1.764,0-2.52-.828-2.52-2.5v-5h-2.3v-1.71h2.3V-39.3h1.962v2.574h3.132v1.71h-3.132v4.806c0,.72.252.99.99.99h2.232v1.71Z"
                transform="translate(16.079 39.298)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11130"
              data-name="Group 11130"
              transform="translate(173.26 9.415)"
            >
              <path
                id="Path_12471"
                data-name="Path 12471"
                d="M-16.926-26.837v1.71H-24.18v-1.71h2.664v-5.8H-24.18v-1.71h4.626v7.506ZM-21.84-37.06a1.264,1.264,0,0,1,1.3-1.278A1.269,1.269,0,0,1-19.23-37.06a1.273,1.273,0,0,1-1.314,1.3,1.268,1.268,0,0,1-1.3-1.3"
                transform="translate(24.18 38.338)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11131"
              data-name="Group 11131"
              transform="translate(181.648 13.303)"
            >
              <path
                id="Path_12472"
                data-name="Path 12472"
                d="M0-11a4.441,4.441,0,0,1,4.644-4.716A4.45,4.45,0,0,1,9.288-11,4.441,4.441,0,0,1,4.644-6.288,4.431,4.431,0,0,1,0-11m7.29,0c0-1.782-1.062-3.06-2.646-3.06-1.6,0-2.663,1.278-2.663,3.06s1.062,3.06,2.663,3.06C6.228-7.943,7.29-9.221,7.29-11"
                transform="translate(0 15.719)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11132"
              data-name="Group 11132"
              transform="translate(193.15 13.302)"
            >
              <path
                id="Path_12473"
                data-name="Path 12473"
                d="M-19.445-9.492v5.256h-1.962V-9.312c0-1.638-.7-2.538-2.088-2.538-1.458,0-2.34,1.062-2.34,2.844v4.77h-1.944v-9.216h1.692l.216,1.206a3.361,3.361,0,0,1,2.826-1.314c1.962,0,3.6,1.062,3.6,4.068"
                transform="translate(27.778 13.56)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11133"
              data-name="Group 11133"
              transform="translate(63.833 31.375)"
            >
              <path
                id="Path_12474"
                data-name="Path 12474"
                d="M0-29.4V-42H4.086c3.708,0,5.832,2.5,5.832,6.282,0,3.8-2.124,6.318-5.832,6.318Zm2.07-1.8H4.086c2.538,0,3.726-1.746,3.726-4.518,0-2.754-1.188-4.482-3.726-4.482H2.07Z"
                transform="translate(0 41.999)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11134"
              data-name="Group 11134"
              transform="translate(75.496 34.651)"
            >
              <path
                id="Path_12475"
                data-name="Path 12475"
                d="M-21.167-17.807v1.692h-1.008c-1.206,0-1.656-.522-1.674-1.4a3.414,3.414,0,0,1-3.006,1.512c-2,0-3.384-.99-3.384-2.7,0-1.908,1.35-2.952,3.906-2.952h2.286v-.558c0-1.026-.738-1.656-2-1.656-1.134,0-1.89.54-2.034,1.35h-1.926c.216-1.782,1.728-2.916,4.05-2.916,2.43,0,3.834,1.17,3.834,3.348v3.69c0,.468.162.594.576.594Zm-2.88-2.412h-2.376c-1.188,0-1.854.45-1.854,1.386,0,.774.648,1.314,1.692,1.314a2.287,2.287,0,0,0,2.538-2.34Z"
                transform="translate(30.239 25.439)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11135"
              data-name="Group 11135"
              transform="translate(85.342 32.186)"
            >
              <path
                id="Path_12476"
                data-name="Path 12476"
                d="M-11.256-27.509c-1.764,0-2.52-.828-2.52-2.5v-5h-2.3v-1.71h2.3V-39.3h1.962v2.574h3.132v1.71h-3.132v4.806c0,.72.252.99.99.99h2.232v1.71Z"
                transform="translate(16.08 39.298)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11136"
              data-name="Group 11136"
              transform="translate(94.378 34.651)"
            >
              <path
                id="Path_12477"
                data-name="Path 12477"
                d="M-21.167-17.807v1.692h-1.008c-1.206,0-1.656-.522-1.674-1.4a3.415,3.415,0,0,1-3.006,1.512c-2,0-3.384-.99-3.384-2.7,0-1.908,1.35-2.952,3.906-2.952h2.286v-.558c0-1.026-.738-1.656-2-1.656-1.134,0-1.89.54-2.034,1.35h-1.926c.216-1.782,1.728-2.916,4.05-2.916,2.43,0,3.834,1.17,3.834,3.348v3.69c0,.468.162.594.576.594Zm-2.88-2.412h-2.376c-1.188,0-1.854.45-1.854,1.386,0,.774.648,1.314,1.692,1.314a2.287,2.287,0,0,0,2.538-2.34Z"
                transform="translate(30.239 25.439)"
                fill="#fff"
              />
            </g>
          </g>
          <g
            id="Group_11138"
            data-name="Group 11138"
            transform="translate(110.561 -148.625)"
          >
            <path
              id="Path_12479"
              data-name="Path 12479"
              d="M-9.029-29.4V-40.163H-12.9V-42h9.81v1.836H-6.96V-29.4Z"
              transform="translate(12.899 41.999)"
              fill="#fff"
            />
          </g>
          <g
            id="Group_11143"
            data-name="Group 11143"
            transform="translate(0 -180)"
            clipPath="url(#clip-path)"
          >
            <g
              id="Group_11139"
              data-name="Group 11139"
              transform="translate(121.402 34.76)"
            >
              <path
                id="Path_12480"
                data-name="Path 12480"
                d="M-14.993-4.241c-1.89,0-2.52,1.368-2.52,2.808v2.88h2.628v1.71h-6.534V1.447h1.962v-5.8h-1.962v-1.71h3.8l.072,1.566a2.978,2.978,0,0,1,2.862-1.566h1.026v1.818Z"
                transform="translate(21.419 6.059)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11140"
              data-name="Group 11140"
              transform="translate(131.086 34.759)"
            >
              <path
                id="Path_12481"
                data-name="Path 12481"
                d="M-14.742,0H-12.8V9.216h-1.71l-.216-1.152A3.4,3.4,0,0,1-17.5,9.324c-1.89,0-3.564-1.008-3.564-4.068V0H-19.1V5.058c0,1.638.684,2.538,2.052,2.538,1.422,0,2.3-1.044,2.3-2.862Z"
                transform="translate(21.06)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11141"
              data-name="Group 11141"
              transform="translate(141.454 34.651)"
            >
              <path
                id="Path_12482"
                data-name="Path 12482"
                d="M0-14.657H1.908c.072.954.9,1.638,2.286,1.638,1.17,0,1.944-.468,1.944-1.206,0-.99-.828-1.062-2.214-1.242C1.836-15.719.2-16.169.2-18.077c0-1.746,1.548-2.862,3.726-2.862,2.25,0,3.834,1.044,3.96,2.934H5.976a1.821,1.821,0,0,0-2.016-1.44c-1.116,0-1.872.468-1.872,1.206,0,.864.882.972,2.2,1.116,2.052.252,3.762.684,3.762,2.736,0,1.764-1.656,2.88-3.87,2.88-2.43,0-4.1-1.152-4.176-3.15"
                transform="translate(0 20.939)"
                fill="#fff"
              />
            </g>
            <g
              id="Group_11142"
              data-name="Group 11142"
              transform="translate(150.67 32.186)"
            >
              <path
                id="Path_12483"
                data-name="Path 12483"
                d="M-11.255-27.509c-1.764,0-2.52-.828-2.52-2.5v-5h-2.3v-1.71h2.3V-39.3h1.962v2.574h3.132v1.71h-3.132v4.806c0,.72.252.99.99.99h2.232v1.71Z"
                transform="translate(16.079 39.298)"
                fill="#fff"
              />
            </g>
          </g>
        </g>
      </svg>
    );
};

export { AppLogo };
