type SpinnerProps = {
    size?: "sm" | "md" | "lg",
    color?: string,
    className?: string
}
export default function Spinner({
    size = "md",
    color = "white",
    className = ""
}: SpinnerProps) {
    const sizes = {
        sm: "w-4 h-4 border-2",
        md: "w-6 h-6 border-2",
        lg: "w-10 h-10 border-4"
    };

    return (
        <span
            className={`
        inline-block rounded-full animate-spin
        border-current border-t-transparent
        ${sizes[size]}
        text-${color}
        ${className}
      `}
        />
    );
}