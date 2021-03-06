import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export const RenderCarousel = ({photos, videos}) =>{

    const photosItem = photos.map(photo => (
        <div>
            <img src={photo} alt="post-pic" width="100%" height="550" style={{objectFit: 'cover'}}/>
        </div>
    ))

    const videosItem = videos.map(video => (
        <video width="100%" height="550" controls style={{objectFit: 'cover'}}>
            <source src={video} />
        </video>
    ))

    const CarouselItem = [...photosItem, ...videosItem]


    return (
        <Carousel showThumbs={false}>
            {CarouselItem.map(item => < div key={Math.random()*10000000000}>{item}</div>)}
        </Carousel>
    )
}