import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export const RenderCarousel = ({photos, videos}) =>{

    const photosItem = photos.map(photo => (
        <div>
            <img src={photo} alt="post-pic" width="100%" height="760"/>
        </div>
    ))

    const videosItem = videos.map(video => (
        <video width="100%" height="760" controls>
            <source src={video} />
        </video>
    ))

    const CarouselItem = [...photosItem, ... videosItem]


    return (
        <Carousel showThumbs={false}>
            {CarouselItem.map(item => item)}
        </Carousel>
    )
}