const random = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const id = () => {
    return random(['1', '2', '3', '4']);
};

const title = () => {
    return random([
        'Ryzen 9 3900XT 3.8 GHz Upto 4.7 GHz AM4 Socket 12 Cores 24 Threads Desktop Processor  (Silver)',
        'ZEBRONICS ZEB-TRANSFORMER-M Wired Optical Gaming Mouse (USB 3.0, Black)',
        'HP Pavilion Gaming Ryzen 5 Quad Core 3550H - (8 GB/1 TB HDD/Windows 10 Home/4 GB Graphics/NVIDIA GeForce GTX 1650)',
        'Sony PS5 DualSense Wireless Controller  (White, For PS5)']);
};

const description = () => {
    return random([
        'From content creation to gaming, the AMD Ryzen 9 3900XT desktop processor is designed to support your hustle. With Max Boost clock speed of up to 4.7 GHz and 70 MB of cache memory, it offers efficient and powerful performance. Its AMD Ryzen Ready Socket AM4 computing platform is compatible with both AMD X570 and B550 chipsets to ensure convenient and powerful usage.',
        'Zeb-Transformer-M is a premium gaming mouse that comes with 6 buttons. It has a high precision optical sensor with a dedicated DPI switch that can toggle between 1000/1600/ 2400/ 3200 DPI. The mouse has 7 breathable LED modes, a sturdy 1.8-meter braided cable, and comes with a high-quality USB connector.',
        'If you’re looking for a sleek yet powerful laptop that is perfect for, both, work and play, then you must buy the HP Pavilion Gaming 15 Laptop. Whether its playing games or multitasking between applications, this laptop offers a smooth and lag-free performance as it features an AMD Ryzen 5-3550H processor and 8 GB of DDR4 RAM. Enjoy an immersive viewing experience, thanks to the 39.62-cm (15.6) Full HD display and dual speakers as well as B&O Audio.',
        'DualSense, Wireless Controller, Instruction Manual, Bluetooth compatible with all devices'
    ]);

};

const originalPrice = () => {
    return random([
        '55990.0',
        '549.0',
        '56144.0',
        '5990.0'
    ]);
};

const quantity = () => {
    return random([
        '15',
        '7',
        '11',
        '4'
    ]);
};

const discountPercent = () => {
    return random([
        '18',
        '19',
        '10',
        '0'
    ]);
};


const createdDate= () => {
    return random([
        '2021-05-24T05:06:56',
        '2021-05-24T05:09:30',
        '2021-05-24T05:16:18',
        '2021-05-24T05:23:46'
    ]);
};


const productImage= () => {
    return random([
        [{"id":1,"imageUrl":"https://s3.ap-south-1.amazonaws.com/mycsyam.image/amd-ryzen-9-3900xt-original-imafyy4c94krgbxm.jpeg"},
{"id":2,"imageUrl":"https://s3.ap-south-1.amazonaws.com/mycsyam.image/amd-ryzen-9-3900xt-original-imafyy4cuhupvurs.jpeg"},
{"id":3,"imageUrl":"https://s3.ap-south-1.amazonaws.com/mycsyam.image/amd-ryzen-9-3900xt-original-imafyy4cye6zsbfh.jpeg"}],

[{"id":4,"imageUrl":"https://s3.ap-south-1.amazonaws.com/mycsyam.image/zeb-transformer-m-zebronics-original-imafxrugfftphbkk.jpeg"},
{"id":5,"imageUrl":"https://s3.ap-south-1.amazonaws.com/mycsyam.image/zeb-transformer-m-zebronics-original-imafxrugh8yqdryh.jpeg"},
{"id":6,"imageUrl":"https://s3.ap-south-1.amazonaws.com/mycsyam.image/zeb-transformer-m-zebronics-original-imafxrugue4nkmrb.jpeg"}],

[{"id":7,"imageUrl":"https://s3.ap-south-1.amazonaws.com/mycsyam.image/hp-na-gaming-laptop-original-imaftpes7f3xwaus.jpeg"},
{"id":8,"imageUrl":"https://s3.ap-south-1.amazonaws.com/mycsyam.image/hp-na-gaming-laptop-original-imaftpesacqphdch.jpeg"},
{"id":9,"imageUrl":"https://s3.ap-south-1.amazonaws.com/mycsyam.image/hp-na-gaming-laptop-original-imaftpesbvfxgw9t.jpeg"}],

[{"id":10,"imageUrl":"https://s3.ap-south-1.amazonaws.com/mycsyam.image/sony-dualsense-original-imafz66q8kv9nchz.jpeg"},
{"id":11,"imageUrl":"https://s3.ap-south-1.amazonaws.com/mycsyam.image/sony-dualsense-original-imafz66qyhe75rxm.jpeg"}]
    ]);
};


const rating= () => {
    return random([
        '6',
        '4',
        '3',
        '3'
    ]);
};


const expressDelivery= () => {
    return random([
        'true',
        'true',
        'false',
        'false'
    ]);
};


function generate(count) {
    const data = [];
    for(let i = 0; i < count; i++) {
        const currentId = id();
        const currentTitle = title();
        const currentDescription = description();
        const currentOriginalPrice = originalPrice();
        const currentQuantity = quantity();
        const currentDiscountPercent = discountPercent();
        const currentCreatedDate = createdDate();
        const currentProductImage = productImage();
        const currentRating = rating();
        const currentExpressDelivery = expressDelivery();


        data.push({
            id: currentId,
            title: currentTitle,
            description: currentDescription,
            originalPrice: currentOriginalPrice ,
            quantity: currentQuantity,
            discountPercent:  currentDiscountPercent,
            createdDate: currentCreatedDate ,
            productImage: currentProductImage,
            rating: currentRating,
            expressDelivery: currentExpressDelivery
            
        });
    }
    return data;
}

export default generate;