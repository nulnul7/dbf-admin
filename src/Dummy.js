import images1 from './assets/images1';
import images2 from './assets/images2';
import images3 from './assets/images3';

export const portfolioDB = [
    {
        _id: '62f4553b3dd566111a69c98c',
        category: "photography",
        title: "portfolio-foto kopi",
        client: "unknown",
        photos: [
                    {0: {images1}},
                    {1: {images2}}
                ],
        description: "Your notes are saved in local storage and will not save"
    },
    {
        _id: '62f456833a5b2c791b435875',
        category: "graphic design",
        title: "Protein Hemat",
        client: "unknown",
        photos: [
                    {0: {images3}},
                    {1: {images1}}
                ],
        description: "Your notes are saved in local storage and will not save"
    },
    {
        _id: '62f4553b3dd566111a69c890',
        category: "graphic design",
        title: "Cafe Masa Depan",
        client: "unknown",
        photos: [
                    {0: images2},
                    {1: images3}
                ],
        description: "Your notes are saved in local storage and will not save"
    },
    {
        _id: '62f456833a5b2c791b435098',
        category: "web design",
        title: "Genset Bio Solar",
        client: "unknown",
        photos: [
                    {0: {images1}},
                    {1: {images3}}
                ],
        description: "Your notes are saved in local storage and will not save"
    }
]