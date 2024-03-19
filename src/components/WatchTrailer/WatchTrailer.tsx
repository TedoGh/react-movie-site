import { useEffect, useState } from "react";
import Button from "../Button/Button";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import { AiOutlinePlayCircle } from "react-icons/ai";
import useHideScrollBar from "../../hooks/useHideScrollBar";

interface IVideo {
  key: string;
  type: string;
}

interface IVideoResults {
  results: IVideo[];
}

interface IProps {
  trailerVideo: IVideoResults;
}

export default function WatchTrailer({ trailerVideo }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTrailer, setIsTrailer] = useState<IVideo | null>(null);
  useHideScrollBar(isOpen);

  useEffect(() => {
    if (trailerVideo?.results) {
      const firstOfficialTrailer = trailerVideo.results.find(
        (video: IVideo) => video.type === "Trailer"
      );
      setIsTrailer(firstOfficialTrailer || null);
    }
  }, [trailerVideo]);

  return (
    <>
      {isTrailer && (
        <div>
          <Button onClick={() => setIsOpen(true)}>
            <AiOutlinePlayCircle size={18} />
            <p>Watch Trailer</p>
          </Button>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId={isTrailer.key}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
}
