"use client"
import { Tilt } from 'react-tilt'

// type ProfileItems = {
//     src: string
// }

// type ProfileProps = {
//     data: ProfileItems[]
// }

// const defaultOptions = {
//     reverse: false,  // reverse the tilt direction
//     max: 35,     // max tilt rotation (degrees)
//     perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
//     scale: 1.1,    // 2 = 200%, 1.5 = 150%, etc..
//     speed: 1000,   // Speed of the enter/exit transition
//     transition: true,   // Set a transition on enter/exit.
//     axis: null,   // What axis should be disabled. Can be X or Y.
//     reset: true,    // If the tilt effect has to be reset on exit.
//     easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
// }


// const ProfileCard: React.FC<ProfileProps> = ({ data }) => {


//     return (
//         <Tilt options={defaultOptions} style={{ height: 250, width: 250 }}>
//             <img src={data.src} draggable="false" style={{ height: 250, width: 250 }} />
//         </Tilt>
//     )
// }
// export default ProfileCard


interface ScalableImageProps {
    src: string;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
}

const defaultOptions = {
    reverse: false,  // reverse the tilt direction
    max: 35,     // max tilt rotation (degrees)
    perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1,    // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000,   // Speed of the enter/exit transition
    transition: true,   // Set a transition on enter/exit.
    axis: null,   // What axis should be disabled. Can be X or Y.
    reset: true,    // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const ProfileCard: React.FC<ScalableImageProps> = ({
    src,
    width,
    height,
    className,
    style,
}) => {
    return (
        <div className={className} style={{ ...style }}>
            <Tilt options={defaultOptions}>

                <img
                    src={src}
                    width={width}
                    height={height}
                />
            </Tilt>

        </div>
    );
};

export default ProfileCard;

