import { cn } from "@/lib/utils";

type FanProps = {
    cx: number,
    cy: number,
    r: number,
}

const BLADE_COUNT = 7;

// Точка на окружности радиуса radius под углом deg, отсчёт от направления
// вверх по часовой стрелке. Округление держит разметку SVG короткой.
function polar(radius: number, deg: number) {
    const a = (deg - 90) * Math.PI / 180;
    return `${(radius * Math.cos(a)).toFixed(2)} ${(radius * Math.sin(a)).toFixed(2)}`;
}

// Вентилятор: обод, семь лопастей-серпов и ступица акцентным цветом.
// Вертушка (ступица и лопасти) считается от радиуса на 2 меньше обода,
// чтобы между лопастями и ободом был зазор. Лопасть начинается
// на ступице, обе её кромки изогнуты в сторону вращения и сходятся
// в кончике у обода. Ступица залита фоном и закрывает корни лопастей.
function Fan({ cx, cy, r }: FanProps) {
    const rb = r - 2;
    const hub = rb * 0.3;
    const blade = `M${polar(hub, 0)} C${polar(rb * 0.55, 8)} ${polar(rb * 0.85, 30)} ${polar(rb * 0.92, 50)} C${polar(rb * 0.7, 44)} ${polar(rb * 0.45, 36)} ${polar(hub, 30)}Z`;

    return (
        <g transform={`translate(${cx} ${cy})`}>
            <circle r={r} className="stroke-foreground"/>
            {/* Вертушка медленно вращается по часовой стрелке, в сторону изгиба
                лопастей. Центр вращения — начало координат группы, то есть центр обода */}
            <g className="animate-spin" style={{ animationDuration: "6s" }}>
                {Array.from({ length: BLADE_COUNT }, (_, i) => (
                    <path key={i} d={blade} transform={`rotate(${(360 / BLADE_COUNT) * i})`} className="stroke-primary"/>
                ))}
                <circle r={hub} className="fill-background stroke-primary"/>
            </g>
        </g>
    );
}

type Props = {
    className?: string,
}

// Корпус ПК в разрезе и комплектующие рядом с ним. Пунктирные стрелки
// ведут от каждой детали к её месту в корпусе, свободные места обведены
// пунктиром. Цвета линий берутся из CSS-переменных темы через классы
// stroke-*, поэтому рисунок сам меняется вместе с темой.
export function HomeIllustration({ className }: Props) {
    return (
        <svg
            viewBox="0 0 480 360"
            fill="none"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={cn("h-auto w-full", className)}
        >
            <defs>
                <marker id="home-illustration-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M1 1L7 4L1 7" className="stroke-primary"/>
                </marker>
            </defs>

            {/* Корпус */}
            <rect x="150" y="30" width="180" height="290" rx="12" className="stroke-foreground"/>
            <rect x="162" y="42" width="156" height="266" rx="6" className="stroke-muted-foreground"/>
            <path d="M172 320v8M308 320v8" className="stroke-foreground"/>

            {/* Материнская плата, кулер процессора, память и свободный слот памяти */}
            <rect x="176" y="56" width="100" height="140" rx="3" className="stroke-foreground"/>
            <rect x="190" y="68" width="48" height="48" rx="4" className="stroke-foreground"/>
            <Fan cx={214} cy={92} r={19}/>
            <path d="M248 66v52M256 66v52M264 66v52" className="stroke-primary"/>
            <path d="M272 66v52" strokeDasharray="3 4" className="stroke-muted-foreground"/>

            {/* Видеокарта с рёбрами радиатора. Заливка фоном закрывает линии платы под ней */}
            <rect x="170" y="146" width="132" height="28" rx="4" className="fill-background stroke-foreground"/>
            <path d="M186 153v14M196 153v14M206 153v14M216 153v14M226 153v14M236 153v14M246 153v14M256 153v14M266 153v14M276 153v14M286 153v14" className="stroke-primary"/>

            {/* Свободный слот для SSD */}
            <rect x="196" y="180" width="56" height="10" rx="2" strokeDasharray="3 4" className="stroke-muted-foreground"/>

            {/* Свободное место для вентилятора на передней стенке */}
            <circle cx="300" cy="100" r="13" strokeDasharray="3 4" className="stroke-muted-foreground"/>

            {/* Кожух блока питания, блок питания и диск */}
            <path d="M162 238h156" className="stroke-muted-foreground"/>
            <rect x="170" y="250" width="84" height="46" rx="4" className="stroke-foreground"/>
            <Fan cx={212} cy={273} r={17}/>
            <rect x="266" y="258" width="40" height="30" rx="3" className="stroke-foreground"/>
            <circle cx="286" cy="273" r="7" className="stroke-muted-foreground"/>

            {/* Кабели */}
            <path d="M236 250C236 222 270 226 270 196M200 250C200 214 186 204 186 174" className="stroke-muted-foreground"/>

            {/* Модуль памяти слева и стрелка к свободному слоту */}
            <rect x="24" y="74" width="80" height="18" rx="2" className="stroke-primary"/>
            <path d="M34 80h8v6h-8zM50 80h8v6h-8zM66 80h8v6h-8zM82 80h8v6h-8z" className="stroke-muted-foreground"/>
            <path d="M110 83C126 83 128 92 142 92" strokeDasharray="4 4" markerEnd="url(#home-illustration-arrow)" className="stroke-primary"/>

            {/* SSD слева и стрелка к свободному слоту */}
            <rect x="36" y="176" width="68" height="20" rx="2" className="stroke-primary"/>
            <path d="M46 186h20M96 180v12" className="stroke-muted-foreground"/>
            <path d="M110 186H142" strokeDasharray="4 4" markerEnd="url(#home-illustration-arrow)" className="stroke-primary"/>

            {/* Процессор справа и стрелка к кулеру */}
            <rect x="380" y="40" width="48" height="48" rx="4" className="stroke-foreground"/>
            <rect x="392" y="52" width="24" height="24" rx="2" className="stroke-primary"/>
            <path d="M388 34v-6M404 34v-6M420 34v-6M388 94v6M404 94v6M420 94v6M374 48h-6M374 64h-6M374 80h-6M434 48h6M434 64h6M434 80h6" className="stroke-muted-foreground"/>
            <path d="M362 64C352 64 348 70 338 70" strokeDasharray="4 4" markerEnd="url(#home-illustration-arrow)" className="stroke-primary"/>

            {/* Вентилятор справа и стрелка к свободному месту на передней стенке */}
            <rect x="372" y="150" width="64" height="64" rx="8" className="stroke-foreground"/>
            <Fan cx={404} cy={182} r={26}/>
            <path d="M366 170C350 160 352 112 338 106" strokeDasharray="4 4" markerEnd="url(#home-illustration-arrow)" className="stroke-primary"/>
        </svg>
    );
}
