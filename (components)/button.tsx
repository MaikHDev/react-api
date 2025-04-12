interface ButtonProps{
    size: 's' | 'm' | 'l',
    color: string | 'primary' | 'secondary',
    text?: string,
}

export default function Button({size = 'm', color, text}: ButtonProps) {

    return (
        <button className={``}></button>
    );
}