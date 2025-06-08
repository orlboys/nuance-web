import "@/components/customcss/shinytext.css";
interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
}

const ShinyText = ({
  text,
  disabled = false,
  speed = 1,
  className = "",
  color,
}: ShinyTextProps) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{
        animationDuration,
        color: color || "inherit",
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
