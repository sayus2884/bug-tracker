import styled from "styled-components";

interface Theme {
  dark: boolean;
}

export const Sun = styled.div`
  background: url(${({ dark }: Theme) => (dark ? "/images/logo_dark.svg" : "/images/logo.svg")})
    no-repeat center;
  background-size: contain;
  width: 100%;
  height: 0;
  padding-top: 30%;
`;

export const Rays = styled.div`
  background: url(${({ dark }: Theme) => (dark ? "/images/rays_dark.svg" : "/images/rays.svg")})
    no-repeat center;
  background-size: contain;
  width: 100%;
  height: 0;
  padding-top: 50%;
`;

export const Earth = styled.div`
  background: url(${({ dark }: Theme) => (dark ? "/images/earth_dark.svg" : "/images/earth.svg")})
    no-repeat center;
  background-size: contain;
  width: 100%;
  height: 0;
  padding-top: 100%;
`;

export const Moon = styled.div`
  background: url(${({ dark }: Theme) => (dark ? "/images/moon_dark.svg" : "/images/moon.svg")})
    no-repeat center;
  background-size: contain;
  width: 20%;
  height: 0;
  padding-top: 20%;
  bottom: 3%;
  right: 6%;
`;
