import { Player } from "@lottiefiles/react-lottie-player";
import animation from "../assets/Animation - 1729003099741.json"

const AnimatedChatIcon = () => {
  return (
    <Player
      autoplay
      loop
      src={animation}  
      style={{ height: '300px', width: '300px' }}
    />
  );
};

export default AnimatedChatIcon;
