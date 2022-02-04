import { Sun, Rays, Earth, Moon } from "./Orbit.styles";

function Orbit({ children, dark, className }) {
  return (
    <div className={`${className}`}>
      <div className="relative h-full flex flex-col items-center justify-center">
        <Sun className="absolute" dark={dark} />
        <Rays className="absolute animate-spin-rays" dark={dark} />
        <div className="absolute h-full w-full flex flex-col items-center justify-center animate-spin-earth">
          <Earth className="absolute" dark={dark} />
          <Moon className="absolute animate-spin-moon" dark={dark} />
        </div>
      </div>
    </div>
  );
}

export default Orbit;
